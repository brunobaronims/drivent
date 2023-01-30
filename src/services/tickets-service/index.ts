import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<GetTicketTypesResult[]>{
    const ticketTypes = await ticketsRepository.getTicketTypes();
    if (!ticketTypes) throw notFoundError;

    const formattedTicketTypes = ticketTypes.map((ticket) => {
        return exclude(ticket, "createdAt", "updatedAt");
    });
    console.log(formattedTicketTypes);
    
    return formattedTicketTypes;
};

export type GetTicketTypesResult = Omit<TicketType, "createdAt" | "updatedAt">;

async function getUserTicket(userId: number): Promise<GetUserTicketResult> {
    const enrollmentId = (await enrollmentRepository.findWithAddressByUserId(userId)).id;

    const ticket = await ticketsRepository.getUserTicket(enrollmentId);
    if (!ticket) throw notFoundError;

    const ticketType = await ticketsRepository.getUserTicketType(ticket.ticketTypeId);
    if (!ticketType) throw notFoundError;

    const formattedTicket = {
        ...ticket,
        ticketType: ticketType
    };

    return formattedTicket;
};

export type GetUserTicketResult = Partial<Ticket> & {ticketType: TicketType};

const ticketsService = {
    getTicketTypes,
    getUserTicket
};


export default ticketsService;