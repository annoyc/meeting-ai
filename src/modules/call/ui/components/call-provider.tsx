"use client";

import { LoaderIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { DoubaoCallView } from "../views/doubao-call-view";
// import { CallConnect } from "./call-connect";
// import { generateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();
  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 text-white animate-spin" />
      </div>
    );
  }

  return <DoubaoCallView meetingId={meetingId} meetingName={meetingName} />;
};
