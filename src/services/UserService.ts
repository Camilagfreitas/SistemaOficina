import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/User';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as string;

class UserService {
  static async createUser(userData: Partial<User>) {
    const { email, password, login, role } = userData;

    const existingUser = await UserModel.findOne({ email }) || UserModel.findOne({ login }) ;
    if (existingUser) {
      throw new Error('Email ou login já cadastrado');
    }
    const hashedPassword = await bcrypt.hash(password!, SALT_ROUNDS);

    const newUser = await UserModel.create({
      ...userData,
      password: hashedPassword,
      role: role || 'mechanic',
    });

    return newUser;
  }

  static async login(login: string, password: string) {
    const user = await UserModel.findOne({ login });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return { token, user };
  }

  static async getUserById(userId: string) {
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  static async getAllUsers() {
    return await UserModel.find().select('-password');
  }

  static async updateUser(userId: string, updateData: Partial<User>) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      throw new Error('Usuário não encontrado');
    }

    return updatedUser;
  }

  static async deleteUser(userId: string) {
    const deletedUser = await UserModel.findByIdAndUpdate(userId, { deletedAt: new Date() }, { new: true });
    if (!deletedUser) {
      throw new Error('Usuário não encontrado');
    }
    return deletedUser;
  }
}

export default UserService;
