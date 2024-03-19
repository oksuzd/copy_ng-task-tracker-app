import { Performer } from "../../shared/models/mock.models";

export const getFullName = (performer: Performer | undefined): string => {
    if (performer) {
      return `${performer.firstName}  ${performer.lastName}`
    }
    return '';
}

// export function getFullName(performer: Performer): string {
//   return `${performer.firstName}  ${performer.lastName}`;
// }
