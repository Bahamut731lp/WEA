"use client"
import React from 'react';
import Link from 'next/link';

import Tasklist from '@/components/tasklist';
import TaskCreation from '@/components/taskcreation';
import TaskFileSchema from '@/interfaces/TaskFileSchema';

export default function Page() {
    const [data, setData] = React.useState<TaskFileSchema>({})
    const [isLoading, setLoading] = React.useState(true)
   
    async function getTaskData() {
        const response = await fetch('/api/task')
        const json = await response.json();

        setData(json)
        setLoading(false)
    }

    React.useEffect(() => {
        setLoading(true);
        getTaskData()
    }, [])
    
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 bg-base-100">
            <div className="navbar bg-base-200">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">TODO App</a>
                </div>
                <div className="flex-none gap-2">
                    <Link href="/login">
                        <button className="btn btn-sm btn-primary">Přihlásit</button>
                    </Link>
                </div>
            </div>

            <TaskCreation refresh={getTaskData}/>
            <div className="overflow-x-auto w-full">
                <Tasklist data={data} isLoading={isLoading}/>
            </div>
            {/* <div className="mockup-code">
                <pre data-prefix="1"><code>npm i daisyui</code></pre> 
                <pre data-prefix="2"><code>installing...</code></pre> 
                <pre data-prefix="3" className="bg-warning text-warning-content"><code>Error!</code></pre>
            </div> */}
        </main>
    )
}