"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "@/components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        totalPages={data.totalPages}
        page={filters.page}
        onPageChange={(page) => setFilters({ page })}
      />
      {!data.items.length && (
        <EmptyState
          title="创建你的会话智能体"
          description="创建一个对话智能体加入您的会议室，每个智能体在通话时将按照您的指令与参与者进行对话"
        />
      )}
    </div>
  );
};

export const AgentsLoadingView = () => {
  return (
    <LoadingState title="智能体加载中" description="数据正在全速加载中..." />
  );
};

export const AgentsErrorView = () => {
  return (
    <ErrorState title="智能体加载失败" description="数据加载失败，请稍后再试" />
  );
};
