const {
    Router
} = require('express')
const router = Router()
const fileMiddleware = require('../middleware/fileMiddleware')
const Category = require('../models/Category')
const toDelete = require('../middleware/toDelete')
const mongoose = require('mongoose')
const adminController = require('../controller/adminController')
// ===========================================================
router.get('/category/edit/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    res.render('editCategory', {
        title: 'Edit Category',
        category,
    })
})

router.post('/categories/edit/:id', fileMiddleware.single('icon'), async (req, res) => {
    const {
        icon
    } = await Category.findById(req.params.id)
    const admin = req.body

    if (req.file) {
        admin.icon = req.file.filename
        toDelete(icon)
    } else {
        admin.icon = icon
    }
    await Category.findByIdAndUpdate(req.params.id, admin, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/categories')
        }
    })
})

router.post('/categories/add', fileMiddleware.single('icon'), adminController.createCategory)

router.get('/category/delete/:id', async (req, res) => {
    const {
        icon
    } = await Category.findById(req.params.id)
    toDelete(icon)
    await Category.findByIdAndDelete(req.params.id)
    res.redirect('/categories')
})
module.exports = router;