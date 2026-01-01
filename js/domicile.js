function updateDateTime() {
    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const dateElement = document.getElementById('current_date');
    const timeElement = document.getElementById('current_time');
    
    if (dateElement) dateElement.textContent = dateString;
    if (timeElement) timeElement.textContent = timeString;
}
if (document.getElementById('current_date') && document.getElementById('current_time')) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

const domicileForm = document.getElementById('domicile_form');
if (domicileForm) {
    domicileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            fecha: document.getElementById('current_date').textContent,
            hora: document.getElementById('current_time').textContent,
            persona: document.getElementById('person').value,
            direccion: document.getElementById('direction').value,
            localidad: document.getElementById('locality').value,
            barrio: document.getElementById('neighborhood').value,
            telefono: document.getElementById('number_user').value
        };
        
        console.log('Pedido registrado:', formData);
        alert('Pedido registrado exitosamente!\n\nFecha: ' + formData.fecha + '\nHora: ' + formData.hora);
    });
}