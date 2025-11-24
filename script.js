document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item");
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");

    const rootStyles = getComputedStyle(document.documentElement);
    const frontDepth = rootStyles.getPropertyValue("--front-depth").trim();
    const sideOffset = rootStyles.getPropertyValue("--side-offset").trim();
    const sideDepth = rootStyles.getPropertyValue("--side-depth").trim();

    let currentIndex = 0;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove("active");

            if (index === currentIndex) {
                item.classList.add("active");
                item.style.transform = `translateZ(${frontDepth})`;
            } else if (index === (currentIndex + 1) % items.length) {
                item.style.transform = `translateX(${sideOffset}) translateZ(${sideDepth})`;
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.style.transform = `translateX(-${sideOffset}) translateZ(${sideDepth})`;
            } else {
                item.style.transform = `translateZ(calc(${sideDepth} * -1))`;
            }
        });
    }

    function moveNext() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function movePrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    nextButton.addEventListener("click", moveNext);
    prevButton.addEventListener("click", movePrev);

    // Adicionando clique na tela para mudar os slides
    document.addEventListener("click", (event) => {
        const middle = window.innerWidth / 2; // Calcula o centro da tela
        if (event.clientX > middle) {
            moveNext(); // Clique do lado direito
        } else {
            movePrev(); // Clique do lado esquerdo
        }
    });

    updateCarousel();
});
