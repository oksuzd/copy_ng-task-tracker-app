import { Priority, PrioritySettings } from "./models/task.model";

export const PRIORITIES: PrioritySettings[]= [
  {
    key: Priority.p1,
    name: 'P1',
    color: '#ff4081'
  },

  {
    key: Priority.p2,
    name: 'P2',
    color: 'orange'
  },

  {
    key: Priority.p3,
    name: 'P3',
    color: '#3f51b5'
  },

  {
    key: Priority.p4,
    name: 'P4',
    color: 'grey'
  },
];
