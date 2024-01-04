"use client"
import React from "react";

export default function Page() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function onFormSubmit() {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            window.sessionStorage.setItem("authorization", data.token);
            window.location.pathname = "/app";
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base-100">
            <section className="bg-primary rounded-xl py-10 px-12 prose">
                <h1 className="text-primary-content">Přihlásit se</h1>
                <div className="grid gap-8">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-secondary-content">Uživatelské jméno</span>
                        </div>
                        <input 
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-secondary-content">Heslo</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button className="btn btn-wide" onClick={onFormSubmit}>Přihlásit</button>
                </div>
            </section>
        </main>
    )
}