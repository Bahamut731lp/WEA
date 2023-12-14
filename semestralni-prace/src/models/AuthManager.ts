import fsp from 'fs/promises';
import fs from "fs";
import path from 'path';

import AuthFileScheme from '@/interfaces/AuthFileSchema';
class AuthManager {
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
    
        let parsed: AuthFileScheme | null = null;
    
        try {
            parsed = JSON.parse(data);    
        } catch (error) {}

        return parsed;
    }

    /**
     * Funkce pro vytvoření nového přihlášení
     * @todo Implementovat
     */
    async create() {}

    /**
     * Funkce pro čtení informací o konkrétním uživateli
     * @param username ID uživatele
     * @todo Implementovat
     */
    async read(username: string) {}


    /**
     * Funkce pro změnu informací o uživateli
     * @param username ID uživatele
     * @param changes Změny
     * @returns Zda-li byly změny provedeny
     */
    async update(username: string, changes: Partial<AuthFileScheme[keyof AuthFileScheme]>) {}


    /**
     * Funkce pro smazání uživatele. Uživatel není fyzicky smazán ze souboru, ale pouze označen za odstraněného
     * @param username ID uživatele
     * @returns Zda-li byl uživatel smazán
     */
    async delete(username: string) {}
}

export default AuthManager;