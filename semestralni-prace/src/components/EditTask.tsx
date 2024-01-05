"use client"
import { useData } from "@/context/DataContext";
import { useTask } from "@/context/TaskContext";
import { useUser } from "@/context/UserContext";
import React from "react";

export default function EditTask() {
    const [user] = useUser();
    const task = useTask();
    const { refresh } = useData();
    
    const [name, setName] = React.useState(task?.title ?? "");
    const [desc, setDesc] = React.useState(task?.description ?? "");
    const [nameFeedback, setNameFeedback] = React.useState<boolean | null>(null);
    const [descFeedback, setDescFeedback] = React.useState<boolean | null>(null);
    const [serverFeedback, setServerFeedback] = React.useState("");

    const dialogRef = React.useRef<HTMLDialogElement>(null);

    function onModalOpenClick() {
        if (!dialogRef.current) return;

        dialogRef.current.showModal();
    }

    /**
     * Funkce pro odeslání úkolu
     * @param event
     */
    async function onTaskSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!name) setNameFeedback(false);
        if (!desc) setDescFeedback(false);

        if (!name || !desc || !user || !task) return;

        const response = await fetch("/api/task", {
            method: "POST",
            headers: {
                "Authorization": user.token
            },
            body: JSON.stringify({
                id: task.id,
                title: name,
                description: desc
            })
        });

        if (response.ok) {
            dialogRef.current?.close()
            refresh();
        }

        if (response.status == 403) setServerFeedback("Chyba! Abyste mohli vytvářet úkoly, musíte se přihlásit.");

        setName("");
        setDesc("");
        setNameFeedback(null);
        setDescFeedback(null);
        setServerFeedback("");
    }

    // Pokud user není přihlášen, nebudeme nic vykreslovat
    if (!user) return null;

    return (
        <>
            <button className="btn btn-square btn-ghost btn-sm" onClick={onModalOpenClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>

            <dialog ref={dialogRef} className="modal">
                <section className="modal-box prose">
                    <h2>Editovat úkol</h2>

                    {
                        serverFeedback && (
                            <div role="alert" className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{serverFeedback}</span>
                            </div>
                        )
                    }

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Název úkolu</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Zde napište název úkolu"
                            className={`input input-sm input-bordered w-full ${nameFeedback != null ? (nameFeedback ? "input-success" : "input-error") : ""}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Popis úkolu</span>
                        </div>
                        <textarea
                            className={`textarea textarea-bordered w-full ${descFeedback != null ? (descFeedback ? "textarea-success" : "textarea-error") : ""}`}
                            placeholder="Zde úkol popište"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>

                    <div className="modal-action">
                        <form method="dialog" className="flex gap-1">
                            <button className="btn btn-primary" onClick={onTaskSubmit}>Upravit</button>
                            <button className="btn">Zrušit</button>
                        </form>
                    </div>
                </section>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}