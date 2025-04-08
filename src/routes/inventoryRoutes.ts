import express from "express";
import InventoryService from "../services/InventoryService";

const router = express.Router();

router.post("/register/", async (req, res) => {
  try {
    const newInventory = await InventoryService.createInventory(req.body);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getAll/", async (_req, res) => {
  try {
    const inventories = await InventoryService.getAllInventories();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/getById/:id", async (req, res) => {
  try {
    const inventory = await InventoryService.getInventoryById(req.params.id);
    res.status(200).json(inventory);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.post("/:inventoryId/addPart", async (req, res) => {
    try {
      const { code, description, price, vehiclesModels, quantity } = req.body;
  
      const inventory = await InventoryService.addPartToInventory(req.params.inventoryId, {
        code,
        description,
        price,
        vehiclesModels,
        quantity
      });
  
      res.status(200).json(inventory);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });  

router.put("/:inventoryId/updatePartQuantity/:partId", async (req, res) => {
  try {
    const updatedInventory = await InventoryService.updatePartQuantity(req.params.inventoryId, req.params.partId, req.body.quantity);
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete("/:inventoryId/deletePart/:partId", async (req, res) => {
  try {
    const updatedInventory = await InventoryService.deletePartFromInventory(req.params.inventoryId, req.params.partId);
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.put("/:inventoryId/updatePartsBatch", async (req, res) => {
  try {
    const { services } = req.body; 

    for (const service of services) {
      for (const part of service.parts) {
        await InventoryService.decrementPartQuantity(service.inventoryId, part.code, part.quantity);
      }
    }

    res.status(200).json({ message: "Inventário atualizado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});


export default router;
