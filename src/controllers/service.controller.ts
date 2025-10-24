import { Request, Response } from "express";
import Service, { IService } from "../models/Service.model";

// Criar serviço
export async function createService(req: Request, res: Response) {
  try {
    const { name, description, price, duration } = req.body;
    const service = await Service.create({
      name,
      description,
      price,
      duration,
    });
    return res.status(201).json(service);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar serviço", error });
  }
}

// Listar todos os serviços
export async function getAllServices(req: Request, res: Response) {
  try {
    const services = await Service.find();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar serviços", error });
  }
}

// Buscar serviço por ID
export async function getServiceById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar serviço", error });
  }
}

// Atualizar serviço
export async function updateService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, description, price, duration } = req.body;

    const updated = await Service.findByIdAndUpdate(
      id,
      { name, description, price, duration },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar serviço", error });
  }
}

// Deletar serviço
export async function deleteService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    return res.status(200).json({ message: "Serviço removido com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao remover serviço", error });
  }
}
