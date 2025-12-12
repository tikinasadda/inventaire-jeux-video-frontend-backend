import express from 'express';
import { body } from 'express-validator'; 

import { assignerRole } from '../controllers/utilisateurRoleController.js'; 

import { verifierToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post(
  '/', 
  verifierToken,
  
  [
    body('utilisateurId')
      .exists().withMessage("L'ID de l'utilisateur à modifier est requis."),
      
    body('roleId')
      .exists().withMessage("L'ID du rôle à assigner est requis.")
  ],
  
  assignerRole
); 

export default router;