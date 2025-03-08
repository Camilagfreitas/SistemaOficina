import express from "express";
import DefectCategoryService from "../services/DefectCategoryService";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", protect, async (req, res) => {
  try {
    const newCategory = await DefectCategoryService.createDefectCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getAll", protect, async (req, res) => {
  try {
    const categories = await DefectCategoryService.getAllDefectCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getById/:id", protect, async (req, res) => {
  try {
    const category = await DefectCategoryService.getDefectCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.put("/update/:id", protect, async (req, res) => {
  try {
    const updatedCategory = await DefectCategoryService.updateDefectCategory(req.params.id, req.body);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.delete("/delete/:id", protect, async (req, res) => {
  try {
    const deletedCategory = await DefectCategoryService.deleteDefectCategory(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

export default router;
