let currentPage = 0;
const totalPages = 4;

function openBook() {
    document.querySelector('.book-cover').style.display = 'none';
    document.getElementById('book').classList.add('active');
    showPage(0);
}

function closeBook() {
    document.getElementById('book').classList.remove('active');
    setTimeout(() => {
        document.querySelector('.book-cover').style.display = 'flex';
    }, 300);
}

function showPage(pageIndex) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const leftIndex = pageIndex * 2;
    const rightIndex = pageIndex * 2 + 1;
    
    if (pages[leftIndex]) pages[leftIndex].classList.add('active');
    if (pages[rightIndex]) pages[rightIndex].classList.add('active');
    
    updateNavigation();
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

function updateNavigation() {
    document.getElementById('prevBtn').disabled = currentPage === 0;
    document.getElementById('nextBtn').disabled = currentPage === totalPages - 1;
    document.getElementById('pageNumber').textContent = `Página ${currentPage * 2 + 1}-${currentPage * 2 + 2}`;
}

document.addEventListener('keydown', (e) => {
    if (document.getElementById('book').classList.contains('active')) {
        if (e.key === 'ArrowRight') nextPage();
        if (e.key === 'ArrowLeft') prevPage();
        if (e.key === 'Escape') closeBook();
    }
});
function goToHome() {
    window.location.href = 'index.html';
}