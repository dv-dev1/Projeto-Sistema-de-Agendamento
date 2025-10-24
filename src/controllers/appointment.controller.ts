import { Request, Response } from "express";
import Appointment, { IAppointment } from "../models/Appointment.model";
import Service from "../models/Service.model";

// Criar um novo agendamento
export async function createAppointment(req: Request, res: Response) {
  try {
    const { professional, service, startTime } = req.body;
    const client = req.user?.id;

    if (!client) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    // Buscar a duração do serviço
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }

    const duration = serviceDoc.duration;
    // Calcular endTime a partir do startTime + duration
    const startDate = new Date(startTime);
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ message: "Horário de início inválido." });
    }
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + duration);

    // Verificar conflito de horários para o profissional
    const conflicting = await Appointment.findOne({
      professional,
      // Um conflito ocorre se startTime < existing.endTime && endTime > existing.startTime
      $or: [
        {
          startTime: { $lt: endDate },
          endTime: { $gt: startDate },
        },
      ],
      status: { $ne: "cancelled" },
    });

    if (conflicting) {
      return res.status(409).json({
        message:
          "Este horário não está mais disponível para o profissional selecionado.",
      });
    }

    // Criar o agendamento
    const appointment = await Appointment.create({
      client,
      professional,
      service,
      startTime: startDate,
      endTime: endDate,
      status: "confirmed",
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar agendamento.", error });
  }
}

// Buscar todos os agendamentos do cliente autenticado
export async function getMyAppointments(req: Request, res: Response) {
  try {
    const client = req.user?.id;
    if (!client) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const appointments = await Appointment.find({ client })
      .populate({
        path: "professional",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate({
        path: "service",
        select: "name price duration",
      })
      .sort({ startTime: -1 });

    return res.status(200).json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar agendamentos.", error });
  }
}

// Atualizar agendamento (remarcar)
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startTime } = req.body;

    if (!startTime)
      return res.status(400).json({ message: "Data/hora obrigatória." });

    // Encontra o agendamento
    const appointment = await Appointment.findById(id);
    if (!appointment)
      return res.status(404).json({ message: "Agendamento não encontrado." });

    // Buscar a duração do serviço para recalcular endTime
    const service = await Service.findById(appointment.service);
    if (!service)
      return res
        .status(404)
        .json({ message: "Serviço do agendamento não encontrado." });

    appointment.startTime = new Date(startTime);
    // Recalcula endTime
    appointment.endTime = new Date(appointment.startTime);
    appointment.endTime.setMinutes(
      appointment.endTime.getMinutes() + service.duration,
    );

    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: "Erro ao remarcar." });
  }
};

// Cancelar agendamento
export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true },
    );
    if (!appointment) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Erro ao cancelar agendamento." });
  }
};
