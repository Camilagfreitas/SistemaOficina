import { Types } from "mongoose";
import { CustomerModel } from "../models/Customer";
import { Vehicle, VehicleModel } from "../models/Vehicle";

class VehicleService {
  static async createVehicle(vehicleData: Partial<Vehicle>) {
    const { customer, plate, chassis } = vehicleData;

    try {
        const existingCustomer = await CustomerModel.findById(customer);
        const existingPlate = await VehicleModel.findOne({ plate });
        const existingChassis = await VehicleModel.findOne({ chassis });

      if (existingPlate) {
        throw new Error("Placa já cadastrada");
      }
      if (existingChassis) {
        throw new Error("Chassi já cadastrado");
      }
      if (!existingCustomer) {
        throw new Error("Cliente não encontrado");
      }

      const newVehicle = await VehicleModel.create({
        ...vehicleData,
        customer: existingCustomer._id 
      });
      return newVehicle;
    } catch (err) {
      if (err instanceof Error && err.message.includes("Cast to ObjectId failed")) {
        throw new Error("ID de cliente inválido");
      }
      throw err; 
    }
  }

  static async getAllVehicles() {
    return await VehicleModel.find().populate('customer');
  }

  static async getVehicleById(vehicleId: string) {
    const vehicle = await VehicleModel.findById(vehicleId);
    if (!vehicle) {
      throw new Error("Veículo não encontrado");
    }
    return vehicle;
  }

  static async updateVehicle(vehicleId: string, updateData: Partial<Vehicle>) {
    const { customer } = updateData;

    if (customer && !Types.ObjectId.isValid(customer._id)) {
      throw new Error("ID de cliente inválido");
    }

    if (customer) {
      const customerExists = await CustomerModel.findById(customer);
      if (!customerExists) {
        throw new Error("Cliente não encontrado");
      }

      updateData.customer = customerExists._id;
    }

    const updatedVehicle = await VehicleModel.findByIdAndUpdate(vehicleId, updateData, { new: true });
    if (!updatedVehicle) {
      throw new Error("Veículo não encontrado");
    }
    return updatedVehicle;
  }

  static async deleteVehicle(vehicleId: string) {
    const deletedVehicle = await VehicleModel.findByIdAndUpdate(
      vehicleId,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedVehicle) {
      throw new Error("Veículo não encontrado");
    }
    return deletedVehicle;
  }
}

export default VehicleService;
