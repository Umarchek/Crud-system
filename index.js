const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

// Require routes
const indexRouter = require('./routes/index')
const categoriesRouter = require('./routes/Categories')
const addcategoriesRouter = require('./routes/addCategories')
const editCategoriesRouter = require('./routes/editCategories')


// MongoDB connection
require('./helper/db')()


app.engine('hbs', exphbs({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'main',
    extname: 'hbs',
    partialsDir: [
        path.join(__dirname, 'views/partials')
    ],
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}))

// post method go
app.use(express.urlencoded({
    extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// read publick static 
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter)
app.use('/', categoriesRouter)
app.use('/', addcategoriesRouter)
app.use('/', editCategoriesRouter)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express working on ${port} port`);
})
module.exports = app;