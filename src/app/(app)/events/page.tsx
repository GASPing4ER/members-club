export const dynamic = "force-dynamic";

import { TEvent } from "@/app/types";
import { EventCard } from "@/components";
import { getEvents } from "@/lib/data";

const EventsPage = async () => {
  const { data: events } = await getEvents();

  if (!events || events.length === 0) {
    return <main className="p-10">No events found.</main>;
  }
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {events &&
        events.map((event: TEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
    </main>
  );
};
export default EventsPage;
