import { useData } from "@/context/DataContext";
import { useTask } from "@/context/TaskContext";
import { useUser } from "@/context/UserContext";
import React from "react";

function ConfirmTask() {
    const task = useTask();
    const [user] = useUser();
    const {refresh} = useData();

    const dialogRef = React.useRef<HTMLDialogElement>(null);

    function onModalOpenClick() {
        if (!dialogRef.current) return;

        dialogRef.current.showModal();
    }

    async function onTaskConfirm() {
        if (!user || !task) return;

        const response = await fetch("/api/task", {
            method: "POST",
            headers: {
                "Authorization": user.token
            },
            body: JSON.stringify({
                id: task.id,
                isCompleted: true
            })
        })

        if (response.ok) {
            dialogRef.current?.close();
            refresh();
        }
    }

    if (task?.isCompleted) return null;

    return (
        <>
            <button className="btn btn-square btn-ghost btn-sm" onClick={onModalOpenClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
            </button>

            <dialog ref={dialogRef} className="modal">
                <section className="modal-box prose">
                    <h2>Potvrdit splnění úkolu?</h2>

                    <div className="modal-action">
                        <form method="dialog" className="flex gap-1">
                            <button className="btn btn-success" onClick={onTaskConfirm}>Označit za splněné</button>
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

export default ConfirmTask;