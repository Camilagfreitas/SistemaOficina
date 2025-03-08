import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "part", timestamps: true } })
export class Part {
  @prop({ required: true, unique: true })
  code!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  price!: number;

  @prop({ type: () => [String], default: [] })
  vehiclesModels!: string[];

  @prop()
  deletedAt?: Date;
}

export const PartModel = getModelForClass(Part);
