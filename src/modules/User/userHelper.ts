import validator from 'validator';
import { prisma } from '../../index'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import auth from '../../utils/auth';

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Number;
    lastLogin: string;
}
interface Status {
    msg: string;
    status: boolean;
}
interface signInInput {
    email: string;
    password: string;
}

export const generateAuthToken = (user: User) => {
    try {
        let tokenPayload = {
            id: user.id,
            role: user.role,
            email: user.email,
            // phone: user.phone
        }
        let secret: any = process.env.JWT_SECRET
        let token = jwt.sign(tokenPayload, secret);
        return token
    } catch (err) {
        console.log(err);
    }
};

export const createUser = async (user: User): Promise<Status> => { //Fields are =>name,email,phone,password,role
    try {
        if (!user.email || !user.password || !user.name || !user.password.match(/^\S{6,15}$/) || !validator.isEmail(user.email)) {
            return {
                msg: 'Invalid Input',
                status: false
            }
        };
        const existingUser = await prisma.user.findFirst({
            where: {
                email: {
                    contains: user.email,
                    mode: 'insensitive',
                },
            },
        });
        if (existingUser) return {
            msg: "User already exists",
            status: false
        }
        let password = await bcrypt.hash(user.password, 10); //Encrypt password
        const userData = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: password,
                role: 1,
            }
        });
        if (userData) return {
            status: true,
            msg: 'User registered successfully'
        }
        return {
            status: false,
            msg: "Something went wrong"
        }
    } catch (err) {
        return {
            msg: 'Something went w',
            status: false
        }
    }
};

export const updateUser = async (data: any, token: any): Promise<Status> => { //Fields are =>name,email,phone,password,role
    try {
        let userData = await auth(token, 1);
        if (!userData.id) return {
            status: false,
            msg: 'User not founds'
        }
        if (!data.id || data.name) {
            return {
                msg: 'Invalid Input',
                status: false
            }
        };
        let updatedUser = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name
            }
        })
        if (updatedUser) return {
            status: true,
            msg: 'Movie entry updated'
        }
        return {
            status: false,
            msg: "Movie not found"
        }
    } catch (err) {
        return {
            msg: 'Something went w',
            status: false
        }
    }
};

export const signIn = async (user: signInInput): Promise<any> => {
    try {
        if (!user || !user.email || !user.password || !validator.isEmail(user.email)) {
            return {
                msg: 'Invalid input',
                status: false,
                token: null
            }
        }
        let inputPassword = user.password;
        let existingUser: any;
        existingUser = await prisma.user.findFirst({
            where: {
                email: user.email
            }
        });

        if (existingUser) {
            let password: string = existingUser.password;
            let valid = await bcrypt.compare(inputPassword, password);
            if (valid) {
                await prisma.user.update({
                    where: {
                        id: existingUser.id
                    },
                    data: {
                        lastLogin: new Date()
                    }
                });
                let token = generateAuthToken(existingUser)
                return {
                    status: true,
                    msg: 'Success',
                    token: token
                }
            }
        }
        return {
            status: false,
            msg: 'Invalid email or password',
            token: null
        }
    } catch (err) {
        return {
            status: false,
            msg: 'Exception',
            token: null
        }
    }
};