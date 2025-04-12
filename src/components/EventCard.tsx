import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { TEvent } from "@/app/types";

const EventCard = ({ event }: { event: TEvent }) => {
  // Parse and format the timestamp
  const formattedDate = event.start_time
    ? format(parseISO(event.start_time), "MMM dd, yyyy h:mm a")
    : "No date set";

  return (
    <Link
      href={`/events/${event.id}`}
      className="relative flex flex-col items-center rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
    >
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
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.description}</p>
        <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
      </div>
    </Link>
  );
};

export default EventCard;
