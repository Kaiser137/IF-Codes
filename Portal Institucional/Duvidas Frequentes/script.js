document.addEventListener("DOMContentLoaded", function() {
    var items = document.querySelectorAll(".faq-item");

    items.forEach(function(item) {
        item.addEventListener("click", function() {
            // Fechar todas as respostas abertas
            items.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".faq-answer").style.maxHeight = "0";
                    setTimeout(() => {
                        otherItem.querySelector(".faq-answer").style.display = "none";
                    }, 300);
                }
            });

            // Alternar a visibilidade da resposta atual
            item.classList.toggle("active");
            var currentAnswer = item.querySelector(".faq-answer");
            if (item.classList.contains("active")) {
                currentAnswer.style.display = "block";
                currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
            } else {
                currentAnswer.style.maxHeight = "0";
                setTimeout(() => {
                    currentAnswer.style.display = "none";
                }, 300);
            }
        });
    });
});