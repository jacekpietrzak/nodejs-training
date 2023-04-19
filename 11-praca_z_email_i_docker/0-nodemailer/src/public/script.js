// tworzymy input dla dodatkowych odbiorcow
const createRecipientInput = () => {
  const input = document.createElement("input");
  input.type = "email";
  input.className = "alignSelfStretch";
  input.placeholder = "Recipient email";
  input.id = "recipientEmail";
  input.required = true;

  return input;
};
// pobieramy przycisk
const addRecipientBtn = document.querySelector("button#add-recipient");

// tworzymy eventlistener ktory na click w buttona doda nam nowe elementy
addRecipientBtn.addEventListener("click", () => {
  const recipientInput = createRecipientInput();
  addRecipientBtn.insertAdjacentElement("beforebegin", recipientInput);
});

// pobieramy forme
const form = document.querySelector("form#emailForm");

// tworzymy funkcje ktora wysle emaila

const submitEmail = async (event) => {
  event.preventDefault();

  // pobieramy wartosci z inputow
  const senderName = document.querySelector("input#senderName").value;
  const senderEmail = document.querySelector("input#senderEmail").value;
  const recipientsInput = document.querySelectorAll("#recipients > input");
  const recipients = [...recipientsInput].map((input) => input.value);
  const subject = document.querySelector("input#subject").value;

  // pobieramy wartosci z textArea
  const text = document.querySelector("textarea#plainText").value;
  const html = document.querySelector("textarea#htmlText").value;

  // zapisujemy wszystkie dane w jednym obiekcie
  const emailPayload = {
    from: {
      name: senderName,
      address: senderEmail,
    },
    to: recipients,
    subject,
    text,
    html,
  };

  console.log({ emailPayload });

  // piszemy metode do wysylania zapytania
  const response = await fetch("/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailPayload),
  })
    .then((res) => res.json())
    .catch(console.error);

  // wiadomosc po wyslaniu formularza
  console.log({ response });
  alert(JSON.stringify(response, null, 2));
};

// odpalimy funkcje wyslania kiedy submitujemy formularz
form.addEventListener("submit", submitEmail);
