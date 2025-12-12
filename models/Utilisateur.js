// Dans models/Utilisateur.js
import { DataTypes } from 'sequelize';
import connexion from '../config/connexion.js';

// Définition du modèle (table) 'Utilisateur'
const Utilisateur = connexion.define('Utilisateur', {
  nom_utilisateur: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Le nom d'utilisateur doit être unique
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // L'email doit être unique
    validate: {
      isEmail: true // Valide que c'est un format email
    }
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Utilisateur;