import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";

const app = express();
connectDB();
app.use(express.json());

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
        const card = await Card.findById(req.params.id );
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
            message: "creada",
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

app.get("/hello", (req, res) => {
    res.status(200).send("hola desde node js XD")
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});