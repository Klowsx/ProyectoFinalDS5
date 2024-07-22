let baseUrl = "http://localhost:8080"

async function añadirPuntos(userId, puntos) {
    const usuario = {
        idUsuario: userId,
        puntos: puntos
    }
  
    try {
        const response = await fetch(baseUrl + '/puntos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
  
        if (response.ok) {
            const result = await response.json();
            console.log('Puntos actualizados exitosamente:', result);
        } else {
            console.error('Error al actualizar los puntos:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  }
  