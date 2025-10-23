import { Request, Response } from "express";
import Service from "../models/Service.model";
import Professional from "../models/Professional.model";
import Appointment from "../models/Appointment.model";

/**
 * Converte "HH:mm" para minutos absolutos do dia (ex: "09:30" => 570)
 */
function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Converte minutos absolutos do dia para "HH:mm"
 */
function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Checa se o intervalo [slotStart, slotEnd) conflita com algum agendamento existente
 */
function hasConflict(
  slotStart: number,
  slotEnd: number,
  appointments: { startTime: Date; endTime: Date }[],
): boolean {
  return appointments.some((appt) => {
    const apptStart =
      appt.startTime.getHours() * 60 + appt.startTime.getMinutes();
    const apptEnd = appt.endTime.getHours() * 60 + appt.endTime.getMinutes();
    // Conflito se: slotStart < apptEnd && slotEnd > apptStart
    return slotStart < apptEnd && slotEnd > apptStart;
  });
}

/**
 * Checa se o slot está DENTRO do intervalo da pausa (break)
 * Considera ambas as pontas inclusivas
 */
function isInBreak(
  slotStart: number,
  slotEnd: number,
  breakStart?: string,
  breakEnd?: string,
): boolean {
  if (!breakStart || !breakEnd) return false;
  const breakS = timeToMinutes(breakStart);
  const breakE = timeToMinutes(breakEnd);
  return !(slotEnd <= breakS || slotStart >= breakE); // Se sobrepõe à pausa
}

export async function getAvailableSlots(req: Request, res: Response) {
  try {
    const { professionalId } = req.params;
    const { date, serviceId } = req.query;

    if (!date || !serviceId) {
      return res
        .status(400)
        .json({ message: "Parâmetros obrigatórios: date e serviceId" });
    }

    // 1. Buscar Serviço
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    const serviceDuration = service.duration || 30; // duração em minutos

    // 2. Buscar Profissional
    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Profissional não encontrado" });
    }

    // 3. Day of week
    const selectedDate = new Date(date as string);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ message: "Data inválida" });
    }
    const dayOfWeek = selectedDate.getDay();

    // 4. Encontrar o horário de trabalho específico
    const dayAvailability = professional.availability.find(
      (a: any) => a.dayOfWeek === dayOfWeek,
    );
    if (!dayAvailability) {
      return res.json([]); // Profissional não trabalha nesse dia
    }

    // 5. Buscar agendamentos do dia
    const dayStart = new Date(selectedDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(selectedDate);
    dayEnd.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      professional: professionalId,
      startTime: { $gte: dayStart, $lt: dayEnd },
      status: { $ne: "cancelled" },
    }).select("startTime endTime");

    // 6. Gerar slots
    const slots: string[] = [];
    const interval = 30; // minutos entre verificações

    const startMin = timeToMinutes(dayAvailability.startTime);
    const endMin = timeToMinutes(dayAvailability.endTime);

    for (
      let slotStart = startMin;
      slotStart + serviceDuration <= endMin;
      slotStart += interval
    ) {
      const slotEnd = slotStart + serviceDuration;

      // Conferir break/pause
      if (
        isInBreak(
          slotStart,
          slotEnd,
          dayAvailability.breakStart,
          dayAvailability.breakEnd,
        )
      ) {
        continue;
      }

      // Conferir conflito de agendamento
      if (hasConflict(slotStart, slotEnd, appointments)) {
        continue;
      }

      // Montar string "HH:mm"
      slots.push(minutesToTime(slotStart));
    }

    return res.json(slots);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar horários disponíveis.", error });
  }
}
