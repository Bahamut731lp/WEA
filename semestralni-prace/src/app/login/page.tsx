export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base-100">
            <section className="bg-primary rounded-xl py-10 px-12 prose">
                <h1 className="text-primary-content">Přihlásit se</h1>
                <div className="grid gap-8">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-secondary-content">Uživatelské jméno</span>
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-secondary-content">Heslo</span>
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </label>

                    <button className="btn btn-wide">Přihlásit</button>
                </div>
            </section>
        </main>
    )
}