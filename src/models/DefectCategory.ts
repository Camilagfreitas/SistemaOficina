import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "defectsCategories" } })
export class DefectCategory {
  @prop({ required: true })
  name!: string;

  @prop()
  description?: string;
}

export const DefectCategoryModel = getModelForClass(DefectCategory);
