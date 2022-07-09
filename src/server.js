const express = require("express");
require("./db/conn");
const userRouter = require('./routers/User')
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

const corsOptions = {
    Origin: ["http://localhost:3000", "http://27.0.0.1:3000"],
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(userRouter)

app.get("/", (req, res) => {
    res.send("I'm on the home Page")
});

app.listen(port, () => {
    console.log(`App running on http://127.0.0.1:${port}`)
});
