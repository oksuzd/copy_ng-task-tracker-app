import { Performer } from "../../shared/models/mock.models";

export interface KeyName<T> {
  key: T;
  name: string;
}

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

export const PRIORITY_NAMES: KeyName<Priority>[] = [
  { key: Priority.p1, name: 'Priority 1' },
  { key: Priority.p2, name: 'Priority 2' },
  { key: Priority.p3, name: 'Priority 3' },
  { key: Priority.p4, name: 'Priority 4' },
]

export interface PrioritySettings {
  key: number;
  name: string;
  color: string,
}
