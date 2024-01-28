// import{ Express , Request , Response} from 'express';
// export default function(app: Express){
//     app.get('/testcheck',(req: Request ,res: Response)=> res.sendStatus(200))
    

// }

// routes/authRoutes.ts

import { Router } from 'express';
import { signup, login } from '../controller/AuthController';
import { Request, Response } from 'express';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

// Test API
router.post('/test', async (req: Request, res: Response) => {
    try {
      // Your code here
      res.send({ message: 'Test API is working!' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;
