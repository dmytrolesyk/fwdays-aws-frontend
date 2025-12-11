import type { Task, TaskInput } from "./types";

const DEFAULT_API_URL = "https://j84y2fvws0.execute-api.eu-central-1.amazonaws.com/prod/tasks";
export const API_URL = import.meta.env.VITE_API_URL ?? DEFAULT_API_URL;

const parseJson = async (response: Response) => {
    const text = await response.text();
    if (!text) return undefined;
    try {
        return JSON.parse(text);
    } catch {
        return undefined;
    }
};

const request = async <T>(method: string, body?: unknown): Promise<T> => {
    const response = await fetch(API_URL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await parseJson(response);
    if (!response.ok) {
        const message =
            (data as { message?: string } | undefined)?.message ??
            `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return data as T;
};

export const fetchTasks = () => request<Task[]>("GET");
export const createTask = (payload: TaskInput) =>
    request<Task>("POST", payload);
export const updateTask = (payload: Task) => request<Task>("PUT", payload);
export const deleteTask = (id: string) =>
    request<{ message: string }>("DELETE", { id });
