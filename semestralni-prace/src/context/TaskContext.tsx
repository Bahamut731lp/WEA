import React from 'react'

const TaskContext = React.createContext(null);

export function TaskContextProvider({ value, children }) {

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    const task = React.useContext(TaskContext)
    return task
}