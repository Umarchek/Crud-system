const Category = require('../models/Category')
const toDelete = require('../middleware/toDelete')
const mongoose = require('mongoose')


// ===================== categories router 
// GET all categories
module.exports.getCategories = async (req, res) => {
    const categories = await Category.find()
    res.render('/categories', {
        title: 'Admin categories',
        layout: 'main',
        categories
    })
}

// Create category
module.exports.createCategory = async (req, res) => {
    const {
        name
    } = await req.body

    req.file ? icon = req.file.filename : icon = ''
    const category = new Category({
        name,
        icon
    })
    await category.save()
    res.redirect('/categories')
}