const form = document.getElementById("contact-form");
const isGerman = document.documentElement.lang === "de";
const words = isGerman
  ? {
      pending: "Deine Nachricht wird gesendet …",
      success: "Danke! Deine Nachricht wurde gesendet.",
      failed:
        "Das Senden hat nicht geklappt. Deine Eingaben bleiben erhalten. Versuch es erneut oder schreib mir direkt per E-Mail.",
      unavailable:
        "Das Formular ist gerade nicht erreichbar. Schreib mir bitte direkt per E-Mail.",
      captcha: "Bitte prüfe die Summe der beiden Zahlen.",
      whitespace: "Bitte gib hier einen Text ein.",
      copied: "Adresse kopiert.",
      copyFailed:
        "Kopieren nicht möglich. Du kannst die Adresse oben markieren.",
    }
  : {
      pending: "Sending your message …",
      success: "Thank you! Your message has been sent.",
      failed:
        "Your message could not be sent. Your entries have been kept. Try again or email me directly.",
      unavailable:
        "The form is currently unavailable. Please email me directly.",
      captcha: "Please check the sum of the two numbers.",
      whitespace: "Please enter some text here.",
      copied: "Address copied.",
      copyFailed: "Could not copy. You can select the address above instead.",
    };

if (form) {
  const fieldset = form.querySelector("fieldset");
  const status = document.getElementById("form-status");
  const captcha = document.getElementById("captcha-answer");
  const question = document.getElementById("captcha-question");
  let answer;
  let sending = false;

  function refreshQuestion() {
    const left = 1 + Math.floor(Math.random() * 9);
    const right = 1 + Math.floor(Math.random() * 9);
    answer = left + right;
    question.textContent = `${left} + ${right}`;
    captcha.value = "";
    captcha.setCustomValidity("");
    captcha.removeAttribute("aria-invalid");
  }

  function showStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state;
  }

  refreshQuestion();
  // Existing EmailJS public client configuration, retained from the original site.
  const serviceReady =
    typeof window.emailjs?.init === "function" &&
    typeof window.emailjs?.send === "function";
  if (serviceReady) {
    window.emailjs.init("5YWZAq6VEsqCpg7Vy");
    fieldset.disabled = false;
  } else {
    showStatus(words.unavailable, "error");
  }

  form.addEventListener("input", (event) => {
    if (typeof event.target.setCustomValidity === "function") {
      event.target.setCustomValidity("");
      event.target.removeAttribute("aria-invalid");
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending || !serviceReady) return;
    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");
    for (const field of [name, email, message]) {
      if (!field.value.trim()) {
        field.setCustomValidity(words.whitespace);
        field.setAttribute("aria-invalid", "true");
      }
    }
    if (!/^\d{1,2}$/.test(captcha.value) || Number(captcha.value) !== answer) {
      captcha.setCustomValidity(words.captcha);
      captcha.setAttribute("aria-invalid", "true");
    }
    if (!form.reportValidity()) return;

    sending = true;
    fieldset.disabled = true;
    form.setAttribute("aria-busy", "true");
    showStatus(words.pending, "pending");
    try {
      await window.emailjs.send("service_8xk0ywf", "template_6697bke", {
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
        time: new Date().toLocaleString(isGerman ? "de-DE" : "en-GB"),
      });
      form.reset();
      refreshQuestion();
      showStatus(words.success, "success");
    } catch {
      // Provider errors may include request data; do not log personal data.
      showStatus(words.failed, "error");
    } finally {
      sending = false;
      fieldset.disabled = false;
      form.removeAttribute("aria-busy");
      status.focus();
    }
  });
}

const copyButton = document.querySelector("[data-copy-email]");
if (copyButton && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const status = document.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText("weidner.k@protonmail.com");
      status.textContent = words.copied;
    } catch {
      status.textContent = words.copyFailed;
    }
  });
}
