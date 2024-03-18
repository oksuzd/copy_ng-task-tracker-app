import { Performer } from "../../shared/models/mock.models";

export interface Task {
  id: string;
  status: boolean;
  name: string;
  description: string;
  priority: Priority;
  assignedTo: Performer;
  deadline: string | Date;
}

export enum Priority {
  p1 = 1,
  p2 = 2,
  p3 = 3,
  p4 = 4,
}

export interface PrioritySettings {
  key: number;
  name: string;
  color: string,
}
