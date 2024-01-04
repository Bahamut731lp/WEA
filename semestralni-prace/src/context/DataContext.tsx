import TaskFileSchema from '@/interfaces/TaskFileSchema';
import React from 'react'

const DataContext = React.createContext({});

export function DataContextProvider({ children }) {
    const [data, setData] = React.useState<TaskFileSchema>({});
    const [loading, setLoading] = React.useState(false);

    async function getTaskData() {
        const response = await fetch('/api/task')
        const json = await response.json();

        setData(json)
        setLoading(false);
    }

    React.useEffect(() => {
        getTaskData();
    }, []);

    return (
        <DataContext.Provider value={{data, isLoading: loading, refresh: getTaskData}}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    const refresh = React.useContext(DataContext)
    return refresh
}