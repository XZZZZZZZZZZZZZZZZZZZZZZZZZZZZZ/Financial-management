export async function onRequest(context) {
    const { env } = context;
    const db = env.DB;

    try {
        await db.prepare(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                amount REAL NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                date TEXT NOT NULL
            );
        `).run();

        return new Response("<h1 style='color:green; text-align:center; margin-top:50px;'>הטבלה נוצרה בהצלחה בשרת החדש! הכספת מוכנה.</h1>", { 
            headers: { "Content-Type": "text/html; charset=utf-8" } 
        });
    } catch (e) {
        return new Response("<h1 style='color:red; text-align:center; margin-top:50px;'>שגיאה: " + e.message + "</h1>", { 
            status: 500,
            headers: { "Content-Type": "text/html; charset=utf-8" }
        });
    }
}
