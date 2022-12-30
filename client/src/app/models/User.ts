export class HashedUser {
    username: string;
    role: number;
}

export class UserCreationDTO {
    username: string = '';
    password: string = '';
}

export class User extends UserCreationDTO {
    _id: string;
    role: number = 3;
    creationDate: Date;
    banned: boolean = true
}

export class UserFilter {
    username: string;
    role: number;
    banned: boolean;
}

export enum UserRole {
    ADMIN, MANAGER, USER, GUEST
}

export enum UserStatus {
    ACTIVE, BANNED
}

// possible roles
//    0      1      2   3
// admin manager user guest