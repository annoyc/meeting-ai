"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { AgentsSearchFilter } from "@/modules/agents/ui/components/agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";
import { NewMeetingDialog } from "./new-meeting-dialog";

export const MeetingsListHeader = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useAgentsFilters();

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE });
  };

  return (
    <>
      <NewMeetingDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">我的会议</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            创建会议
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              清空
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
