import { EmptyState } from "@/components/empty-state";

export const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex gap-y-8 flex-col items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="会议完成"
        description="会议已完成，会议纪要将会出现在这里"
      />
    </div>
  );
};
