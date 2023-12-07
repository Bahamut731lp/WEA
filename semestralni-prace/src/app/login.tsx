
function Login() {
    return (
        <section className="bg-primary text-primary-content rounded-xl py-10 px-12 prose">
            <h1>Přihlásit se</h1>
            <div className="grid gap-8">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Uživatelské jméno</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Heslo</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                </label>

                <button className="btn btn-wide">Přihlásit</button>
            </div>
        </section>
    )
}

export default Login