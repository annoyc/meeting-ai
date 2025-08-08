import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import { MeetingStatus } from "@/modules/meetings/types";
import {
  CallSessionStartedEvent,
  CallSessionParticipantLeftEvent,
} from "@stream-io/node-sdk";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureWithSDK(body: string, signature: string) {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-signature");
  const apiKey = request.headers.get("x-api-key");
  if (!signature || !apiKey) {
    return NextResponse.json({
      message: "签名或API密钥未提供",
      status: 400,
    });
  }
  const body = await request.text();
  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({
      message: "签名验证失败",
      status: 401,
    });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({
      message: "解析请求体失败",
      status: 400,
    });
  }
  const eventType = (payload as Record<string, unknown>)?.type;
  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;
    if (!meetingId) {
      return NextResponse.json({
        message: "会议ID必填",
        status: 400,
      });
    }
    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          eq(meetings.status, MeetingStatus.Upcoming)
        )
      );
    if (!existingMeeting) {
      return NextResponse.json({
        message: "未找到会议",
        status: 404,
      });
    }
    await db
      .update(meetings)
      .set({
        status: MeetingStatus.Active,
        startedAt: new Date(),
      })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(and(eq(agents.id, existingMeeting.agentId)));
    if (!existingAgent) {
      return NextResponse.json({
        message: "未找到代理",
        status: 404,
      });
    }
    const call = streamVideo.video.call("default", meetingId);
    const realtimeClient = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: existingAgent.id,
      model: "gpt-4o-realtime-preview",
    });
    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];
    if (!meetingId) {
      return NextResponse.json({
        message: "会议ID必填",
        status: 400,
      });
    }
    const call = streamVideo.video.call("default", meetingId);
    await call.end();
  }

  return NextResponse.json({
    message: "ok",
    status: "ok",
  });
}
