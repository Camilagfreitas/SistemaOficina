import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Customer } from "./Customer";

class Vehicle {
  @prop({ required: true, unique: true })
  plate!: string;

  @prop({ required: true, ref: 'Customer' }) 
  owner!: Ref<Customer>;

  @prop({ required: true })
  mileage!: number;

  @prop({ required: true })
  year!: number;

  @prop({ required: true })
  brand!: string;

  @prop({ required: true })
  model!: string;

  @prop({ required: true })
  chassis!: string;

  @prop({ required: true })
  color!: string;

  @prop({ required: true })
  fuel!: string;

  @prop()
  inspection?: string;

  @prop()
  notes?: string;

  @prop({ default: () => new Date() })
  createdAt?: Date;

  @prop({ default: () => new Date() })
  updatedAt?: Date;

  @prop()
  deletedAt?: Date;
}

const VehicleModel = getModelForClass(Vehicle);
export { Vehicle, VehicleModel };
