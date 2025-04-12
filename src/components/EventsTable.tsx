import { formatDate, formatTime } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TEvent } from "@/app/types";

type EventsTableProps = {
  events: TEvent[];
};

const EventsTable = ({ events }: EventsTableProps) => {
  return (
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
        {events.map((event) => (
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
  );
};

export default EventsTable;
