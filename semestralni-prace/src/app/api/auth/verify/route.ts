import { getLoginCredentialsValidity } from "@/middlewares";

export async function POST(request: Request) {
    return await getLoginCredentialsValidity(request);
}