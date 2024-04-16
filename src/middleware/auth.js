import axios from 'axios'

const API_BASE_URL = 'https://soundscape-server.onrender.com'; // O utiliza config.ORIGIN_URL_SERVER si lo has definido en otro lugar

export async function isAuthenticated(token) {
    try {
        if (token) {
            const result = await axios.post(`${API_BASE_URL}/api/v1/blog/auth`, { token });
            return result.status === 200;
        }
        return false;
    } catch (error) {
        console.error('Error en la autenticación:', error);
        return false;
    }
}

export async function isAdmin(token) {
    try {
        if (token) {
            const result = await axios.post(`${API_BASE_URL}/api/v1/blog/dashboard/auth`, { token });
            return result.status === 200;
        }
        return false;
    } catch (error) {
        console.error('Error en la verificación de administrador:', error);
        return false;
    }
}

export function getTokenFromCookie(cookieString) {
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
            return cookie.substring('token='.length, cookie.length);
        }
    }
    return null;
}