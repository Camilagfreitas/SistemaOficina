import { prop, modelOptions, getModelForClass, Ref } from "@typegoose/typegoose";
import { Part } from "./Part";

export class InventoryItem {
  @prop({ required: true, ref: 'Part'}) 
  part!: Ref<Part>;

  @prop({ required: true })
  quantity!: number;
}

@modelOptions({ schemaOptions: { collection: "inventory" } })
export class Inventory {
  @prop({ type: () => [InventoryItem], default: [] })
  parts!: InventoryItem[];
}

export const InventoryModel = getModelForClass(Inventory);
