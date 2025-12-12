
import express from 'express';
import { body, param } from 'express-validator';
import connexion from './config/connexion.js';
import dotenv from 'dotenv';
dotenv.config();

import Role from './models/Role.js';
import Plateforme from './models/Plateforme.js';
import Utilisateur from './models/Utilisateur.js';
import Jeu from './models/Jeu.js';
import Inventaire from './models/Inventaire.js';
import Utilisateur_Roles from './models/Utilisateur_Roles.js';
import roleRoutes from './routes/roleRoutes.js';
import plateformeRoutes from './routes/plateformeRoutes.js';
import jeuRoutes from './routes/jeuRoutes.js';
import utilisateurRoutes from './routes/utilisateurRoutes.js';
import inventaireRoutes from './routes/inventaireRoutes.js';
import utilisateurRoleRoutes from './routes/utilisateurRoleRoutes.js';

const app = express();
const PORT = 5000;

app.use(express.json());

try {
  await connexion.authenticate();
  console.log('Connexion à la base de données MySQL réussie !');
} catch (error) {
  console.error('Impossible de se connecter à la base de données:', error);
}

console.log("Définition des associations...");

Utilisateur.hasMany(Inventaire, { foreignKey: 'utilisateurId' });
Inventaire.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });

Jeu.hasMany(Inventaire, { foreignKey: 'jeuId' });
Inventaire.belongsTo(Jeu, { foreignKey: 'jeuId' });

Plateforme.hasMany(Inventaire, { foreignKey: 'plateformeId' });
Inventaire.belongsTo(Plateforme, { foreignKey: 'plateformeId' });

Utilisateur.belongsToMany(Role, { 
  through: Utilisateur_Roles,
  foreignKey: 'utilisateurId' 
});
Role.belongsToMany(Utilisateur, { 
  through: Utilisateur_Roles,
  foreignKey: 'roleId' 
});

console.log("Associations définies !");

try {
  await connexion.sync();
  console.log("Base de données synchronisée (tables créées) !");
} catch (error) {
  console.error("Erreur lors de la synchronisation de la BDD:", error);
}

app.get('/', (req, res) => {
  res.send('Serveur d inventaire de jeux vidéo est en ligne !');
});
app.use('/api/roles', roleRoutes);
app.use('/api/plateformes', plateformeRoutes);
app.use('/api/jeux', jeuRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/inventaire', inventaireRoutes);
app.use('/api/assigner-role', utilisateurRoleRoutes);
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});