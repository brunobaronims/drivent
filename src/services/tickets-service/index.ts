import {
    notFoundError,
    noTicketError,
    noTicketTypeIdError
} from "@/errors";
import { notEnrolledError } from "@/errors/not-enrolled-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<GetTicketTypesResult[]> {
    const ticketTypes = await ticketsRepository.getTicketTypes();
    if (!ticketTypes) throw notFoundError();

    const formattedTicketTypes = ticketTypes.map((ticket) => {
        return exclude(ticket, "createdAt", "updatedAt");
    });

    return formattedTicketTypes;
};

export type GetTicketTypesResult = Omit<TicketType, "createdAt" | "updatedAt">;

async function getUserTicket(userId: number): Promise<GetUserTicketAndCreateTicketResult> {
    const enrollmentId = await getEnrollmentIdByUserId(userId);

    const ticket = await getTicketByEnrollmentId(enrollmentId);

    const ticketType = await getTicketTypeByTypeId(ticket.ticketTypeId);

    const formattedTicket = {
        ...ticket,
        ticketType: ticketType
    };

    return formattedTicket;
};

async function createTicket(ticketTypeId: number, userId: number): Promise<GetUserTicketAndCreateTicketResult> {
    const enrollmentId = await getEnrollmentIdByUserId(userId);

    if (!ticketTypeId) throw noTicketTypeIdError();
    const ticketType = await getTicketTypeByTypeId(ticketTypeId);

    const newTicket = await ticketsRepository.createTicket({ ticketTypeId, enrollmentId, status: TicketStatus.RESERVED });

    const formattedTicket = {
        ...newTicket,
        ticketType: ticketType
    };

    return formattedTicket;
};

export type GetUserTicketAndCreateTicketResult = Partial<Ticket> & { ticketType: TicketType };

async function getEnrollmentIdByUserId(userId: number) {
    const enrollmentId = (await enrollmentRepository.findWithAddressByUserId(userId)).id;
    if (!enrollmentId) throw notEnrolledError();

    return enrollmentId;
}

async function getTicketByEnrollmentId(enrollmentId: number) {
    const ticket = await ticketsRepository.getTicketByEnrollmentId(enrollmentId);
    if (!ticket) throw noTicketError();

    return ticket;
}

async function getTicketTypeByTypeId(ticketTypeId: number) {
    const ticketType = await ticketsRepository.getTicketTypeById(ticketTypeId);
    if (!ticketType) throw notFoundError();

    return ticketType;
}

const ticketsService = {
    getTicketTypes,
    getUserTicket,
    createTicket
};


export default ticketsService;