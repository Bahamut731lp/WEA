import React from 'react'
import UserFileSchema from '@/interfaces/UserFileSchema';

type UserStateType = (UserFileSchema[keyof UserFileSchema] & { token: string }) | null 
const UserContext = React.createContext<[UserStateType, any]>([null, () => { }]);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<UserStateType>(null);

    async function getUserData() {
        const auth = window.sessionStorage.getItem("authorization");
        if (!auth) return null;

        const response = await fetch("/api/auth/verify", {
            method: "POST",
            headers: {
                "Authorization": auth
            }
        });

        const data = await response.json();

        if (response.ok) {
            setUser({...data.response, token: auth});
        }
    }

    React.useEffect(() => {
        getUserData();
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = React.useContext(UserContext)
    return user
}