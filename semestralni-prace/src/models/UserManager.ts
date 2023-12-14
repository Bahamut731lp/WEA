import fsp from 'fs/promises';
import fs from "fs";
import path from 'path';

import UserFileSchema from '@/interfaces/UserFileSchema';

class UserManager {
    dataFilePath: string = "";

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
     * @returns {TaskFileSchema | {}}
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

    /**
     * Funkce pro vytvoření nového uživatele
     * @param username Jméno uživatele
     * @param password Heslo uživatele
     * @param hasTwoFactorAuth Jestli uživatel chce mít zapnuté dvoufázové ověřování
     * @returns Zda-li bylo vytvoření úspěšné
     * @todo Implementovat
     */
    async create(username: string, password: string, hasTwoFactorAuth: boolean) {}

    /**
     * Funkce pro čtení informací o konkrétním uživateli
     * @param username ID uživatele
     * @todo Implementovat
     */
    async read(username: string) {
        const data = await this.readDataFile() ?? {};

        return data[username]
    }


    /**
     * Funkce pro změnu informací o uživateli
     * @param username ID uživatele
     * @param changes Změny
     * @returns Zda-li byly změny provedeny
     */
    async update(username: string, changes: Partial<UserFileSchema[keyof UserFileSchema]>) {}


    /**
     * Funkce pro smazání uživatele. Uživatel není fyzicky smazán ze souboru, ale pouze označen za odstraněného
     * @param username ID uživatele
     * @returns Zda-li byl uživatel smazán
     */
    async delete(username: string) {}
}

export default UserManager;