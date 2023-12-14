"use client"
import React from "react";
import TaskFileSchema from "@/interfaces/TaskFileSchema";

export default function Tasklist({ data, isLoading }: { data: TaskFileSchema, isLoading: boolean }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>

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
                                <td></td>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                </svg>
                                                Splněno
                                            </div>
                                        ) : (
                                            <div className="badge badge-error gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                                Nesplněno
                                            </div>
                                        )
                                    }
                                </td>
                                <th>
                                    <button className="btn btn-square btn-ghost btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                    <button className="btn btn-square btn-ghost btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button className="btn btn-square btn-ghost btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    )
}