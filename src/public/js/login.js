const formLogin = document.querySelector('form');

formLogin?.addEventListener('submit', async (event) => {
    event.preventDefault(); // evita la recarga de la pagina

    const formData = new FormData(formLogin);
    const formObject = Object.fromEntries(formData.entries()); 

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formObject),
        });

        if (response.ok) {
            const data = await response.json(); 
            console.log('Inicio de sesión exitoso:', data);
            window.location.href = '/home'; 
        } else {
            const errorData = await response.json(); 
            console.error('Error en el inicio de sesión:', errorData);
            alert(errorData.message || 'Error en el inicio de sesión.'); 
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
});
