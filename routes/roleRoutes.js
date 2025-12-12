import express from 'express';
import { body, param } from 'express-validator'; 

import { addRole, getAllRoles, updateRole, deleteRole } from '../controllers/roleController.js';

import { verifierToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/', 
  verifierToken, 
  [
    body('titre')
      .notEmpty().withMessage("Le titre du rôle est requis.")
      .isString().withMessage("Le titre doit être une chaîne de caractères.")
  ],
  addRole
);

router.put(
  '/:id', 
  verifierToken,
  [
    param('id')
      .isInt({ min: 1 }).withMessage("L'ID du rôle doit être un nombre entier valide."),
      
    body('titre')
      .notEmpty().withMessage("Le nouveau titre du rôle est requis.")
      .isString().withMessage("Le titre doit être une chaîne de caractères.")
  ], 
  updateRole
);

router.delete(
  '/:id', 
  verifierToken,
  [
    param('id')
      .isInt({ min: 1 }).withMessage("L'ID du rôle à supprimer doit être un nombre entier valide.")
  ],
  deleteRole
);

router.get('/', getAllRoles);

export default router;