export interface IDriver {
  firstName: string;
  lastName: string;
  id: number;
}

export class Driver implements IDriver {
  firstName: string = '';
  lastName: string = '';
  id: number = Math.random() * 10;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
