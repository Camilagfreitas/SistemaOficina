import { Inventory, InventoryItem, InventoryModel } from "../models/Inventory";
import { PartModel } from "../models/Part";

class InventoryService {
  static async createInventory(inventoryData: Partial<Inventory>) {
    const newInventory = await InventoryModel.create(inventoryData);
    return newInventory;
  }

  static async getAllInventories() {
    return await InventoryModel.find(); 
  }

  static async getInventoryById(inventoryId: string) {
    const inventory = await InventoryModel.findById(inventoryId).populate('parts.part');
    if (!inventory) {
      throw new Error("Inventário não encontrado");
    }
    return inventory;
  }

  static async addPartToInventory(inventoryId: string, partData: { code: string; description: string; price: number; vehiclesModels: string[]; quantity: number }) {
    const inventory = await InventoryModel.findById(inventoryId);
    if (!inventory) throw new Error("Inventário não encontrado");

   let part = await PartModel.findOne({ code: partData.code });
    if (part) {
      throw new Error(`Já existe uma peça com o código ${partData.code}`);
    }

    if (!part) {
      part = await PartModel.create({
        code: partData.code,
        description: partData.description,
        price: partData.price,
        vehiclesModels: partData.vehiclesModels
      });
    }

    inventory.parts.push({
      part: part._id,
      quantity: partData.quantity
    });

    await inventory.save();
    const updatedInventory = await InventoryModel.findById(inventoryId).populate("parts.part");
    return updatedInventory;
  }

  static async decrementPartQuantity(inventoryId: string, partId: string, quantityToDecrement: number) {
    const inventory = await InventoryModel.findById(inventoryId);
    if (!inventory) {
      throw new Error("Inventário não encontrado");
    }

    const part = inventory.parts.find((item: InventoryItem) => item.part.toString() === partId);
    if (!part) {
      throw new Error("Peça não encontrada no inventário");
    }

    if (part.quantity < quantityToDecrement) {
      throw new Error("Quantidade insuficiente no inventário");
    }

    part.quantity -= quantityToDecrement; // Decrementa a quantidade
    await inventory.save();
    
    return inventory;
}

  static async deletePartFromInventory(inventoryId: string, partId: string) {
    const inventory = await InventoryModel.findById(inventoryId);
    if (!inventory) {
      throw new Error("Inventário não encontrado");
    }

    inventory.parts = inventory.parts.filter((item: InventoryItem) => item.part.toString() !== partId);
    await inventory.save();
    return inventory;
  }

  static async updatePartQuantity(inventoryId: string, partId: string, newQuantity: number) {
    const inventory = await InventoryModel.findById(inventoryId);
    if (!inventory) {
      throw new Error("Inventário não encontrado");
    }
  
    const part = inventory.parts.find((item: InventoryItem) => item.part.toString() === partId);
    if (!part) {
      throw new Error("Peça não encontrada no inventário");
    }
  
    part.quantity = newQuantity;
  
    await inventory.save();
  
    return inventory;
  }
}

export default InventoryService;
