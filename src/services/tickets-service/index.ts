import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<GetTicketTypesResult[]>{
    const ticketTypes = await ticketsRepository.getTicketTypes();
    if (!ticketTypes) throw notFoundError;

    const formattedTicketTypes = ticketTypes.map((ticket) => {
        return exclude(ticket, "createdAt", "updatedAt");
    });
    
    return formattedTicketTypes;
};

export type GetTicketTypesResult = Omit<TicketType, "createdAt" | "updatedAt">;

const ticketsService = {
    getTicketTypes
};


export default ticketsService;