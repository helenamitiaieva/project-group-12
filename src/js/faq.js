document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.parentElement.querySelector(".faq-answer");
    const isOpen = button.classList.contains("active");

    document.querySelectorAll(".faq-question").forEach(btn => {
      btn.classList.remove("active");
      btn.parentElement.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isOpen) {
      button.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
