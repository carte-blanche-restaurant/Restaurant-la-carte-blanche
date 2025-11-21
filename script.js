// === MENU DYNAMIQUE ===
const menuButtons = document.querySelectorAll(".menu-btn");
const menuSections = document.querySelectorAll(".menu-grid");

menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Retirer la classe active de tous les boutons
    menuButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Masquer toutes les sections de plats
    menuSections.forEach((section) => section.classList.add("hidden"));

    // Afficher la bonne catégorie
    const target = btn.getAttribute("data-target");
    document.getElementById(target).classList.remove("hidden");
  });
});

// === FORMULAIRE DE COMMANDE ===
document.querySelector(".order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const service = document.querySelector("#service").value;
  const name = this.querySelector("input[type='text']").value;

  if (service === "livraison") {
    alert(`Merci ${name} ! Votre commande sera livrée sous peu 🚗`);
  } else if (service === "emporter") {
    alert(`Merci ${name} ! Votre commande sera prête à être récupérée 🥡`);
  } else {
    alert("Merci pour votre commande !");
  }

  this.reset();
});

// === FORMULAIRE DE RÉSERVATION ===
// === FORMULAIRE DE RÉSERVATION ===
const reservationForm = document.querySelector(".reservation-form");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".close-popup");

reservationForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(reservationForm);

  // Message structuré pour ton email
  formData.append("_subject", "📩 Nouvelle réservation");
  formData.append("_format", "plain");

  const nom = formData.get("nom");
  const email = formData.get("email");
  const telephone = formData.get("telephone");
  const personnes = formData.get("personnes");
  const date = formData.get("date");
  const heure = formData.get("heure");
  const message = formData.get("message") || "Aucun message";

  const texteEmail = `
Nouvelle réservation :

👤 Nom : ${nom}
📞 Téléphone : ${telephone}
📧 Email : ${email}

👥 Nombre de personnes : ${personnes}
📅 Date : ${date}
⏰ Heure : ${heure}

💬 Message :
${message}
  `;

  formData.append("message-format", texteEmail);
  formData.append("_replyto", email); // envoi du mail de confirmation au client

  try {
    const response = await fetch("https://formspree.io/f/xgvqellw", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      popup.style.display = "flex";
      reservationForm.reset();
    } else {
      alert("Une erreur est survenue. Réessayez plus tard.");
    }
  } catch (error) {
    alert("Erreur de connexion. Vérifiez votre réseau.");
  }
});

// === FERMER LA POPUP ===
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});
