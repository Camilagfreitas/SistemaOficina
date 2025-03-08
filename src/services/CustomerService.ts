import { CustomerModel, Customer } from "../models/Customer";

class CustomerService {
  static async createCustomer(customerData: Partial<Customer>) {
    const { email, document } = customerData;

    const existingEmail = await CustomerModel.findOne({ email });
    const existingDocument = await CustomerModel.findOne({ document });

    if (existingEmail) {
      throw new Error("Email já cadastrado");
    }

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
}

export default CustomerService;
