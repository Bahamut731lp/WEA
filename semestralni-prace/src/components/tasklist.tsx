"use client"
import React from "react";
import TaskFileSchema from "@/Interfaces/TaskFileSchema";

export default function Tasklist() {
    const [data, setData] = React.useState<TaskFileSchema>({})
    const [isLoading, setLoading] = React.useState(true)
   
    React.useEffect(() => {
      fetch('/api/task')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])
   

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                    </th>
                    <th>Úkol</th>
                    <th>Popis úkolu</th>
                    <th>Stav úkolu</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    isLoading ? (
                        <tr>
                            <td colSpan={5}>
                                <div className="w-full grid place-items-center">
                                    <span className="loading loading-dots loading-lg"></span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        [...(Object.values(data) ?? [])].map((task, i) => (
                            <tr key={i}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{task.title ?? ""}</div>
                                            <div className="text-sm opacity-50">{task.createdBy ?? "Anonymní"}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {task.description ?? ""}
                                </td>
                                <td>
                                    {
                                        task.isCompleted ? (
                                            <div className="badge badge-success gap-2">
                                                Splněno
                                            </div>
                                        ) : (
                                            <div className="badge badge-error gap-2">
                                                Nesplněno
                                            </div>
                                        )
                                    }
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    )
}