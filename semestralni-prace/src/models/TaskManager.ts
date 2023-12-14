import fsp from 'fs/promises';
import fs from "fs";
import path from 'path';
import TaskFileSchema from '@/interfaces/TaskFileSchema';

class TaskManager {
    dataFilePath: string = "";

    constructor() {
        this.dataFilePath = path.join(process.cwd(), 'data/tasks.json');

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
    
        let parsed: TaskFileSchema | null = null;
    
        try {
            parsed = JSON.parse(data);    
        } catch (error) {}

        return parsed;
    }

    /**
     * Funkce pro čtení všech tasků
     * @returns Obsah db
     */
    async list() {
        return await this.readDataFile()
    }

    /**
     * Funkce pro vytvoření úkolu v db
     * @param title Název úkolu
     * @param description Popis úkolu
     * @returns Zda-li bylo vytvoření úkolu úspěšné
     */
    async create(title: string, description: string) {
        const data = await this.readDataFile();
        if (!data) return false;

        let id = crypto.randomUUID();
        while (id in data) crypto.randomUUID();

        data[id] = {
            title,
            description,
            isCompleted: false
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
     * Funkce pro updatování úkolu v db
     * @param id ID úkolu, které se má změnit
     * @param changes Slovník změn
     * @returns Zda-li byl update úkolu úspěšný
     */
    async update(id: string, changes: Partial<TaskFileSchema[keyof TaskFileSchema]>) {
        const data = await this.readDataFile();

        if (!data || !(id in data)) {
            return false;
        }

        data[id] = {
            ...data[id],
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
     * Funkce pro smazání úkolu
     * @param id ID úkolu, který se má smazat
     * @returns Zda-li byl úkol úspěšně smazán
     */
    async delete(id: string) {
        const data = await this.readDataFile();

        if (!data || !(id in data)) {
            return false;
        }

        delete data[id];

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

export default TaskManager