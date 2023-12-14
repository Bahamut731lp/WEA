export default interface TaskFileSchema {
    [key: string]: {
        title: string,
        description: string,
        isCompleted: boolean
    }
}