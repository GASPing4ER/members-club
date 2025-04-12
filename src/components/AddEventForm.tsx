"use client";

import { useFormStatus } from "react-dom";
import { ActionState, addEvent } from "@/actions/events";
import { useActionState, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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

      if (result.success) {
        onSuccess();
        toast.success("Successfully added a new event.");
        return {
          success: true,
          error: undefined,
        };
      }

      return {
        success: false,
        error: result.error || "Unknown error occurred",
      };
    },
    initialState
  );
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState({
    hour: 12,
    minute: 0,
    ampm: "PM",
  });

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string | number
  ) => {
    const newTime = { ...time, [type]: value };
    setTime(newTime);

    if (date) {
      const hours =
        newTime.ampm === "PM"
          ? newTime.hour === 12
            ? 12
            : Number(newTime.hour) + 12
          : newTime.hour === 12
          ? 0
          : Number(newTime.hour);

      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(Number(newTime.minute));
      setDate(newDate);
    }
  };

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
        <Label htmlFor="location" className="block mb-2 font-medium">
          Location
        </Label>
        <Input
          type="text"
          id="location"
          name="location"
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

      <div className="space-y-2">
        <Label className="block font-medium">Event Date & Time</Label>
        <div className="flex flex-col gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? (
                  format(date, "MM/dd/yyyy hh:mm a")
                ) : (
                  <span>Select date and time</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col sm:flex-row">
                <Calendar mode="single" selected={date} onSelect={setDate} />
                <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i + 1)
                        .reverse()
                        .map((hour) => (
                          <Button
                            key={hour}
                            variant={time.hour === hour ? "default" : "ghost"}
                            className="justify-start"
                            onClick={() => handleTimeChange("hour", hour)}
                          >
                            {hour}
                          </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            key={minute}
                            variant={
                              time.minute === minute ? "default" : "ghost"
                            }
                            className="justify-start"
                            onClick={() => handleTimeChange("minute", minute)}
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        )
                      )}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="">
                    <div className="flex sm:flex-col p-2">
                      {["AM", "PM"].map((ampm) => (
                        <Button
                          key={ampm}
                          variant={time.ampm === ampm ? "default" : "ghost"}
                          className="justify-start"
                          onClick={() => handleTimeChange("ampm", ampm)}
                        >
                          {ampm}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
