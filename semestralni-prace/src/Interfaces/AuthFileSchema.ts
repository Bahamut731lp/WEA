export default interface AuthFileScheme {
    [username: string]: {
        [token: string]: string
    }
}