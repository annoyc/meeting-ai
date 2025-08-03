import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({
  open,
  onOpenChange,
}: NewMeetingDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="新增"
      description="创建会议"
    >
      <MeetingForm
        onCancel={() => onOpenChange(false)}
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
      />
    </ResponsiveDialog>
  );
};
