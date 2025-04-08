import express, { Request, Response } from "express";
import CustomerService from "../services/CustomerService";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", protect, async (req: Request, res: Response) => {
    try {
      const customer = await CustomerService.createCustomer(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });
router.get("/getAll", protect, async (_req: Request, res: Response) => {
  try {
    const customers = await CustomerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/getById/:id', protect, async (req, res) => {
    try {
      const customer = await CustomerService.getCustomerById(req.params.id);
      res.json(customer);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  });

router.put("/update/:id", protect, async (req, res) => {
  try {
    const customer = await CustomerService.updateCustomer(req.params.id, req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete("/delete/:id", protect, async (req, res) => {
  try {
    await CustomerService.deleteCustomer(req.params.id);
    res.status(200).json({ message: "Cliente removido com sucesso" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get("/details/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customerDetails = await CustomerService.getCustomerFullDetails(customerId);
    res.json(customerDetails); 
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});


export default router;
