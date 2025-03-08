import express, { Request, Response } from "express";
import VehicleService from "../services/VehicleService";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", protect, async (req: Request, res: Response) => {
  try {
    const vehicle = await VehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getAll", protect, async (_req: Request, res: Response) => {
  try {
    const vehicles = await VehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getById/:id", protect, async (req: Request, res: Response) => {
  try {
    const vehicle = await VehicleService.getVehicleById(req.params.id);
    res.json(vehicle);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.put("/update/:id", protect, async (req: Request, res: Response) => {
  try {
    const updatedVehicle = await VehicleService.updateVehicle(req.params.id, req.body);
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete("/remove/:id", protect, async (req: Request, res: Response) => {
  try {
    await VehicleService.deleteVehicle(req.params.id);
    res.status(200).json({ message: "Veículo removido com sucesso" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
