"use client"
import React from "react";

export default function TaskCreation({refresh}) {
    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [nameFeedback, setNameFeedback] = React.useState<boolean | null>(null)
    const [descFeedback, setDescFeedback] = React.useState<boolean | null>(null)

    const dialogRef = React.useRef<HTMLDialogElement>(null);

    function onModalOpenClick() {
        if (!dialogRef.current) return;

        dialogRef.current.showModal();
    }

    /**
     * Funkce pro odeslání úkolu
     * @param event
     */
    async function onTaskSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name) setNameFeedback(false);
        if (!desc) setDescFeedback(false);

        if (!name || !desc) return;

        const response = await fetch("/api/task", {
            method: "PUT",
            body: JSON.stringify({
                title: name,
                description: desc
            })
        });

        if (response.ok) {
            dialogRef.current?.close()
            refresh();
        }

        setName("");
        setDesc("");
        setNameFeedback(null);
        setDescFeedback(null);
    }

    return (
        <>
            <button className="btn btn-primary" onClick={onModalOpenClick}>Přidat úkol</button>

            <dialog ref={dialogRef} className="modal">
                <section className="modal-box prose">
                    <h2>Vytvořit nový úkol</h2>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Název úkolu</span>
                        </div>
                        <input 
                            type="text"
                            placeholder="Zde napište název úkolu"
                            className={`input input-sm input-bordered w-full ${nameFeedback != null ? (nameFeedback ? "input-success" : "input-error"): ""}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Popis úkolu</span>
                        </div>
                        <textarea
                            className={`textarea textarea-bordered w-full ${descFeedback != null ? (descFeedback ? "textarea-success" : "textarea-error"): ""}`}
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