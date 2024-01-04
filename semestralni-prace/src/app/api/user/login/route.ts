import SessionManager from "@/models/SessionManager";
import UserManager from "@/models/UserManager";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    const db = new UserManager();
    const session = new SessionManager();

    const body = await request.json();
    const required = ["username", "password"];
    const missing = required.filter(key => !(key in body));

    if (missing.length > 0) {
        return Response.json(
            {
                missing,
                exists: false
            },
            {
                status: 400
            }
        )
    }

    const user = await db.read(body.username);
    if (!user) return Response.json({missing, exists: false}, { status: 404});

    const matching = await bcrypt.compare(body.password, user.password);

    if (matching) {
        const token = await session.create(user.username);
        return Response.json({missing, token}, { status: 200 })
    }

    return Response.json({missing}, { status: 403 })
}