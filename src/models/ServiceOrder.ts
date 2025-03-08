import { prop, modelOptions, getModelForClass, Ref } from "@typegoose/typegoose";
import { Vehicle } from "./Vehicle";
import { User } from "./User";
import { DefectCategory } from "./DefectCategory";

class ServiceDetails {
  @prop({ required: true })
  quantity!: number;

  @prop({ required: true })
  price!: number;

  @prop({ required: true })
  part!: string;
}

class Service {
  @prop({ required: true, ref: "DefectCategory" }) 
  category!: Ref<DefectCategory>;

  @prop({ required: true })
  totalPrice!: number;

  @prop({ required: true, type: () => [ServiceDetails] })
  details!: ServiceDetails[];
}

@modelOptions({ schemaOptions: { timestamps: true } })
class ServiceOrder {
  @prop({ required: true, ref: "Vehicle" })
  vehicle!: Ref<Vehicle>;

  @prop({ required: true, ref: "User" })
  user!: Ref<User>;

  @prop({ required: true, enum: ["OPENED", "IN_PROGRESS", "BLOCKED", "CLOSED"] })
  status!: string;

  @prop({ required: true, type: () => [Service] })
  services!: Service[];

  @prop()
  deletedAt?: Date;
}

export const ServiceOrderModel = getModelForClass(ServiceOrder);
