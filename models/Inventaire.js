
import { DataTypes } from 'sequelize';
import connexion from '../config/connexion.js';

const Inventaire = connexion.define('Inventaire', {
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false
});

export default Inventaire;