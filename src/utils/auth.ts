import jwt from "jsonwebtoken"

interface UserData {
    id: string | null;
    role: number;
    email: string;
}

export default async function auth(token: string, minRole: number): Promise<UserData> {
    const newToken = token.startsWith('accessToken=') ? token.substring('accessToken='.length) : token;
    if (minRole == 0) return {
        id: null,
        role: 0,
        email: ''
    }
    let secret = process.env.JWT_SECRET || '';
    let data: any;
    try {
        data = jwt.verify(newToken, secret);
    } catch (error) {
        throw new Error('Invalid Token')
    }
    if (data.role < minRole) throw new Error("You are not authorized to access this session");
    return data;
}