import fsPromises from 'fs/promises';
import path from 'path';

const tasksFile = path.join(process.cwd(), 'data/tasks.json');

//CREATE
export async function PUT(request: Request) {
    return Response.json({
        method: "PUT"
    })
}

//READ
export async function GET(request: Request) {
    const data = await fsPromises.readFile(tasksFile, {
        encoding: "utf-8"
    });

    let parsed = null;

    try {
        parsed = JSON.parse(data);    
    } catch (error) {
        return 500
    }

    return Response.json(parsed)
}

//UPDATE
export async function POST(request: Request) {
    return Response.json({
        method: "POST"
    })
}

//DELETE
export async function DELETE(request: Request) {
    return Response.json({
        method: "DELETE"
    })
}