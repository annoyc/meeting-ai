"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  console.log("AgentsView data", data);
  return <p>agent view</p>;
};

export const AgentsLoadingView = () => {
  return <LoadingState title="加载中" description="数据正在全速加载中..." />;
};

export const AgentsErrorView = () => {
  return <ErrorState title="加载失败" description="数据加载失败，请稍后再试" />;
};
