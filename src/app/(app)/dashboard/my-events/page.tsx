import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-6">My Events</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {createdEvents &&
            createdEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>
                  {event.start_time ? formatDate(event.start_time) : "—"}
                </TableCell>
                <TableCell>
                  {event.start_time ? formatTime(event.start_time) : "—"}
                </TableCell>
                <TableCell>{event.location ?? "—"}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
