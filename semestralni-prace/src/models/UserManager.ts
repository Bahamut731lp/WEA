import fsp from 'fs/promises';
import fs from "fs";
import path from 'path';
import bcrypt from "bcrypt";

import _ from "lodash";
import SessionManager from './SessionManager';
import UserFileSchema from '@/interfaces/UserFileSchema';

class UserManager {
    dataFilePath: string = "";
    maxUsernameLength = 256;

    constructor() {
        this.dataFilePath = path.join(process.cwd(), 'data/users.json');

        if (!fs.existsSync("data/")) {
            fsp.mkdir("data/");
        }

        if (!fs.existsSync(this.dataFilePath)) {
            fs.writeFileSync(this.dataFilePath, "{}", {
                encoding: "utf-8"
            })
        }
    }

    /**
     * Boilerplate pro safe čtení souboru s daty
     * @returns {UserFileSchema | {}}
     */
    private async readDataFile() {
        const data = await fsp.readFile(this.dataFilePath, {
            encoding: "utf-8"
        });
    
        let parsed: UserFileSchema | null = null;
    
        try {
            parsed = JSON.parse(data);
        } catch (error) {}

        return parsed;
    }

    static isUsernameValid(username: string) {
        return ![
            username.includes(" "),
            username.normalize("NFD").replace(/[\u0300-\u036f]/g, "") != username
        ].some(v => v);
    }

    /**
     * Funkce pro vytvoření nového uživatele
     * @param username Jméno uživatele
     * @param password Heslo uživatele
     * @param hasTwoFactorAuth Jestli uživatel chce mít zapnuté dvoufázové ověřování
     * @returns Zda-li bylo vytvoření úspěšné
     */
    async create(username: string, password: string, hasTwoFactorAuth: boolean) {
        const data = await this.readDataFile();
        if (!data) return false;

        const hashedPassword = await bcrypt.hash(password, SessionManager.saltRounds);

        data[username] = {
            username,
            password: hashedPassword,
            hasTwoFactorAuth: false,
            isDeleted: false
        }

        await fsp.writeFile(
            this.dataFilePath,
            JSON.stringify(data, null, 4),
            { 
                encoding: "utf-8"
            }
        )

        return true
    }

    /**
     * Funkce pro čtení informací o konkrétním uživateli
     * @param username Username uživatele
     */
    async read(username: string) {
        const data = await this.readDataFile();
        if (!data) return false;

        const user = data[username];

        return user;
    }


    /**
     * Funkce pro změnu informací o uživateli
     * @param username Uživatelské jméno
     * @param changes Změny
     * @returns Zda-li byly změny provedeny
     */
    async update(username: string, changes: Partial<UserFileSchema[keyof UserFileSchema]>) {
        const data = await this.readDataFile();

        if (!data || !(username in data)) {
            return false;
        }

        data[username] = {
            ...data[username],
            ...changes
        };

        await fsp.writeFile(
            this.dataFilePath,
            JSON.stringify(data, null, 4),
            { 
                encoding: "utf-8"
            }
        )

        return true;
    }


    /**
     * Funkce pro smazání uživatele. Uživatel není fyzicky smazán ze souboru, ale pouze označen za odstraněného
     * @param username ID uživatele
     * @returns Zda-li byl uživatel smazán
     */
    async delete(username: string) {
        const data = await this.readDataFile();

        if (!data || !(username in data)) {
            return false;
        }

        data[username].isDeleted = true;

        await fsp.writeFile(
            this.dataFilePath,
            JSON.stringify(data, null, 4),
            { 
                encoding: "utf-8"
            }
        )

        return true;
    }
}

export default UserManager;