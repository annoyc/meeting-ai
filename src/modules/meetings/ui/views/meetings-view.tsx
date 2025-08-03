"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return <p>{JSON.stringify(data, null, 2)}</p>;
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
