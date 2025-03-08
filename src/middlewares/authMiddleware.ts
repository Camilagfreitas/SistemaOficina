import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Acesso negado. Token não fornecido" });
    return; 
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded.userId; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
    return; 
  }
};

export { protect };
