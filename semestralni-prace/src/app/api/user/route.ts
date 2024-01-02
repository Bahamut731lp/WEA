import UserManager from "@/models/UserManager";
import { NextRequest } from "next/server";

/**
 * Controller realizující operaci pro vytváření uživatelů
 * @param request Objekt s daty požadavku
 * @returns JSON s polem chybějících klíčů
 */
export async function PUT(request: Request) {
    const db = new UserManager()
    const data = await request.json();

    const required = ["username", "password"];
    const missing = required.filter(key => !(key in data));
    const bad = required.filter(key => !data[key]);

    if (missing.length > 0) return Response.json({ missing, bad: [] }, { status: 400 })
    if (bad.length > 0) return Response.json({ missing, bad }, { status: 400 })
    if (!UserManager.isUsernameValid(String(data.username))) return Response.json({ missing: [], bad: ["username"] }, { status: 400 })

    db.create(String(data.username), String(data.password), false);

    return Response.json({ missing, bad })
}

/**
 * Controller realizující čtení dat uživatele
 * @param request Objekt s daty požadavku 
 * @returns JSON s informaci o uživateli
 */
export async function GET(request: NextRequest) {    
    const db = new UserManager();
    const data = Object.fromEntries(request.nextUrl.searchParams.entries());
    const response = await db.read(data.username);

    return Response.json(response ?? {});
}

/**
 * Controller pro smazání úkolu
 * @param request Objekt s daty požadavku 
 * @returns JSON s informací o smazání (true/false) a chybějícími klíči
 */
export async function DELETE(request: Request) {
    const db = new UserManager();
    const data = await request.json();

    if (!("username" in data)) return Response.json({ missing: ["username"], deleted: false }, { status: 400 })

    const deleted = await db.delete(data.username);

    return Response.json({
        deleted,
        missing: []
    })
}