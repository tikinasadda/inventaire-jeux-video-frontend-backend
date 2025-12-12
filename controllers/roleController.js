import Role from '../models/Role.js';
import { validationResult } from 'express-validator';

// 1. Liste des rôles (Read)
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.render('roles/list', { data: roles });
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};

// 2. Formulaire Ajout (Get)
export const formAjoutRole = (req, res) => {
    res.render('roles/add');
};

// 3. Traiter l'ajout (Create - Post)
export const addRole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('roles/add', { error: "Le titre du rôle est requis." });
    }
    try {
        const { titre } = req.body;
        await Role.create({ titre });
        res.redirect('/roles');
    } catch (error) {
        res.render('roles/add', { error: "Erreur : " + error.message });
    }
};

// 4. Formulaire Modification (Get)
export const getRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findByPk(id);
        
        if (!role) {
            return res.status(404).send("Rôle introuvable");
        }
        res.render('roles/edit', { role });
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};

// 5. Traiter la modification (Update - Post)
export const updateRole = async (req, res) => {
    const id = req.params.id;
    const { titre } = req.body;
    try {
        await Role.update({ titre }, { where: { id: id } });
        res.redirect('/roles');
    } catch (error) {
        res.status(400).send("Erreur : " + error.message);
    }
};

// 6. Suppression (Delete - Get)
export const deleteRole = async (req, res) => {
    const id = req.params.id;
    try {
        await Role.destroy({ where: { id: id } });
        res.redirect('/roles');
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};