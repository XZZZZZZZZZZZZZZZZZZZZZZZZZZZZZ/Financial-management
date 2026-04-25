export async function onRequest(context) {
    const { request, env } = context;
    const db = env.DB;

    // משיכת כל התנועות (כדי להציג בטבלה)
    if (request.method === "GET") {
        try {
            const { results } = await db.prepare("SELECT * FROM transactions ORDER BY id DESC").all();
            return Response.json(results);
        } catch (e) {
            return Response.json({ error: e.message }, { status: 500 });
        }
    }

    // הוספת תנועה חדשה לכספת
    if (request.method === "POST") {
        try {
            const data = await request.json();
            await db.prepare(`
                INSERT INTO transactions (type, amount, description, category, date) 
                VALUES (?, ?, ?, ?, ?)
            `).bind(data.type, data.amount, data.description, data.category, data.date).run();
            return Response.json({ success: true });
        } catch (e) {
            return Response.json({ error: e.message }, { status: 500 });
        }
    }

    return new Response("Method not allowed", { status: 405 });
}
