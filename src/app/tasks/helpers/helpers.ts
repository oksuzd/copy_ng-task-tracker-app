import { Performer } from "../../shared/models/mock.models";

export const getFullName = (performer: Performer | undefined): string => {
    if (performer) {
      return `${performer.firstName}  ${performer.lastName}`
    }
    return '';
}
