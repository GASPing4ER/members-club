import { EventsTable } from "@/components";
import { getCreatedEvents, getParticipatingEvents } from "@/lib/data";
import { currentUser } from "@clerk/nextjs/server";

export default async function MyEventsPage() {
  const user = await currentUser();
  if (!user) {
    return <div>User not found.</div>;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ data: participatingEvents }, { data: createdEvents }] =
    await Promise.all([
      getParticipatingEvents(user.id),
      getCreatedEvents(user.id),
    ]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">My Events</h1>
      {createdEvents && createdEvents.length ? (
        <EventsTable events={createdEvents} />
      ) : (
        "No events found."
      )}
      <h1 className="text-2xl font-bold">Participating Events</h1>
      {participatingEvents && participatingEvents.length > 0 ? (
        <EventsTable events={participatingEvents} />
      ) : (
        "No events found."
      )}
    </div>
  );
}
