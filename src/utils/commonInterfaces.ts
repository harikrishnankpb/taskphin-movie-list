export interface UserType {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Number;
    lastLogin: string;
}
export interface Status {
    msg: string;
    status: boolean;
}
export interface StatusData {
    msg: string;
    status: boolean;
    data?: any
}

export interface MovieType {
    id: string;
    name: string;
    rating: number;
    cast: string[];
    genre: string;
    releaseDate: string;
    createdAt: string;
    updatedAt: string;
    user: UserType;
}