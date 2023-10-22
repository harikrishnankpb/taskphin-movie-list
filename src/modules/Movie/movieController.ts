import express, { Request, Response } from 'express';
const router = express.Router();
import { createMovie, deleteMovie, listMovies, updateMovie } from './movieHelper';

router.post('/createMovie', async (req: Request, res: Response) => {
    if (!req.body) throw new Error('Empty body');
    let token = req.headers.token || '';
    const userResponse = await createMovie(req.body, token);
    res.json(userResponse);
});
router.post('/updateMovie', async (req: Request, res: Response) => {
    if (!req.body) throw new Error('Empty body');
    let token = req.headers.token || '';
    const userResponse = await updateMovie(req.body, token);
    res.json(userResponse);
});
router.post('/listMovies', async (req: Request, res: Response) => {
    if (!req.body) throw new Error('Empty body');
    let token = req.headers.token || '';
    const userResponse = await listMovies(req.body, token);
    res.json(userResponse);
});
router.post('/deleteMovie', async (req: Request, res: Response) => {
    if (!req.body) throw new Error('Empty body');
    let token = req.headers.token || '';
    const userResponse = await deleteMovie(req.body, token);
    res.json(userResponse);
});