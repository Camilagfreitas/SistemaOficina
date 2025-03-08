import express from "express";
import PartService from "../services/PartService";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register/", protect, async (req, res) => {
  try {
    const newPart = await PartService.createPart(req.body);
    res.status(201).json(newPart);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getAll/", protect, async (req, res) => {
  try {
    const parts = await PartService.getAllParts();
    res.status(200).json(parts);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getById/:id", protect, async (req, res) => {
  try {
    const part = await PartService.getPartById(req.params.id);
    res.status(200).json(part);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.put("/update/:id", protect, async (req, res) => {
  try {
    const updatedPart = await PartService.updatePart(req.params.id, req.body);
    res.status(200).json(updatedPart);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.delete("/delete/:id", protect, async (req, res) => {
  try {
    const deletedPart = await PartService.deletePart(req.params.id);
    res.status(200).json(deletedPart);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

export default router;
