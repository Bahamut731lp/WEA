import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-base-100">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">TODO App</h1>
                        <p className="py-6">Semestrální projekt pro předmět WEA v ZS 23/24</p>

                        <div className="flex gap-2 justify-center">
                            <Link href="/login">
                                <button className="btn btn-primary">Přihlásit se</button>
                            </Link>
                            <Link href="/app">
                                <button className="btn btn-outline btn-secondary">Prohlížet úkoly</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
