import { Router } from 'express';
import { getAccount, updateAccount } from '@controllers/accountController';

const router = Router();

router.get('/:id', getAccount);
router.put('/:id', updateAccount);

export default router;
