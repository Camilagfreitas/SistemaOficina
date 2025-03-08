import { PartModel, Part } from "../models/Part";

class PartService {
  static async createPart(partData: Partial<Part>) {
    const newPart = await PartModel.create(partData);
    return newPart;
  }

  static async getAllParts() {
    return await PartModel.find();
  }

  static async getPartById(partId: string) {
    const part = await PartModel.findById(partId);
    if (!part) {
      throw new Error("Peça não encontrada");
    }
    return part;
  }

  static async updatePart(partId: string, updateData: Partial<Part>) {
    const updatedPart = await PartModel.findByIdAndUpdate(partId, updateData, { new: true });
    if (!updatedPart) {
      throw new Error("Peça não encontrada");
    }
    return updatedPart;
  }

  static async deletePart(partId: string) {
    const deletedPart = await PartModel.findByIdAndUpdate(partId, { deletedAt: new Date() }, { new: true });
    if (!deletedPart) {
      throw new Error("Peça não encontrada");
    }
    return deletedPart;
  }
}

export default PartService;
