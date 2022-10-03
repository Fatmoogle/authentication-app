import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: "Alex",
            username: "alexRocks",
            password: "notSecret"
        },
        {
            id: 1,
            name: "Emily",
            username: "emilyRocks",
            password: "notSecretAtAll"
        }
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}
