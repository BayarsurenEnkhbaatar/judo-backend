
import express from "express"
import {
    getCategory,
    getCategoryId,
    createCategory,
    updateCategory,
    deleteCategory,
    getComptationCategoty,
} from "../../controllers/Category/categoryController.js"


const router = express.Router();

router.get('/category', getCategory);
router.get('/category/:id', getCategoryId);
router.post('/category', createCategory);
router.patch('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

router.get('/comp_to_category/:id', getComptationCategoty);

export default router