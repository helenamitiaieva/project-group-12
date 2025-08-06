
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = button.classList.contains("active");

    document.querySelectorAll(".faq-question").forEach(btn => {
      btn.classList.remove("active");
      btn.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen) {
      button.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
