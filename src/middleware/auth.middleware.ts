import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function protect(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Não autorizado: token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Não autorizado: token inválido ou expirado" });
  }
}

export function authorize(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Proibido: acesso restrito para este perfil." });
    }
    next();
  };
}
