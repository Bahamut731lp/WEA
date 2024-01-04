"use client"
import React from 'react';

import CreateTask from '@/components/CreateTask';
import Tasklist from '@/components/tasklist';
import TaskFileSchema from '@/interfaces/TaskFileSchema';
import { UserContextProvider } from '@/context/UserContext';
import UserInfo from '@/components/UserInfo';

export default function Page() {
    const [data, setData] = React.useState<TaskFileSchema>({});
    const [isLoading, setLoading] = React.useState(true);
    const [filter, setFilter] = React.useState("0");

    async function getTaskData() {
        const response = await fetch('/api/task')
        const json = await response.json();

        setData(json)
        setLoading(false)
    }

    React.useEffect(() => {
        setLoading(true);
        getTaskData();
    }, [])


    return (
        <UserContextProvider>
        <main className="flex min-h-screen flex-col items-center gap-4 bg-base-100">
            <div className="navbar bg-base-200">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">TODO App</a>
                </div>
                <UserInfo></UserInfo>
            </div>

            <div className="flex w-full px-4 gap-2">
                <CreateTask refresh={getTaskData} />
                <select className="select select-bordered" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="0">Všechny úkoly</option>
                    <option value="1">Splněné</option>
                    <option value="2">Nesplněné</option>
                </select>
            </div>
            <div className="overflow-x-auto w-full">
                <Tasklist data={data} isLoading={isLoading} filter={filter} />
            </div>
            {/* <div className="mockup-code">
                <pre data-prefix="1"><code>npm i daisyui</code></pre> 
                <pre data-prefix="2"><code>installing...</code></pre> 
                <pre data-prefix="3" className="bg-warning text-warning-content"><code>Error!</code></pre>
            </div> */}
        </main>
        </UserContextProvider>
    )
}