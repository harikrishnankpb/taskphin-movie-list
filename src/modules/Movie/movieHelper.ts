import { prisma } from '../../index'
import { MovieType, Status, StatusData } from '../../utils/commonInterfaces';
import auth from '../../utils/auth'
import dayjs from 'dayjs';

export const createMovie = async (movie: MovieType, token: any): Promise<Status> => {
    try {
        let userData = await auth(token, 1);
        if (!userData.id) return {
            status: false,
            msg: 'User not founds'
        }
        if (!movie || !movie.name) {
            return {
                msg: 'Invalid Input',
                status: false
            }
        };
        let userId = userData.id;
        if (movie.rating) movie.rating = parseInt(movie.rating)
        if (movie.cast) movie.cast = JSON.parse(movie.cast)
        if (movie.releaseDate) movie.releaseDate = dayjs(movie.releaseDate).toISOString()
        let movieData = await prisma.movie.create({
            data: {
                name: movie.name,
                userId,
                rating: movie.rating,
                cast: movie.cast,
                genre: movie.genre,
                releaseDate: movie.releaseDate,
            }
        });
        if (movieData) return {
            status: true,
            msg: 'Movie entry created'
        }
        return {
            status: false,
            msg: "Something went wrong"
        }
    } catch (err: any) {
        return {
            msg: err.message,
            status: false
        }
    }
};

export const updateMovie = async (movie: MovieType, token: any): Promise<Status> => {
    try {
        let userData = await auth(token, 1);
        if (!userData.id) return {
            status: false,
            msg: 'User not founds'
        }
        if (!movie || !movie.id) {
            return {
                msg: 'Invalid Input',
                status: false
            }
        };
        if (movie.rating) movie.rating = parseInt(movie.rating)
        if (movie.cast) movie.cast = JSON.parse(movie.cast)
        if (movie.releaseDate) movie.releaseDate = dayjs(movie.releaseDate).toISOString()
        let data = {
            name: movie.name ? movie.name : undefined,
            rating: movie.rating ? movie.rating : undefined,
            genre: movie.genre ? movie.genre : undefined,
            cast: movie.cast ? movie.cast : undefined,
            releaseDate: movie.releaseDate ? movie.releaseDate : undefined
        };
        let movieData = await prisma.movie.update({
            where: {
                id: movie.id
            },
            data
        })
        if (movieData) return {
            status: true,
            msg: 'Movie entry updated'
        }
        return {
            status: false,
            msg: "Movie not found"
        }
    } catch (err: any) {
        console.log(err.message)
        return {
            msg: err.message,
            status: false
        }
    }
};


export const listMovies = async (input: any, token: any): Promise<StatusData> => {
    try {
        let userData = await auth(token, 1);
        if (!userData.id) return {
            status: false,
            msg: 'User not founds'
        }

        let userId = userData.id;
        let searchText = input.searchText || ''

        const orderBy = input.orderBy || 'createdAt';
        const validOrderByFields = ['rating', 'releaseDate', 'createdAt'];
        if (!validOrderByFields.includes(orderBy)) {
            throw new Error('Invalid orderBy field');
        }

        const movieData = await prisma.movie.findMany({
            where: {
                userId: userId,
                name: {
                    contains: searchText,
                    mode: 'insensitive',
                }
            },
            orderBy: {
                [orderBy]: 'desc',
            },
        });
        return {
            status: true,
            data: movieData,
            msg: 'Success'
        }
    } catch (err: any) {
        return {
            msg: err.message,
            status: false
        }
    }
};


export const deleteMovie = async (input: any, token: any): Promise<Status> => {
    try {
        let userData = await auth(token, 1);
        if (!userData.id) return {
            status: false,
            msg: 'User not founds'
        }

        let userId = userData.id;
        let movieId = input.id;

        const movieData = await prisma.movie.delete({
            where: {
                id: movieId,
                userId: userId,
            }
        });
        if (movieData) return {
            status: true,
            msg: 'Movie Deleted'
        }
        return {
            status: false,
            msg: 'Movie not found'
        }
    } catch (err: any) {
        return {
            msg: err.message,
            status: false
        }
    }
};