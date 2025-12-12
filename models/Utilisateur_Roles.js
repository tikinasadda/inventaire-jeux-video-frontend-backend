

import { DataTypes } from 'sequelize';
import connexion from '../config/connexion.js';

const Utilisateur_Roles = connexion.define('Utilisateur_Roles', {
}, { 

  timestamps: false // 
});

export default Utilisateur_Roles;