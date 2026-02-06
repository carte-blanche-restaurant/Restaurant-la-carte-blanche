// ===== MENU DYNAMIQUE ===== 
// ===== CACHER LE POPUP AU CHARGEMENT =====
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".popup");
  if (popup) popup.style.display = "none";
});

const menuButtons = document.querySelectorAll(".menu-btn");
const menuSections = document.querySelectorAll(".menu-grid");

menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    menuSections.forEach(sec => sec.classList.add("hidden"));
    document.getElementById(btn.getAttribute("data-target")).classList.remove("hidden");
  });
});

// ===== FORMULAIRE DE RÉSERVATION =====
const reservationForm = document.querySelector(".reservation-form");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".close-popup");

reservationForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(reservationForm);

  const nom = formData.get("nom");
  const email = formData.get("email");
  const telephone = formData.get("telephone");
  const personnes = formData.get("personnes");
  const date = formData.get("date");
  const heure = formData.get("heure");
  const message = formData.get("message") || "Aucun message";

  // ==== Email client simple ====
  const emailClient = `
Bonjour ${nom},

Votre réservation au restaurant Carte Blanche a été confirmée ✅

📅 Date : ${date}
⏰ Heure : ${heure}
👥 Nombre de personnes : ${personnes}

Merci de nous avoir choisi !
  `;

  // ==== Email admin complet ====
  const emailAdmin = `
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

  // Config Formspree
  formData.set("_replyto", email); 
  formData.set("_subject", "Carte Blanche | Confirmation de réservation"); 
  formData.set("_autoresponse", emailClient); // mail client simple
  formData.append("message-format", emailAdmin); // mail admin complet

  try {
    const response = await fetch(reservationForm.action, {
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

document.addEventListener("DOMContentLoaded", () => {

  // ===== POPUP =====
  const popup = document.querySelector(".popup");
  const closePopup = document.querySelector(".close-popup");

  if (popup) popup.style.display = "none";

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // ===== BLOQUER LE 7 FÉVRIER 2026 =====
  const dateInput = document.querySelector('input[type="date"]');

  const blockedDate = "2026-02-07";

  if (dateInput) {
    dateInput.addEventListener("input", () => {
      if (dateInput.value === blockedDate) {
        alert("❌ Les réservations ne sont pas disponibles le 7 février 2026. Merci de choisir une autre date.");
        dateInput.value = "";
      }
    });
  }

});


