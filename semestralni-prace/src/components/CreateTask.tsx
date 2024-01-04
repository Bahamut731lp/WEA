"use client"
import { useData } from "@/context/DataContext";
import { useUser } from "@/context/UserContext";
import React from "react";

export default function CreateTask() {
    const [user] = useUser();
    const {refresh} = useData();
    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
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

        if (!name || !desc) return;

        const response = await fetch("/api/task", {
            method: "PUT",
            headers: {
                "Authorization": user.token
            },
            body: JSON.stringify({
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
    }

    // Pokud user není přihlášen, nebudeme nic vykreslovat
    if (!user) return null;

    return (<>
        <button className="btn btn-primary" onClick={onModalOpenClick}>Přidat úkol</button>

        <dialog ref={dialogRef} className="modal">
            <section className="modal-box prose">
                <h2>Vytvořit nový úkol</h2>

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
                        <button className="btn btn-primary" onClick={onTaskSubmit}>Přidat</button>
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