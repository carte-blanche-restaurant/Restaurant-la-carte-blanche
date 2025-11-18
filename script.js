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
// Pour envoyer un email, on utilise Formspree (https://formspree.io)
const reservationForm = document.querySelector(".reservation-form");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".close-popup");

reservationForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // 🔹 Envoi du formulaire avec Formspree
  const formData = new FormData(reservationForm);

  try {
    const response = await fetch("https://formspree.io/f/xnnokyzd", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
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
