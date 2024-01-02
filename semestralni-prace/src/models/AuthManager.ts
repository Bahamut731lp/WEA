import fsp from 'fs/promises';
import fs from "fs";
import path from 'path';
class AuthManager {
    static saltRounds = 12;
    sessionFilePath: string = "";

    constructor(request: Request) {
        this.sessionFilePath = path.join(process.cwd(), 'data/sessions.json');
    }


}

export default AuthManager;