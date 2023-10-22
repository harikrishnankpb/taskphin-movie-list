import jwt from "jsonwebtoken"

export default async function auth(token: string, min: Number): Promise<any> {
    if (min == 0 && !token) return { _id: null, role: 0 }
    if (!token) throw new Error('Please login in-order to access')
    let data: any
    let secret = (process.env.JWT_SECRET || '')

    try {
        data = jwt.verify(token, secret)
    } catch (e) {
        throw new Error('Invalid token')
    }

    if (data.role < min) throw new Error('You are not authorized to access this session')
    return data
}