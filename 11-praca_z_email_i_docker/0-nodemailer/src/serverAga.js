import express from "express";
import path from "path";
import nodemailer from "nodemailer";

const app = express();

app.use("/", express.static(path.join("src", "public")));

app.use(express.json());

app.post("/email/send", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "aidan.marks@ethereal.email",
        pass: "uBYRBSsE2SkKmczhHv",
      },
    });

    await transporter.sendMail({
      from: "aidan.marks@ethereal.email",
      to: "juzivo@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
    return res.json({ msg: "message sent" });
  } catch (error) {
    return console.log(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
