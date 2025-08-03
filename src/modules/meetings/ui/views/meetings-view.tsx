"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} />
      {!data.items.length && (
        <EmptyState
          title="创建你的会议"
          description="创建一个会议，选择一个智能体加入您的会议室，每个智能体在通话时将按照您的指令与参与者进行对话"
        />
      )}
    </div>
  );
};

export const MeetingsLoadingView = () => {
  return (
    <LoadingState title="会议加载中" description="数据正在全速加载中..." />
  );
};

export const MeetingsErrorView = () => {
  return (
    <ErrorState title="会议加载失败" description="数据加载失败，请稍后再试" />
  );
};
