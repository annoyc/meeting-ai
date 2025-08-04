import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex gap-y-8 flex-col items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="会议已取消"
        description="抱歉，此会议已被取消"
      />
    </div>
  );
};
