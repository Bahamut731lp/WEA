import fsp from 'fs/promises';
import fs from "fs";
import jwt from "jsonwebtoken";
import path from 'path';

import SessionFileScheme from '@/interfaces/SessionFileSchema';

class SessionManager {
    static saltRounds = 12;
    static secret = "tadybychnormalnepouzil.envfilealetadysestimpatlatnebudu";
    sessionFilePath: string = "";

    constructor() {
        this.sessionFilePath = path.join(process.cwd(), 'data/sessions.json');

        if (!fs.existsSync("data/")) {
            fsp.mkdir("data/");
        }

        if (!fs.existsSync(this.sessionFilePath)) {
            fs.writeFileSync(this.sessionFilePath, "{}", {
                encoding: "utf-8"
            })
        }
    }

    /**
     * Boilerplate pro safe čtení souboru s daty
     * @returns {UserFileSchema | {}}
     */
    private async readDataFile() {
        const data = await fsp.readFile(this.sessionFilePath, {
            encoding: "utf-8"
        });
    
        let parsed: SessionFileScheme | null = null;
    
        try {
            parsed = JSON.parse(data);
        } catch (error) {}

        return parsed;
    }

    async create(username: string) {
        const data = await this.readDataFile();
        if (!data) return false;

        const expiresIn = "1 day";
        const token = jwt.sign({ username }, SessionManager.secret, { expiresIn });

        data[username] = {
            token
        }

        await fsp.writeFile(
            this.sessionFilePath,
            JSON.stringify(data, null, 4),
            { 
                encoding: "utf-8"
            }
        )

        return token
    }

    async verify(token: string) {
        const data = await this.readDataFile();
        if (!data) return null;

        try {
            const payload = jwt.verify(token, SessionManager.secret);
            
            if (typeof payload == "string") return null;
            if (!(payload.username in data)) return null;
            
            return payload;
        } catch (error) {
            return null;
        }
    }

    async remove(username: string) {
        const data = await this.readDataFile();
        if (!data || !data[username]) return false;

        delete data[username];

        await fsp.writeFile(
            this.sessionFilePath,
            JSON.stringify(data, null, 4),
            { 
                encoding: "utf-8"
            }
        )

        return true;
    }
}

export default SessionManager;