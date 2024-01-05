import { getLoginCredentialsValidity } from "@/middlewares";
import SessionManager from "@/models/SessionManager";

export async function POST(request: Request) {
    const session = new SessionManager();
    const {username} = await request.json();
    const response = await getLoginCredentialsValidity(request);

    if (!username) return Response.json({missing: ["username"]}, { status: 400 })
    if (response.status == 200) session.remove(username)

    return Response.json({missing: []}, { status: 200 })
}