import { LogInIcon } from "lucide-react";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import Link from "next/link";

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  console.log("session data", data);

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user?.name ?? "",
          image:
            data?.user?.image ??
            generateAvatarUri({
              seed: data?.user?.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return <p className="text-sm">请同意授权浏览器使用摄像头及麦克风</p>;
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermissions = hasMicPermission && hasCameraPermission;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="px-4 py-8 flex felx-1 justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">准备好加入会议了吗？</h6>
            <p className="text-sm">加入之前请调试您的设备</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermissions
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex gap-x-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex gap-x-2 justify-between w-full">
            <Button asChild variant="secondary">
              <Link href="/meetings">取消</Link>
            </Button>
            <Button onClick={onJoin}>
              <LogInIcon />
              加入会话
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
