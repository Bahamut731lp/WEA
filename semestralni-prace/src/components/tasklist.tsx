"use client"

import _ from "lodash";
import React from "react";

import ConfirmTask from "@/components/ConfirmTask";
import EditTask from "@/components/EditTask";
import DeleteTask from "@/components/DeleteTask";

import { useUser } from "@/context/UserContext";
import { TaskContextProvider } from "@/context/TaskContext";
import { useData } from "@/context/DataContext";

/**
 * Komponenta pro zobrazení teček při načítání dat
 */
function Loading() {
    return (
        <tr>
            <td colSpan={5}>
                <div className="w-full grid place-items-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            </td>
        </tr>
    )
}

/**
 * Komponenta s ovládacími prvky
 */
function Controls() {
    const [user] = useUser();

    if (!user) return null;

    return (
        <td>
            <ConfirmTask/>

            <EditTask/>

            <DeleteTask />
        </td>
    )
}

/**
 * Komponenta řádku
 */
function Task({ data }) {
    const task = data;
    
    return (
        <TaskContextProvider value={task}>
            <tr>
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
                <Status isCompleted={task.isCompleted} />
                <Controls />
            </tr>
        </TaskContextProvider>
    )
}

/**
 * Komponenta pro zobrazování stavu úkolu
 */
function Status({ isCompleted }: { isCompleted: boolean }) {
    return (
        <td>
            {
                isCompleted ? (
                    <div className="badge badge-success gap-2 w-28 justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        Splněno
                    </div>
                ) : (
                    <div className="badge badge-error gap-2 w-28 justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Nesplněno
                    </div>
                )
            }
        </td>
    )
}

export default function Tasklist({ filter }: { filter: string }) {
    const {data, isLoading} = useData();

    // Filtering predicates
    const filters = {
        "0": () => true,
        "1": (data) => data.isCompleted,
        "2": (data) => !data.isCompleted
    }
    
    // Task list transformed and filtered by criteria
    const transformed = _(data).entries().map(([key, value]) => ({...value, id: key})).filter(v => filters[filter](v)).value();

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
                        <Loading />
                    ) : (
                        transformed.length > 0 ? (
                            transformed.map((task, i) => <Task data={task} key={task.id}></Task>)
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">Nebyly nalezeny žádné úkoly</td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    )
}