import express, { Request, Response } from 'express';
import { createUser, signIn } from './userHelper';
const router = express.Router();

router.post('/createUser', async (req: Request, res: Response) => { //?Fields are =>name,email,password,role
    if (!req.body) throw new Error('Empty body')
    const userResponse = await createUser(req.body);
    res.json(userResponse);
});
router.post('/signIn', async (req: Request, res: Response) => { //? Fields are =>emailOrPhone && password
    try {
        if (!req.body) throw new Error('Empty body');
        const sigInOutput = await signIn(req.body);
        if (sigInOutput.status) {
            let accessToken = sigInOutput.token;
            let exp = 60 * 60 * 12 * 1000
            res.cookie('accessToken', accessToken, {
                sameSite:
                    'none', secure:
                    true, maxAge: exp * 1000,
                // httpOnly: true
            });
            res.json(sigInOutput);
        }
        else res.json(sigInOutput);
    } catch (err) {
        console.log(err);
        res.json({ msg: 'Something went wrong', status: false, token: null });
    }
});

export default router;