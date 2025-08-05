import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="px-4 py-8 flex felx-1 justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">会话已结束</h6>
            <p className="text-sm">会议纪要将会出现在这里</p>
          </div>
          <Button asChild>
            <Link href="/meetings">返回会议列表</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
