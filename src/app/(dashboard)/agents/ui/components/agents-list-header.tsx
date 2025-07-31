"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";

export const AgentsListHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">我的代理机器人</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            创建代理机器人
          </Button>
        </div>
      </div>
    </>
  );
};
