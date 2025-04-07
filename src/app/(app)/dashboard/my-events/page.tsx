import { getCreatedEvents, getParticipatingEvents } from "@/lib/data";
import { currentUser } from "@clerk/nextjs/server";

export default async function MyEventsPage() {
  const user = await currentUser();
  if (!user) {
    return <div>User not found.</div>;
  }
  const [{ data: participatingEvents }, { data: createdEvents }] =
    await Promise.all([
      getParticipatingEvents(user.id),
      getCreatedEvents(user.id),
    ]);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-6">My Events</h1>
      <h2>RSVP-ed Events:</h2>
      <ul className="ml-8">
        {participatingEvents?.map((event) => {
          return <li key={event.id}>{event.title}</li>;
        })}
      </ul>
      <h2>Created Events:</h2>
      <ul className="ml-8">
        {createdEvents?.map((event) => {
          return <li key={event.id}>{event.title}</li>;
        })}
      </ul>
    </div>
  );
}
