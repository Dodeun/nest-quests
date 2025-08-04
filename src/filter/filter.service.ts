import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterService {
  filterUsers(
    users: { name: string; age: number }[],
    name: string,
  ): { name: string; age: number }[] {
    return users.filter((user) => user.name === name);
  }
}
