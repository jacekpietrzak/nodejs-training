import express from "express";
import path from "path";
import { sendMail } from "./sender.js";

const app = express();

app.use("/", express.static(path.join("src", "public")));

app.use(express.json());

app.post("/email/send", async (req, res) => {
  try {
    const info = await sendMail(req.body);
    res.status(250).json({ msg: "Message sent", info });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
