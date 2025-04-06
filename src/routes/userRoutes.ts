import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import UserService from '../services/UserService';

const router = express.Router();

// Criar usuário
router.post('/register', async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserService.login(email, password);
    const name = user.name;
    res.json({ token, name });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

// Buscar usuário por ID
router.get('/getById/:id',protect, async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

// Listar todos os usuários
router.get('/getAll', protect, async (_req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put('/update/:id', protect, async (req, res) => {
  try {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/delete/:id', protect, async (req, res) => {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
