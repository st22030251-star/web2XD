import express from "express";
import cors from 'cors';
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
import { baseModel } from "./models/base.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const docsHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Cards API</title>
<style>
    * { box-sizing: border-box; }
    body { background: #000; color: #fff; font-family: "Segoe UI", sans-serif; margin: 0; padding: 40px; line-height: 1.5; }
    h1 { font-size: 28px; margin-bottom: 24px; }
    .endpoint { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .tag { display: inline-block; background: #111; border: 1px solid #444; padding: 4px 10px; margin-right: 12px; border-radius: 999px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
    code { font-family: "Fira Code", "Courier New", monospace; }
    pre { background: #111; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
    h2 { font-size: 14px; margin: 16px 0 8px; text-transform: uppercase; letter-spacing: 1px; }
</style>
</head>
<body>
<h1>Cards API</h1>
<div class="endpoint">
  <span class="tag">POST</span><code>https://web2xd.onrender.com/createcard</code>
  <p>Crea una nueva tarjeta.</p>
  <h2>Body (JSON)</h2>
  <pre><code>{
  "name": "Nombre de la tarjeta",
  "link": "https://midominio.com/recurso",
  "description": "Notas opcionales"
}</code></pre>
  <h2>Respuesta 201</h2>
  <pre><code>{
  "message": "Card created"
}</code></pre>
</div>
<div class="endpoint">
  <span class="tag">GET</span><code>https://web2xd.onrender.com/getcard/:id</code>
  <p>Obtiene una tarjeta específica.</p>
  <h2>Respuesta 200</h2>
  <pre><code>{
  "_id": "665c1d1f2f1e5ab3c99f1a00",
  "name": "Nombre de la tarjeta",
  "link": "https://midominio.com/recurso",
  "description": "Notas opcionales",
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:00:00.000Z",
  "__v": 0
}</code></pre>
</div>
<div class="endpoint">
  <span class="tag">PUT</span><code>https://web2xd.onrender.com/updatecard/:id</code>
  <p>Actualiza una tarjeta existente.</p>
  <h2>Body (JSON)</h2>
  <pre><code>{
  "name": "Nombre actualizado",
  "link": "https://midominio.com/nuevo-recurso",
  "description": "Notas editadas"
}</code></pre>
  <h2>Respuesta 200</h2>
  <pre><code>{
  "_id": "665c1d1f2f1e5ab3c99f1a00",
  "name": "Nombre actualizado",
  "link": "https://midominio.com/nuevo-recurso",
  "description": "Notas editadas",
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:10:00.000Z",
  "__v": 0
}</code></pre>
</div>
<div class="endpoint">
  <span class="tag">DELETE</span><code>https://web2xd.onrender.com/deletecard/:id</code>
  <p>Elimina la tarjeta indicada.</p>
  <h2>Respuesta 200</h2>
  <pre><code>{
  "message": "Tarjeta eliminada"
}</code></pre>
</div>
<div class="endpoint">
  <span class="tag">GET</span><code>https://web2xd.onrender.com/getallcards</code>
  <p>Obtiene todas las tarjetas almacenadas.</p>
  <h2>Respuesta 200</h2>
  <pre><code>{
  "message": "creada",
  "data": [
    {
      "_id": "665c1d1f2f1e5ab3c99f1a00",
      "name": "Nombre de la tarjeta",
      "link": "https://midominio.com/recurso",
      "description": "Notas opcionales",
      "createdAt": "2025-01-01T12:00:00.000Z",
      "updatedAt": "2025-01-01T12:00:00.000Z",
      "__v": 0
    }
  ]
}</code></pre>
</div>
</body>
</html>`;

    res.type("html").status(200).send(docsHtml);
});

app.post("/createcard", async (req, res) => {
    try {
        await Card.create(req.body);
        return res.status(201).json({ message: "Card created" })
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}
)

app.get("/getcard/:id", async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card)
            throw new Error("No existe la tarjeta con ese id");
        return res.status(200).json(card);
    }
    catch (error) {
        console.error(error.message);
        return res.status(404).json({ error: error.message });
    }
}
)

app.put("/updatecard/:id", async (req, res) => {
    try {
        const card = await Card.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!card)
            throw new Error("No existe la tarjeta con ese id");
        return res.status(200).json(card);
    }
    catch (error) {
        console.error(error.message);
        return res.status(404).json({ error: error.message });
    }
}
)

app.delete("/deletecard/:id", async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id);
        if (!card)
            throw new Error("No existe la tarjeta con ese id");
        return res.status(200).json({ message: "Tarjeta eliminada" });
    }
    catch (error) {
        console.error(error.message);
        return res.status(404).json({ error: error.message });
    }
}
)

app.get("/getallcards", async (req, res) => {
    try {
        const cards = await Card.find(req.body);
        return res.status(200).json({
            message: "data",
            data: cards
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}
)

app.post("/send", async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    res.status(200).send("Datos recibidos");
});

//############################################ database endpoints ###########################################

app.post("/base/create", async (req, res) => {
    try {
        const result = await baseModel.create(req.body);
        return res.status(201).json({ message: "Base created", data: result  })
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
})

app.get("/base/getall", async (req, res) => {
    try {
        const bases = await baseModel.find();
        return res.status(200).json({
            message: "data",
            data: bases
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
})

app.get("/hello", (req, res) => {
    res.status(200).send("hola desde node js XD")
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
