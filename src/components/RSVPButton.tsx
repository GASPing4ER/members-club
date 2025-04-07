"use client";

import { useState } from "react";
import { rsvpEvent } from "@/actions/events";
import { Button } from "./ui/button";
import { toast } from "sonner";

type RSVPButtonProps = {
  eventId: string;
  userId: string;
};

const RSVPButton = ({ eventId, userId }: RSVPButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await rsvpEvent(eventId, userId);
      if (!response.success) {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("RSVP failed:", error);
      // You might want to add toast notifications here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Processing..." : "RSVP"}
    </Button>
  );
};

export default RSVPButton;
