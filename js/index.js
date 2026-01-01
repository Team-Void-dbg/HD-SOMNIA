
const group = document.querySelector('.group');
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;
let currentIndex = 0;

// Clonar la primera card al final para el efecto infinito
const firstCardClone = cards[0].cloneNode(true);
group.appendChild(firstCardClone);

function moveToNext() {
    currentIndex++;
    group.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Si llegamos al clon, resetear sin animación
    if (currentIndex === totalCards) {
        setTimeout(() => {
            group.style.transition = 'none';
            currentIndex = 0;
            group.style.transform = `translateX(0%)`;

            // Restaurar la transición después de un frame
            setTimeout(() => {
                group.style.transition = 'transform 0.8s ease-in-out';
            }, 50);
        }, 800); // Esperar a que termine la animación
    }
}

// Iniciar el carrusel: 5 segundos de pausa + 0.8s de animación
setInterval(moveToNext, 2800);