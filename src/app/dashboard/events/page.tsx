export const dynamic = "force-dynamic";

import { EventCard } from "@/components";
import { getEvents } from "@/lib/data";

export type EventProps = {
  id: string;
  title: string;
  description: string;
  start_time: string;
  created_at: string;
  updated_at: string;
};

const EventsPage = async () => {
  const { data: events } = await getEvents();
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {events &&
        events.map((event: EventProps) => (
          <EventCard key={event.id} event={event} />
        ))}
    </main>
  );
};

export default EventsPage;
