import { useData } from "@/context/DataContext";
import { useUser } from "@/context/UserContext"
import Link from "next/link";

function UserInfo() {
    const [user, setUser] = useUser();
    const {refresh} = useData();

    async function onLogoutClick() {
        const response = await fetch("/api/user/logout", {
            method: "POST",
            headers: {
                "Authorization": user.token
            },
            body: JSON.stringify({
                username: user.username,
                token: user.token
            })
        })
        
        if (response.ok) {
            refresh();
            setUser(null);
            sessionStorage.removeItem("authorization");
        }
    }

    return (
        <div className="flex-none gap-2">
            {
                user ? (
                    <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                <span>SY</span>
                            </div>
                        </div> 
                        <div>
                            <div className="font-bold text-sm">{user.username ?? ""}</div>
                            <button className="opacity-50 text-xs" onClick={onLogoutClick}>Odhlásit</button>
                        </div>
                    </div>
                ) : (
                    <Link href="/login">
                        <button className="btn btn-sm btn-primary">Přihlásit</button>
                    </Link>
                )
            }
        </div>
    )
}

export default UserInfo