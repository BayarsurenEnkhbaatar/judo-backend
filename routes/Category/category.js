
import express from "express"
import {
    getCategory,
    getCategoryId,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../controllers/Category/categoryController.js"


const router = express.Router();

router.get('/categorys', getCategory);
router.get('/categorys/:id', getCategoryId);
router.post('/categorys', createCategory);
router.patch('/categorys/:id', updateCategory);
router.delete('/categorys/:id', deleteCategory);

export default router