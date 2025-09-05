// Get modal
const modal = document.getElementById("teacherModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalSubject = document.getElementById("modalSubject");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close");

// Get all teacher cards
const teacherCards = document.querySelectorAll(".teacher-card");

// Loop through each teacher card
teacherCards.forEach(card => {
  card.addEventListener("click", () => {
    const imgSrc = card.querySelector("img").src;
    const name = card.dataset.name;
    const subject = card.dataset.subject;
    const desc = card.dataset.desc;

    modalImg.src = imgSrc;
    modalName.textContent = name;
    modalSubject.textContent = subject;
    modalDesc.textContent = desc;

    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal if clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
