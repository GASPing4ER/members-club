"use client";

import { useFormStatus } from "react-dom";
import { ActionState, addEvent } from "@/actions/events";
import { useActionState, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const initialState: ActionState = {
  success: undefined,
  error: undefined,
};

type AddEventFormProps = {
  onSuccess: () => void;
};

function AddEventForm({ onSuccess }: AddEventFormProps) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    async (prevState: ActionState, formData: FormData) => {
      const result = await addEvent(prevState, formData);
      if (result.success && onSuccess) {
        onSuccess();
        toast.success("Successfully added a new event.");
      }
      return result;
    },
    initialState
  );
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <form action={formAction} className="space-y-4">
      {/* Hidden input to submit the date value */}
      <input
        type="hidden"
        name="startTime"
        id="startTime"
        value={date ? date.toISOString() : ""}
      />

      <div>
        <Label htmlFor="title" className="block mb-2 font-medium">
          Event Title
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <Label htmlFor="description" className="block mb-2 font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <Label className="block mb-2 font-medium">Event Date</Label>
        <Popover modal={true}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? (
                format(date, "PPP") // Formats date as "Month day, year"
              ) : (
                <span>Choose date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <SubmitButton />

      {state?.error && (
        <p className="p-2 text-red-600 bg-red-50 rounded-md">{state.error}</p>
      )}
      {state?.success && (
        <p className="p-2 text-green-600 bg-green-50 rounded-md">
          Event added successfully!
        </p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Adding Event..." : "Add Event"}
    </Button>
  );
}

export default AddEventForm;
