import AuthManager from "@/models/AuthManager";
import UserManager from "@/models/UserManager";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    const db = new UserManager();
    const auth = new AuthManager();

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
    if (!user) return Response.json({missing, exists: false}, { status: 404})

    const matching = await bcrypt.compare(body.password, user.password);
    //TODO: Přidat do auth session nebo něco
}