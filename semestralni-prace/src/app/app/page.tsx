import React from 'react';
import Link from 'next/link';
import Tasklist from '@/components/tasklist';

export default function Page() {
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

            <div className="overflow-x-auto w-full">
                <Tasklist/>
            </div>
            {/* <div className="mockup-code">
                <pre data-prefix="1"><code>npm i daisyui</code></pre> 
                <pre data-prefix="2"><code>installing...</code></pre> 
                <pre data-prefix="3" className="bg-warning text-warning-content"><code>Error!</code></pre>
            </div> */}
        </main>
    )
}