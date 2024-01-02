export default interface UserFileSchema {
    [key: string]: {
        username: string,
        password: string,
        isDeleted: boolean
    }
}