
import { DataTypes } from 'sequelize';
import connexion from '../config/connexion.js'; 

const Role = connexion.define('Role', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false 
});

export default Role;