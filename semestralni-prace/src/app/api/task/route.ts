import { getLoginCredentialsValidity } from "@/middlewares";
import TaskManager from "@/models/TaskManager";

/**
 * Controller realizující operaci pro vytváření úkolů
 * @param request Objekt s daty požadavku
 * @returns JSON s polem chybějících klíčů
 */
export async function PUT(request: Request) {
    const authResponse = await getLoginCredentialsValidity(request);
    if (authResponse.status != 200) return authResponse;

    const db = new TaskManager()
    const data = await request.json();

    const required = ["title", "description"];
    const missing = required.filter(key => !(key in data));
    const bad = required.filter(key => !data[key]);

    if (missing.length > 0) return Response.json({
        missing,
        bad: []
    }, {
        status: 400
    })

    if (bad.length > 0) return Response.json({
        missing,
        bad
    }, {
        status: 400
    })

    db.create(String(data.title), String(data.description));

    return Response.json({ missing, bad })
}

/**
 * Controller realizující čtení úkolů
 * @param request Objekt s daty požadavku
 * @returns JSON s úkoly (včetně IDček)
 */
export async function GET(request: Request) {
    const db = new TaskManager();
    const data = await db.list();

    return Response.json(data ?? {})
}

/**
 * Controller pro updatování úkolu
 * @param request Objekt s daty požadavku
 * @returns Bool, jestli byl úkol updatován a popř. chybějící klíče
 */
export async function POST(request: Request) {
    const authResponse = await getLoginCredentialsValidity(request);
    if (authResponse.status != 200) return authResponse;

    const db = new TaskManager();
    const data = await request.json();
    const allowed = ["title", "description", "isCompleted"];

    if (!("id" in data)) return Response.json({ missing: ["id"], updated: false }, { status: 400 })

    const changes = Object.fromEntries(
        Object.entries(data)
        .filter(([key, _]) => allowed.includes(key))
    )

    const updated = await db.update(data.id, changes);

    return Response.json({
        missing: [],
        updated
    })
}

/**
 * Controller pro smazání úkolu
 * @param request Objekt s daty požadavku
 * @returns JSON s informací o smazání (true/false) a chybějícími klíči
 */
export async function DELETE(request: Request) {
    const authResponse = await getLoginCredentialsValidity(request);
    if (authResponse.status != 200) return authResponse;

    const db = new TaskManager();
    const data = await request.json();

    if (!("id" in data)) return Response.json({
        missing: ["id"],
        deleted: false
    }, {
        status: 400
    })

    const deleted = await db.delete(data.id);

    return Response.json({
        deleted,
        missing: []
    })
}