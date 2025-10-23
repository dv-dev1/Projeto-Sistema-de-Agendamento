import { Request, Response } from "express";
import Professional, { IProfessional } from "../models/Professional.model";

// Criar profissional (Apenas admin)
export async function createProfessional(req: Request, res: Response) {
  try {
    const { user, services, availability } = req.body;

    // Verifica se o usuário já é um profissional
    const existing = await Professional.findOne({ user });
    if (existing) {
      return res.status(400).json({ message: "Usuário já está cadastrado como profissional." });
    }

    const professional = await Professional.create({
      user,
      services,
      availability,
    });

    return res.status(201).json(professional);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar profissional", error });
  }
}

// Listar todos profissionais (com populates)
export async function getAllProfessionals(req: Request, res: Response) {
  try {
    const professionals = await Professional.find()
      .populate("user", "name email")
      .populate("services");
    return res.status(200).json(professionals);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar profissionais", error });
  }
}

// Buscar profissional por ID (com populates)
export async function getProfessionalById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const professional = await Professional.findById(id)
      .populate("user", "name email")
      .populate("services");

    if (!professional) {
      return res.status(404).json({ message: "Profissional não encontrado" });
    }

    return res.status(200).json(professional);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar profissional", error });
  }
}
