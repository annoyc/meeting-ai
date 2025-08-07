"use client";

import { LoaderIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
// import { CallConnect } from "./call-connect";
import { generateAvatarUri } from "@/lib/avatar";
import Image from "next/image";

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

  return (
    // <CallConnect
    //   meetingId={meetingId}
    //   meetingName={meetingName}
    //   userId={data.user.id}
    //   userName={data.user.name}
    //   userImage={
    //     data.user.image ??
    //     generateAvatarUri({ seed: data.user.name, variant: "initials" })
    //   }
    // />
    <div className="flex h-screen flex-col justify-center items-center">
      <Image
        alt="Logo"
        width={240}
        height={240}
        className="rounded-full"
        src={
          data.user.image ??
          generateAvatarUri({ seed: data.user.name, variant: "initials" })
        }
      />
      <div className="text-white">{meetingId}</div>
      <div className="text-white">{meetingName}</div>
      <div className="text-white">{data.user.id}</div>
      <div className="text-white">{data.user.name}</div>
    </div>
  );
};
