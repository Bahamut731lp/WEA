import React from 'react'
import TaskFileSchema from '@/interfaces/TaskFileSchema';

type TaskStateType = TaskFileSchema[keyof TaskFileSchema] & { id: string} | null;
const TaskContext = React.createContext<TaskStateType>(null);

export function TaskContextProvider({ value, children }: { value: TaskStateType, children: React.ReactNode }) {

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