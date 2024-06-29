const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {

        // reference from the user table
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        name: {
            type: String,
            require: true,
            default: "Uncategorized",
        },
        type: {
            type: String,
            require: true,
            enum: ['income', 'expense'],
        },
    }, {
    timestamps: true,
}
);

module.exports = mongoose.model('Category', categorySchema);