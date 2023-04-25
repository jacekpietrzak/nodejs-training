import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const link = "https://www.youtube.com/watch?v=bji2NFoN9J8";
const imgUrl = "https://www.kowalczyk.olsztyn.pl/marchewka.2.jpg";

const getAuth = async () => {
  const etherealAuth = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  };
  if (!etherealAuth.user || !etherealAuth.pass) {
    const newUser = await nodemailer.createTestAccount();
    console.log("no data. Generating new user:", newUser);
    return newUser;
  } else {
    console.log("user from .env:", etherealAuth);
    return etherealAuth;
  }
};

const auth = await getAuth();
console.log({ auth });

// template ktorego ostatecznie nie uzywamy
const templateHtml = `
  <h1 style='color: red'>Hello there 🚀<h1/>
  <div>
  <a href=${link}>You have won 1 million carrots! 🥕🥕🥕 Get it now!</a>
  </div>
  <img src=${imgUrl} alt='marchewka'/>
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ex beatae totam dicta maiores labore quasi, nostrum illo nisi harum esse provident animi accusamus est, ullam, fuga soluta. Cumque, ipsum?</p>
  `;

// tworzymy konfiguracje poczty
// mozemy tutaj podpiac nasze ustawienia z dowolnego klienta pocztowego np. gmaila.
const config = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: auth.user, // generated ethereal user
    pass: auth.pass, // generated ethereal password
  },
};

// AGA\

const configAga = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "aidan.marks@ethereal.email",
    pass: "uBYRBSsE2SkKmczhHv",
  },
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(config);

const info = await transporter.sendMail({
  from: '"Fred Foo 👻" <foo@example.com>', // sender address
  to: "bar@example.com, baz@example.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
});

export const sendMail = async (emailOptions) => {
  // send mail with defined transport object
  // wyciagniemy opcje poza funkcje. Bedziemy je przekazywac dynamicznie.
  // const info = await transporter.sendMail({
  //   from: { name: "Fred Foo", address: "foo@example.com" }, // sender address
  //   to: ["bar@example.coom", "baz@example.com"], // list of receivers
  //   subject: `Hello ${new Date().toISOString()}`, // Subject line
  //   text: "Hello there", // plain text body
  //   html: templateHtml, // html body
  // });

  const info = await transporter.sendMail(emailOptions);
  const previewUrl = nodemailer.getTestMessageUrl(info);

  console.log(`Email sent: ${info.messageId}`, { info });
  console.log(`Preview URL: ${previewUrl}`);

  // zwrocimy info
  return info;
};
