interface IUsers {
    username: string;
    password: string;
}
interface IGarage {
    id: number;
    name: string;
    description: string;
}
interface IAuto {
    id: number;
    name: string;
    description: string;
    garage: number;
    model: string;
}

export type { IUsers, IGarage, IAuto };
