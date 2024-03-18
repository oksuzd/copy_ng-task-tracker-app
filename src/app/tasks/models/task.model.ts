import { Performer } from "../../shared/models/mock.models";

export interface Task {
  id: number;
  status: boolean;
  name: string;
  description: string;
  priority: Priority;
  assignedTo: Performer;
  deadline: string | Date;
}

export enum Priority {
  p1 = 'P1',
  p2 = 'P2',
  p3 = 'P3',
  p4 = 'P4',
}