import axios from 'axios'
export async function isAuthenticated(token){
    if(token!=null){
        const result = await axios.post('http://localhost:3000/api/v1/blog/auth', {token: token})
        
        return result.status == 200
    }
    return false
}

export async function isAdmin(token){
    if(token!=null){
        const result = await axios.post('http://localhost:3000/api/v1/blog/dashboard/auth', {token: token})
        
        return result.status == 200
    }
    return false
}

export function getTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
            return cookie.substring('token='.length, cookie.length);
        }
    }
    return null; // Si no se encuentra el token en la cookie
}