import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Vehicle } from "./Vehicle";

class Customer {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  lastname!: string;

  @prop({required: true})
  phone!: string;

  @prop({ unique: true, required: true })
  email!: string;

  @prop({ required: true })
  document!: string;

  @prop({ ref: () => Vehicle })
  vehicle?: Ref<Vehicle>;

  @prop()
  birthDate?: Date;

  @prop({ default: () => new Date() })
  createdAt?: Date;

  @prop({ default: () => new Date() })
  updatedAt?: Date;

  @prop()
  deletedAt?: Date;
}

const CustomerModel = getModelForClass(Customer);
export { Customer, CustomerModel };
