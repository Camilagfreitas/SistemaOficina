import { Types } from "mongoose";
import { CustomerModel, Customer } from "../models/Customer";
import { VehicleModel } from "../models/Vehicle";
import { ServiceOrderModel } from "../models/ServiceOrder";

class CustomerService {
  static async createCustomer(customerData: Partial<Customer>) {
    const {  document } = customerData;

    const existingDocument = await CustomerModel.findOne({ document });

    if (existingDocument) {
      throw new Error("Documento já cadastrado");
    }

    const newCustomer = await CustomerModel.create(customerData);
    return newCustomer;
  }

  static async getCustomerById(customerId: string) {
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      throw new Error("Cliente não encontrado");
    }
    return customer;
  }

  static async getAllCustomers() {
    return await CustomerModel.find();
  }

  static async updateCustomer(customerId: string, updateData: Partial<Customer>) {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(customerId, updateData, { new: true });
    if (!updatedCustomer) {
      throw new Error("Cliente não encontrado");
    }
    return updatedCustomer;
  }

  static async deleteCustomer(customerId: string) {
    const deletedCustomer = await CustomerModel.findByIdAndUpdate(customerId, { deletedAt: new Date() }, { new: true });
    if (!deletedCustomer) {
      throw new Error("Cliente não encontrado");
    }
    return deletedCustomer;
  }
  static async getCustomerVehicles(customerId: string) {
    try {
      if (!customerId) {
        throw new Error("ID de cliente não fornecido");
      }

      // Verifica se o ID do cliente é válido
      if (!Types.ObjectId.isValid(customerId)) {
        throw new Error("ID de cliente inválido");
      }

      // Buscar todos os veículos associados ao cliente
      const vehicles = await VehicleModel.find({ customer: customerId }).populate("customer");
      return vehicles;
    } catch (err) {
      throw err;
    }
  }

  static async getCustomerFullDetails(customerId: string) {
    try {
      if (!Types.ObjectId.isValid(customerId)) {
        throw new Error("ID de cliente inválido");
      }
      const customer = await CustomerModel.findById(customerId);

      if (!customer) {
        throw new Error("Cliente não encontrado");
      }

      const vehicles = await VehicleModel.find({ customer: customerId });

      const services = await ServiceOrderModel.find({ vehicle: { $in: vehicles.map(vehicle => vehicle._id) } })
      .populate("vehicle");
      
      return { customer, vehicles, services };
    } catch (err) {
      throw err;
    }
  }
}

export default CustomerService;
