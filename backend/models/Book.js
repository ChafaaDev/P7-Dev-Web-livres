const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title:{type:String, required:true},
    author:{type:String, required:true},
    year:{type:Number, required:true},
    genre:{type:String, required:true},
    rating:{type:Number, required:true},
    cover:{type:Buffer}
})

module.exports = mongoose.model('Book', bookSchema);