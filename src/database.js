const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log('DB conectado');
}).catch(err => {
    console.err(err)
})