import express from 'express';
import { formLogin, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Afficher le formulaire
router.get('/login', formLogin);

// Traiter le formulaire
router.post('/login', login);

// Déconnexion
router.get('/logout', logout);

export default router;