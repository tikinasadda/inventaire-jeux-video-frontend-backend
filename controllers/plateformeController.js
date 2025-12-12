import Plateforme from '../models/Plateforme.js';
import { validationResult } from 'express-validator';

// 1. Afficher la liste des plateformes (Read)
export const getAllPlateformes = async (req, res) => {
    try {
        const plateformes = await Plateforme.findAll();
        // Affiche la vue list.ejs qui se trouve dans views/plateformes/
        res.render('plateformes/list', { data: plateformes });
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};

// 2. Afficher le formulaire d'ajout (GET)
export const formAjoutPlateforme = (req, res) => {
    res.render('plateformes/add');
};

// 3. Traiter l'ajout (Create - POST)
export const addPlateforme = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // En cas d'erreur, on réaffiche le formulaire avec le message
        return res.render('plateformes/add', { error: "Le nom de la plateforme est requis." });
    }
    try {
        const { nom } = req.body;
        await Plateforme.create({ nom });
        // Redirection vers la liste après succès
        res.redirect('/plateformes');
    } catch (error) {
        res.render('plateformes/add', { error: "Erreur : " + error.message });
    }
};

// 4. Afficher le formulaire de modification (GET)
export const getPlateformeById = async (req, res) => {
    try {
        const id = req.params.id;
        const plateforme = await Plateforme.findByPk(id);
        
        if (!plateforme) {
            return res.status(404).send("Plateforme introuvable");
        }
        
        res.render('plateformes/edit', { plateforme });
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};

// 5. Traiter la modification (Update - POST)
export const updatePlateforme = async (req, res) => {
    const id = req.params.id;
    const { nom } = req.body;
    try {
        await Plateforme.update({ nom }, { where: { id: id } });
        res.redirect('/plateformes');
    } catch (error) {
        res.status(400).send("Erreur : " + error.message);
    }
};

// 6. Supprimer une plateforme (Delete - GET)
export const deletePlateforme = async (req, res) => {
    const id = req.params.id;
    try {
        await Plateforme.destroy({ where: { id: id } });
        res.redirect('/plateformes');
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};