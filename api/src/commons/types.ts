export type Username = {
    name: string;
}

export type BidsWithUser = {
    id: number;
    amount: number;
    createdAt: Date;
    user: Username;
}