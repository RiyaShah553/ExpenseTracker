const asyncHandler = require('express-async-handler');
const Transaction = require('../model/Transaction');


const transactionController = {
    // !add
    create: asyncHandler(async (req, res) => {
        const { type, category, amount, date, description } = req.body;
        if (!amount || !type || !date) {
            throw new Error('Type ,Amount and Date are require ')
        }
        // crete
        const transaction = await Transaction.create({
            user: req.user,
            type,
            category,
            amount,
            description
        });
        res.status(201).json(transaction);

    }),
    // // !lists  = get all
    // lists: asyncHandler(async (req, res) => {
    //     const transaction = await Transaction.find({
    //         user: req.user
    //     });
    //     res.json(transaction);
    // }),

    // !getFilterTransaction    lists+filter
    getFilterTransaction: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category } = req.query;
        let filter = {
            user: req.user,
        };
        // if user provide start date then according to that filter data
        if (startDate) {
            filter.date = { ...filter.date, $gte: new Date(startDate) }
        }
        if (endDate) {
            filter.date = { ...filter.date, $lte: new Date(endDate) }
        }
        if (type) {
            filter.type = type;
        }
        if (category) {
            if (category === 'All') {
                // no filter

            } else if (category === 'Uncategorized') {
                filter.category = 'Uncategorized'
            } else {
                filter.category = category
            }
        }
        const transaction = await Transaction.find(filter).sort({ date: -1 });

        res.json(transaction);

    }),


    // !update
    update: asyncHandler(async (req, res) => {
        // find transaction
        const transaction = await Transaction.findById(req.params.id);
        console.log(transaction);
        console.log(req.user.toString());
        if (transaction && transaction.user.toString() === req.user.toString()) {
            transaction.type = req.body.type || transaction.type;
            transaction.category = req.body.category || transaction.category;
            transaction.amount = req.body.amount || transaction.amount;
            transaction.date = req.body.date || transaction.date;
            transaction.description = req.body.description || transaction.description;
            // update
            const updateTransaction = await transaction.save();
            res.json(updateTransaction);
        };
    }),


    // ! delete
    delete: asyncHandler(async (req, res) => {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction && transaction.user.toString() === req.user.toString()) {
            await Transaction.findByIdAndDelete(req.params.id);
            res.json({ message: 'Transaction Deleted' })
        }

    }),
};

module.exports = transactionController;