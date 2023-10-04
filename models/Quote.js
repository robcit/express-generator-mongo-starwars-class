const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const QuoteSchema = new Schema({
    character: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('quotes', QuoteSchema);