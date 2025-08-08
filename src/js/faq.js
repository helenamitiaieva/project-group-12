const faqButtons = document.querySelectorAll(".faq-question");
faqButtons.forEach(faqButton => {
  faqButton.addEventListener("click", () => {
    const answer = faqButton.parentElement.querySelector(".faq-answer");
    const isOpen = faqButton.classList.contains("active");
    faqButtons.forEach(btn => {
      btn.classList.remove("active");
      const answerPanel = btn.nextElementSibling;
      if (answerPanel) answerPanel.style.maxHeight = null;
    });
    if (!isOpen) {
      faqButton.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
