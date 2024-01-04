import React from 'react'

const UserContext = React.createContext([null, () => {}]);

export function UserContextProvider({children}) {
    const [user, setUser] = React.useState(null);

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
        setUser(data.response);
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
  const colorMode = React.useContext(UserContext)
  return colorMode
}