import { useData } from "@/context/DataContext";
import { useTask } from "@/context/TaskContext";
import { useUser } from "@/context/UserContext";
import React from "react";

function DeleteTask() {
    const task = useTask();
    const [user] = useUser();
    const {refresh} = useData();

    const dialogRef = React.useRef<HTMLDialogElement>(null);

    function onModalOpenClick() {
        if (!dialogRef.current) return;

        dialogRef.current.showModal();
    }

    async function onTaskDelete() {
        if (!user || !task) return;
        
        const response = await fetch("/api/task", {
            method: "DELETE",
            headers: {
                "Authorization": user.token
            },
            body: JSON.stringify({
                id: task.id
            })
        })

        if (response.ok) {
            dialogRef.current?.close();
            refresh();
        }
    }

    return (
        <>
            <button className="btn btn-square btn-ghost btn-sm" onClick={onModalOpenClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>

            <dialog ref={dialogRef} className="modal">
                <section className="modal-box prose">
                    <h2>Přejete si smazat úkol?</h2>

                    <p>Tato akce nejde vzít zpět</p>

                    <div className="modal-action">
                        <form method="dialog" className="flex gap-1">
                            <button className="btn btn-error" onClick={onTaskDelete}>Smazat</button>
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

export default DeleteTask;