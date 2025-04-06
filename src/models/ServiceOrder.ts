import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { DefectCategory } from "./DefectCategory";
import { Part } from "./Part";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

class ServiceDetails {
  @prop({ required: true })
  quantity!: number;

  @prop({ required: true })
  price!: number;

  @prop({ required: true, ref: "Part" })
  part!: Ref<Part>;
}

class Service {
  @prop({ required: true, ref: "DefectCategory" }) 
  category!: Ref<DefectCategory>;

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
  
  @prop({ required: true })
  totalPrice!: number;

  @prop()
  deletedAt?: Date;
}

export const ServiceOrderModel = getModelForClass(ServiceOrder);
