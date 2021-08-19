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

router.get('/categories/add', (req, res) => {
    res.render('addCategories', {
        title: 'Add categories'
    })
})

router.post('/categories/add', fileMiddleware.single('icon'), adminController.createCategory)

module.exports = router;