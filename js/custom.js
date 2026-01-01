let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX;
let initialY;

const colorOptions = document.querySelectorAll('.color-option');
const shirtImg = document.getElementById('shirtImg');
const fileInput = document.getElementById('fileInput');
const stampContainer = document.getElementById('stampContainer');
const stampImg = document.getElementById('stampImg');

const colorImages = {
    '#FFFFFF': 'assets/modelos/camiseta-blanca.png',
    '#FF0000': 'assets/modelos/camiseta-roja.png',
    '#FFFF00': 'assets/modelos/camiseta-amarilla.png',
    '#00FFFF': 'assets/modelos/camiseta-cyan.png',
    '#FF00FF': 'assets/modelos/camiseta-magenta.png',
    '#0000FF': 'assets/modelos/camiseta-azul.png'
};

colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        const color = this.getAttribute('data-color');
        const imagePath = colorImages[color];
        
        if (imagePath) {
            shirtImg.src = imagePath;
        }
    });
});

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            stampImg.src = event.target.result;
            stampContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

stampContainer.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

stampContainer.addEventListener('touchstart', dragStart);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', dragEnd);

function dragStart(e) {
    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - currentX;
        initialY = e.touches[0].clientY - currentY;
    } else {
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
    }

    if (e.target === stampContainer || e.target.parentElement === stampContainer) {
        isDragging = true;
        stampContainer.classList.add('dragging');
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        currentX = clientX - initialX;
        currentY = clientY - initialY;

        const container = document.getElementById('previewContainer');
        const rect = container.getBoundingClientRect();
        
        const maxX = rect.width / 2 - 50;
        const maxY = rect.height / 2 - 50;
        
        currentX = Math.max(-maxX, Math.min(maxX, currentX));
        currentY = Math.max(-maxY, Math.min(maxY, currentY));

        stampContainer.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    }
}

function dragEnd() {
    isDragging = false;
    stampContainer.classList.remove('dragging');
}