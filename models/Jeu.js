// Dans models/Jeu.js
import { DataTypes } from 'sequelize';
import connexion from '../config/connexion.js';

// Définition du modèle (table) 'Jeu'
const Jeu = connexion.define('Jeu', {
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING
    // On pourrait mettre allowNull: true, car ce n'est pas obligatoire
  },
  annee_sortie: {
    type: DataTypes.INTEGER
    // 'init' dans ton diagramme, on le traduit par INTEGER (un nombre)
  }
}, {
  timestamps: false
});

export default Jeu;