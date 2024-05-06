const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find().toArray();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(String(req.params.id));
        const contact = await mongodb.getDatabase().db().collection('contacts').findOne({_id: contactId});
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
        res.status(201).json({ message: 'Contact created successfully', contact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(String(req.params.id));
        const contactUpdates = {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday
            }
        };
        const response = await mongodb.getDatabase().db().collection('contacts').updateOne({_id: contactId}, contactUpdates);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(String(req.params.id));
        const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: contactId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
