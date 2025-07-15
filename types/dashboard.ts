export interface Team {
  _id: string;
  team_name: string;
  image: string;
}

export interface Event {
  _id: string;
  team_id?: {
    _id: string;
    team_name: string;
    image: string;
  };
  opponent_team_id?: {
    _id: string;
    team_name: string;
    image: string;
  };
  start_date: string;
  duration: number;
  event_type: string;
  location: string;
}
