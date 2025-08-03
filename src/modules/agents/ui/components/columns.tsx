"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { AgentGetMany } from "../../types";

export const columns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "会话智能体名称",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar seed={row.original.name} className="size-6" />
          <div className="font-semibold capitalize">{row.original.name}</div>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground truncate capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "会议",
    cell: ({ row }) => (
      <Badge
        className="flex items-center gap-2 [&>svg]:size-4"
        variant="outline"
      >
        <VideoIcon className="text-blue-700" />
        {row.original.meetingCount || 0} 会议
      </Badge>
    ),
  },
];
