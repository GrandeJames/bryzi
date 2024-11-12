import express from 'express';

import taskRoutes from './taskRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

export default router;
