interface Props {
  meetingId: string;
  meetingName: string;
}

export const DoubaoCallView = ({ meetingId, meetingName }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div>{meetingId}</div>
      <div>{meetingName}</div>
    </div>
  );
};
