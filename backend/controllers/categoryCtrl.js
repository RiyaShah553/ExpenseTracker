const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');
const Transaction = require('../model/Transaction');



const categoryController = {
    // !add
    create: asyncHandler(async (req, res) => {
        const { name, type } = req.body;
        if (!name || !type) {
            throw new Error('Name & Type are require')
        }

        // convert the name 
        const normalizeName = name.toLowerCase();

        // check if type is valid
        const validTypes = ['income', 'expense'];
        if (!validTypes.includes(type.toLowerCase())) {
            throw new Error('Invalid Category Type' + type)
        }

        // Check if category already exist on the user account
        const categoryExist = await Category.findOne({
            name: normalizeName,
            user: req.user,
        });
        if (categoryExist) {
            throw new Error(`Category ${categoryExist.name} already exist`);
        }

        // create category
        const category = await Category.create({
            name: normalizeName,
            user: req.user,
            type: type.toLowerCase(),
        });
        res.status(201).json(category);

    }),
    // !lists  = get all
    lists: asyncHandler(async (req, res) => {
        const categoryList = await Category.find({ user: req.user });
        res.status(200).json(categoryList);
    }),

    // !update
    update: asyncHandler(async (req, res) => {
        const categoryId = req.params.id;
        const { type, name } = req.body;
        const normalizeName = name.toLowerCase();
        const category = await Category.findById(categoryId);
        if (!category && category.user.toString() !== req.user.toString()) {
            throw new Error('Category not found or user not authorized');
        }
        const oldName = category.name;
        //update category properties
        category.name = name;
        category.type = type;
        const updatedCategory = await category.save();

        // update affected transactions  in--------> Transaction model

        if (oldName !== updatedCategory.name) {
            await Transaction.updateMany({
                user: req.user,
                category: oldName,
            }, {
                $set: { category: updatedCategory.name }
            });
        } res.json(updatedCategory);
    }),


    // ! delete
    delete: asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (category && category.user.toString() === req.user.toString()) {
            //!  Update transactions that have this category
            const defaultCategory = "Uncategorized";
            await Transaction.updateMany(
                { user: req.user, category: category.name },
                { $set: { category: defaultCategory } }
            );
            //! Remove category
            await Category.findByIdAndDelete(req.params.id);
            res.json({ message: "Category removed and transactions updated" });
        } else {
            res.json({ message: "Category not found or user not authorized" });
        }
    }),
};

module.exports = categoryController;