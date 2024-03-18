import { Performer } from "../../shared/models/mock.models";

// export function getFullName(performer: Performer): string {
//   return `${performer.firstName}  ${performer.lastName}`;
// }

// export const getFullName => {(performer: Performer): string {
//   return `${performer.firstName}  ${performer.lastName}`;
// }

  export const getFullName = (performer: Performer): string => `${performer.firstName}  ${performer.lastName}`;
