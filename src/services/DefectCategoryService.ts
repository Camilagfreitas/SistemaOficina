import { DefectCategoryModel, DefectCategory } from "../models/DefectCategory";

class DefectCategoryService {
  static async createDefectCategory(categoryData: Partial<DefectCategory>) {
    const newCategory = await DefectCategoryModel.create(categoryData);
    return newCategory;
  }

  static async getAllDefectCategories() {
    return await DefectCategoryModel.find();
  }

  static async getDefectCategoryById(categoryId: string) {
    const category = await DefectCategoryModel.findById(categoryId);
    if (!category) {
      throw new Error("Categoria de defeito não encontrada");
    }
    return category;
  }

  static async updateDefectCategory(categoryId: string, updateData: Partial<DefectCategory>) {
    const updatedCategory = await DefectCategoryModel.findByIdAndUpdate(categoryId, updateData, { new: true });
    if (!updatedCategory) {
      throw new Error("Categoria de defeito não encontrada");
    }
    return updatedCategory;
  }

  static async deleteDefectCategory(categoryId: string) {
    const deletedCategory = await DefectCategoryModel.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new Error("Categoria de defeito não encontrada");
    }
    return deletedCategory;
  }
}

export default DefectCategoryService;
