import { getModelForClass, prop } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  lastname!: string;

  @prop()
  birthDate!: string;

  @prop({ required: true })
  email!: string;

  @prop({ required: true })
  document!: number;

  @prop({ required: true })
  phone!: number;

  @prop({ required: true })
  role!: string;

  @prop({ required: true })
  login!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: true, default: Date.now })
  createdAt!: Date;

  @prop({ required: true, default: Date.now })
  updatedAt!: Date;

  @prop()
  deletedAt?: Date;

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

const UserModel = getModelForClass(User);

export { User, UserModel };
