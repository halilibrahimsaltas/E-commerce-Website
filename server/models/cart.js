
mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productTitle: {
        type:String,
        required:true
    
    },image:{
        type:String,
        default:""
    },
    price:{ 
        type: Number,
        default: 0,

    },
    quantity: {
        type: Number,
        default: 0
    },
    subTotal:{
        type: Number,
        default: 0

    },
    ProductId:{
        type: String,
        required:true
    },
    userId:{   
        type: String,
        required:true
    }

}, );
cartSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

cartSchema.set( 'toJSON', {
    virtuals:true,
});

module.exports = mongoose.model('Cart', cartSchema);