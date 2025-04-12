import { checkRsvp, getEvent } from "@/lib/data";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { RSVPButton } from "@/components";
import { currentUser } from "@clerk/nextjs/server";
const EventPage = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const [user, { eventId }] = await Promise.all([currentUser(), params]);
  const [{ data: event }, response] = await Promise.all([
    getEvent(eventId),
    checkRsvp(eventId, user?.id),
  ]);

  if (!event) {
    return <div>Event not found.</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  const formattedDate = event?.start_time
    ? format(parseISO(event.start_time), "MMM dd, yyyy h:mm a")
    : "No date set";

  return (
    <div className="relative flex flex-col items-center pt-20">
      {/* Image with hover effect */}
      <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md">
        <Image
          src="/logo.svg"
          alt={`logo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 128px, (max-width: 1200px) 150px, 192px"
        />
      </div>

      {/* Event Info */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.description}</p>
        <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
        <p className="text-xs text-gray-500 mt-1">{event.location}</p>
        {response.success && !response.rsvp ? (
          <RSVPButton eventId={eventId} userId={user.id} />
        ) : (
          <p>You already RSVP-ed.</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
