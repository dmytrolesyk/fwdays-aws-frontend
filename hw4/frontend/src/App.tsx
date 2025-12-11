import { useEffect, useMemo, useState, type FormEvent } from "react";
import { API_URL, createTask, deleteTask, fetchTasks, updateTask } from "./api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Task } from "./types";
import "./App.css";

const emptyForm = { title: "", text: "" };

const formatDate = (value?: string) => {
    if (!value) return "just now";
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return value;
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(parsed);
};

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalTask, setModalTask] = useState<Task | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not fetch tasks. Try again shortly."
            );
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!form.title.trim()) {
            setError("Title is required.");
            return;
        }

        setSubmitting(true);
        try {
            if (editingId) {
                const updated = await updateTask({
                    id: editingId,
                    title: form.title.trim(),
                    text: form.text.trim(),
                });
                setTasks((prev) =>
                    prev.map((task) => (task.id === editingId ? updated : task))
                );
                setToast("Task updated");
            } else {
                const created = await createTask({
                    title: form.title.trim(),
                    text: form.text.trim(),
                });
                setTasks((prev) => [created, ...prev]);
                setToast("Task created");
            }
            setForm(emptyForm);
            setEditingId(null);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not save task. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const startEdit = (task: Task) => {
        setEditingId(task.id);
        setForm({
            title: task.title ?? "",
            text: task.text ?? "",
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
    };

    const confirmDelete = async () => {
        if (!modalTask) return;
        setSubmitting(true);
        setError(null);
        try {
            await deleteTask(modalTask.id);
            setTasks((prev) => prev.filter((task) => task.id !== modalTask.id));
            setToast("Task deleted");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not delete task. Please try again."
            );
        } finally {
            setSubmitting(false);
            setModalTask(null);
        }
    };

    const closeToast = () => setToast(null);

    const heroSubtitle = useMemo(() => {
        if (editingId) return "Editing mission details. Keep it sleek.";
        if (tasks.length === 0) return "No tasks yet. The lagoon awaits your first note.";
        return "Scribble, polish, and send your tasks downstream.";
    }, [editingId, tasks.length]);

    return (
        <div className="page">
            <div className="watermark" aria-hidden />
            <div className="shell" aria-hidden />
            <header className="hero">
                <div>
                    <p className="eyebrow">Blobfish &amp; Beaver Co-Op</p>
                    <h1>Tasks Lagoon</h1>
                    <p className="subtitle">{heroSubtitle}</p>
                    <div className="hero-actions">
                        <button className="ghost" onClick={loadTasks} disabled={loading}>
                            {loading ? "Refreshing..." : "Refresh"}
                        </button>
                        <span className="endpoint">API: {API_URL}</span>
                    </div>
                </div>
                <div className="badge">
                    <span role="img" aria-label="blobfish">
                        🐡
                    </span>
                    <span role="img" aria-label="beaver">
                        🦫
                    </span>
                </div>
            </header>

            <main>
                <section className="panel">
                    <div className="panel-header">
                        <div>
                            <p className="eyebrow">{editingId ? "Edit task" : "Create task"}</p>
                            <h2>{editingId ? "Retouch the ripple" : "Drop a new ripple"}</h2>
                        </div>
                        {editingId && (
                            <button className="ghost" onClick={cancelEdit} type="button">
                                Cancel edit
                            </button>
                        )}
                    </div>
                    <form className="task-form" onSubmit={onSubmit}>
                        <label className="field">
                            <span>Title</span>
                            <input
                                type="text"
                                placeholder="Build a cozier dam"
                                value={form.title}
                                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                disabled={submitting}
                                required
                            />
                        </label>
                        <label className="field">
                            <span>Description</span>
                            <textarea
                                placeholder="Add the details that keep our lagoon serene..."
                                value={form.text}
                                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                                rows={4}
                                disabled={submitting}
                            />
                        </label>
                        <div className="form-actions">
                            <button className="primary" type="submit" disabled={submitting}>
                                {submitting
                                    ? editingId
                                        ? "Saving..."
                                        : "Creating..."
                                    : editingId
                                    ? "Save changes"
                                    : "Create task"}
                            </button>
                            <span className="hint">We save instantly to the lagoon.</span>
                        </div>
                    </form>
                    {error && <div className="notice error">{error}</div>}
                </section>

                <section className="panel">
                    <div className="panel-header">
                        <div>
                            <p className="eyebrow">Your stream</p>
                            <h2>Task cards</h2>
                        </div>
                        <span className="pill">{tasks.length} items</span>
                    </div>
                    {loading ? (
                        <div className="skeleton-grid">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="skeleton-card" />
                            ))}
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="empty">
                            <p>No ripples yet.</p>
                            <p className="muted">Add a task to see it drift in.</p>
                        </div>
                    ) : (
                        <div className="card-grid">
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={() => startEdit(task)}
                                    onDelete={() => setModalTask(task)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {modalTask && (
                <ConfirmModal
                    title="Delete this task?"
                    description={`"${modalTask.title}" will slip away forever.`}
                    confirmLabel="Yes, delete it"
                    cancelLabel="Keep it"
                    loading={submitting}
                    onConfirm={confirmDelete}
                    onCancel={() => setModalTask(null)}
                />
            )}

            {toast && (
                <div className="toast" role="status">
                    <span>{toast}</span>
                    <button className="ghost" onClick={closeToast} type="button">
                        Dismiss
                    </button>
                </div>
            )}
        </div>
    );
}

type TaskCardProps = {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
};

function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    return (
        <article className="task-card">
            <div className="task-top">
                <span className="pill soft">{formatDate(task.createdAt)}</span>
                <div className="icon-buttons">
                    <button
                        className="icon-button"
                        onClick={onEdit}
                        type="button"
                        aria-label="Edit task"
                        title="Edit task"
                    >
                        ✏️
                    </button>
                    <button
                        className="icon-button danger"
                        onClick={onDelete}
                        type="button"
                        aria-label="Delete task"
                        title="Delete task"
                    >
                        🗑
                    </button>
                </div>
            </div>
            <h3>{task.title}</h3>
            {task.text ? (
                <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
                    {task.text}
                </ReactMarkdown>
            ) : (
                <p className="muted">No description</p>
            )}
        </article>
    );
}

type ConfirmModalProps = {
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

function ConfirmModal({
    title,
    description,
    confirmLabel,
    cancelLabel,
    loading,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return (
        <div className="modal-overlay" role="alertdialog" aria-modal="true">
            <div className="modal">
                <p className="eyebrow">Are you sure?</p>
                <h3>{title}</h3>
                <p className="muted">{description}</p>
                <div className="modal-actions">
                    <button className="ghost" onClick={onCancel} type="button" disabled={loading}>
                        {cancelLabel}
                    </button>
                    <button className="danger" onClick={onConfirm} type="button" disabled={loading}>
                        {loading ? "Deleting..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
