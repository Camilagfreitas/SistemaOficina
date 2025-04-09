import { DefectCategoryModel } from "../models/DefectCategory";
import { InventoryModel } from "../models/Inventory";
import { ServiceOrderModel } from "../models/ServiceOrder";
import { UserModel } from "../models/User";
import { VehicleModel } from "../models/Vehicle";

class ServiceOrderService {
    static async createServiceOrder(serviceOrderData: any) {
        const { vehicle, user, services } = serviceOrderData;
      
        const vehicleExists = await VehicleModel.findById(vehicle).populate('customer');
        if (!vehicleExists) {
          throw new Error("Veículo não encontrado");
        }
      
        const mechanicExists = await UserModel.findById(user);
        if (!mechanicExists) {
          throw new Error("Mecânico não encontrado");
        }
      
        for (const service of services) {
          const categoryExists = await DefectCategoryModel.findById(service.category);
          if (!categoryExists) {
            throw new Error(`Categoria de defeito ${service.category} não encontrada`);
          }
      
          for (const detail of service.details) {
            const inventoryItem = await InventoryModel.findOne({ 'parts.part': detail.part });
            if (!inventoryItem) {
              throw new Error(`Peça ${detail.part} não encontrada no estoque`);
            }
      
            const partInInventory = inventoryItem.parts.find(item => item.part.toString() === detail.part);
            if (!partInInventory) {
              throw new Error(`Peça ${detail.part} não encontrada no estoque`);
            }
      
            if (partInInventory.quantity < detail.quantity) {
              throw new Error(`Quantidade insuficiente de peça ${detail.part}`);
            }
      
            partInInventory.quantity -= detail.quantity;
            await inventoryItem.save();
          }
        }
      
        const newServiceOrder = await ServiceOrderModel.create({
          ...serviceOrderData,
        });
      
        return newServiceOrder;
      }
      

static async getAllServiceOrders(filter: any = {}) {
    return await ServiceOrderModel.find(filter).populate([
      {
        path: "vehicle",
        populate: { path: "customer" },
      },
      { path: "user" },
      { path: "services",
        populate: { path: "category" },
       },
       { path: "services",
        populate: { path: "details.part" },
       },
    ]);
  }
  

  static async getServiceOrderById(serviceOrderId: string) {
    const serviceOrder = await ServiceOrderModel.findById(serviceOrderId).populate([
      {
        path: "vehicle",
        populate: { path: "customer" },
      },
      { path: "user" },
      {
        path: "services",
        populate: { path: "category" },
      },
      {
        path: "services.details",
        populate: { path: "part" },
      },
    ]);
  
    if (!serviceOrder) {
      throw new Error("Ordem de serviço não encontrada");
    }
  
    const serviceOrderObj = serviceOrder.toObject(); 
  
    serviceOrderObj.services = serviceOrderObj.services.map((service: any) => {
      const detailsWithPart = service.details || [];
  
      const reorderedDetails = [
        ...detailsWithPart.filter((d: any) => d.part?.code !== "1"),
        ...detailsWithPart.filter((d: any) => d.part?.code === "1"),
      ];
  
      return {
        ...service,
        details: reorderedDetails,
      };
    });
  
    return serviceOrderObj;
  }

  static async updateServiceOrder(serviceOrderId: string, updateData: any) {
    const updatedServiceOrder = await ServiceOrderModel.findByIdAndUpdate(
      serviceOrderId,
      updateData,
      { new: true }
    ).populate([
      { path: "vehicle" },
      { path: "user" },
      { path: "services.category" },
      { path: "services.details.part" }
    ]);

    if (!updatedServiceOrder) {
      throw new Error("Ordem de serviço não encontrada");
    }

    return updatedServiceOrder;
  }

  static async deleteServiceOrder(serviceOrderId: string) {
    const deletedServiceOrder = await ServiceOrderModel.findByIdAndUpdate(
      serviceOrderId,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!deletedServiceOrder) {
      throw new Error("Ordem de serviço não encontrada");
    }

    return deletedServiceOrder;
  }
}

export default ServiceOrderService;
