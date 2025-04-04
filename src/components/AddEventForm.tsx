// app/components/AddEventForm.tsx
"use client";

import { useFormStatus } from "react-dom";
import { ActionState, addEvent } from "@/actions/events";
import { useActionState } from "react";

const initialState: ActionState = {
  success: undefined,
  error: undefined,
};

export function AddEventForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(
    addEvent,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Event Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-2 font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="startTime" className="block mb-2 font-medium">
          Start Time*
        </label>
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="endTime" className="block mb-2 font-medium">
          End Time (optional)
        </label>
        <input
          type="datetime-local"
          id="endTime"
          name="endTime"
          className="w-full p-2 border rounded"
        />
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
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      aria-disabled={pending}
    >
      {pending ? "Adding Event..." : "Add Event"}
    </button>
  );
}
