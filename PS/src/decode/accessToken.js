import {jwtDecode} from 'jwt-decode'

export const getUserFromToken=()=>{
    const token=JSON.parse(localStorage.getItem('token'))
    if (!token) return null

    try{
        const decoded=jwtDecode(token.token)
        const currentTime=Date.now()/1000


        if (decoded.exp<currentTime){
            localStorage.removeItem('token')
            return null
        }
        return decoded
    }catch(error){
        return null
    }
}