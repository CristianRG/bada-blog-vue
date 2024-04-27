import axios from 'axios'
import { store } from '@/state'
export async function isAuthenticated(token) {
    if (token != null) {
        try {
            const result = await axios.post(`${process.env.VUE_APP_ORIGIN_SERVER}/api/v1/blog/auth`, { token: token })
            
            if (result.data.idSession) {
                store.commit('setIdSession', result.data.idSession)
                return result.status == 200
            }
        } catch (error) {
            return false
        }
    }
    return false
}

export async function isAdmin(token) {
    if (token != null) {
        try {
            const result = await axios.post(`${process.env.VUE_APP_ORIGIN_SERVER}/api/v1/blog/dashboard/auth`, { token: token })
            if (result.data.idSession) {
                store.commit('setIdSession', result.data.idSession)
                return result.status == 200
            }
        } catch (error) {
            return false
        }
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