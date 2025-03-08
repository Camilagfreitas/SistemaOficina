import { Router } from "express";
import ServiceOrderService from "../services/ServiceOrderService";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const newServiceOrder = await ServiceOrderService.createServiceOrder(req.body);
    res.status(201).json(newServiceOrder);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getAll", async (req, res) => {
    try {
        const { mechanic } = req.query; 
        const filter = mechanic ? { mechanic } : {};
        const serviceOrders = await ServiceOrderService.getAllServiceOrders(filter);
        res.status(200).json(serviceOrders);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
});

router.get("/getById/:id", async (req, res) => {
  try {
    const serviceOrder = await ServiceOrderService.getServiceOrderById(req.params.id);
    res.status(200).json(serviceOrder);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedServiceOrder = await ServiceOrderService.updateServiceOrder(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedServiceOrder);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedServiceOrder = await ServiceOrderService.deleteServiceOrder(req.params.id);
    res.status(200).json(deletedServiceOrder);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
