export type Task = {
    id: string;
    title: string;
    text?: string;
    createdAt?: string;
};

export type TaskInput = {
    title: string;
    text: string;
};
