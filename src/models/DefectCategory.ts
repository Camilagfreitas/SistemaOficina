import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "defectsCategories" } })
export class DefectCategory {
  @prop({ required: true, unique: true })
  name!: string;

  @prop()
  description?: string;
}

export const DefectCategoryModel = getModelForClass(DefectCategory);
