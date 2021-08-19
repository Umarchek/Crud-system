const {
    Router
} = require('express')
const router = Router()
const Category = require('../models/Category')


router.get('/categories', async (req, res) => {
    const categories = await Category.find()
    res.render('categories', {
        title: 'Admin categories',
        layout: 'main',
        categories
    })
})

module.exports = router;