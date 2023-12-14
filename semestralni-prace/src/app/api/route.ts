export async function GET(request: Request) {
    return Response.json({
        version: "0.1.0"
    })
}