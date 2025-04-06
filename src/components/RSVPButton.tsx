"use client";

import { rsvpEvent } from "@/actions/events";
import { Button } from "./ui/button";

type RSVPButtonProps = {
  eventId: string;
  userId: string;
};

const RSVPButton = ({ eventId, userId }: RSVPButtonProps) => {
  return <Button onClick={async () => rsvpEvent(eventId, userId)}>RSVP</Button>;
};

export default RSVPButton;
