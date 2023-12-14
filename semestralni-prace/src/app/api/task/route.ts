import TaskManager from "@/models/TaskManager";

/**
 * Funkce realizující operaci pro vytváření úkolů
 * @param request Objekt s daty požadavku
 * @returns JSON s polem chybějících klíčů
 */
export async function PUT(request: Request) {
    const db = new TaskManager()
    const data = await request.json();

    const required = ["title", "description"];
    const missing = required.filter(key => !(key in data));

    if (missing.length > 0) return Response.json({
        missing
    }, {
        status: 400
    })

    db.create(String(data.title), String(data.description));

    return Response.json({ missing })
}

/**
 * Funkce realizující čtení úkolů
 * @param request Objekt s daty požadavku 
 * @returns JSON s úkoly (včetně IDček)
 */
export async function GET(request: Request) {
    const db = new TaskManager();
    const data = await db.list();

    return Response.json(data ?? {})
}

/**
 * Funkce pro updatování úkolu
 * @param request Objekt s daty požadavku 
 * @returns Bool, jestli byl úkol updatován a popř. chybějící klíče
 */
export async function POST(request: Request) {
    const db = new TaskManager();
    const data = await request.json();
    const allowed = ["title", "description", "isCompleted"];

    if (!("id" in data)) return Response.json({
        missing: ["id"],
        updated: false
    }, {
        status: 400
    })

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

//DELETE
export async function DELETE(request: Request) {
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