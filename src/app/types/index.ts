export type TEvent = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_time: string;
  location: string;
  end_time: string | null;
  created_at: string;
  updated_at: string;
};

export type TEventParticipant = {
  id: string;
  event_id: string;
  user_id: string;
  created_at: string;
};
