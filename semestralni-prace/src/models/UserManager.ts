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
     * @param id ID uživatele
     * @todo Implementovat
     */
    async read(id: string) {}


    /**
     * Funkce pro změnu informací o uživateli
     * @param id ID uživatele
     * @param changes Změny
     * @returns Zda-li byly změny provedeny
     */
    async update(id: string, changes: Partial<UserFileSchema[keyof UserFileSchema]>) {}


    /**
     * Funkce pro smazání uživatele. Uživatel není fyzicky smazán ze souboru, ale pouze označen za odstraněného
     * @param id ID uživatele
     * @returns Zda-li byl uživatel smazán
     */
    async delete(id: string) {}
}

export default UserManager;