import TaskFileSchema from '@/interfaces/TaskFileSchema';
import React, { ReactNode } from 'react'

type DataStateType = {
    data: TaskFileSchema,
    isLoading: boolean,
    refresh: () => void
}

const DataContext = React.createContext<DataStateType>({data: {}, isLoading: false, refresh: () => {}});

export function DataContextProvider({ children }: { children: ReactNode }) {
    const [data, setData] = React.useState<TaskFileSchema>({});
    const [loading, setLoading] = React.useState(true);

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