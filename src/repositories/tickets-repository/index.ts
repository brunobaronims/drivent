import { Ticket } from "@prisma/client";

import { prisma } from "@/config";

function getTicketTypes() {
    const tickets = prisma.ticketType.findMany();

    return tickets;
};

function getTicketTypeById(typeId: number) {
    const ticketType = prisma.ticketType.findFirst({
        where: {
            id: Number(typeId)
        }   
    });

    return ticketType;
}

function getTicketByEnrollmentId(enrollmentId: number) {
    const ticket = prisma.ticket.findFirst({
        where: {
            enrollmentId: enrollmentId
        }
    });
    
    return ticket;
}

function createTicket(params: CreateTicketParams) {
    const {
        ticketTypeId,
        enrollmentId,
        status
    } = params;
    const newTicket = prisma.ticket.create({
        data: {
            ticketTypeId: Number(ticketTypeId),
            enrollmentId: enrollmentId,
            status: status,
        }
    });


    return newTicket;
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

function getTicketById(id: number) {
    return prisma.ticket.findFirst({
        where: {
            id
        }
    })
};

const ticketsRepository = {
    getTicketTypes,
    getTicketByEnrollmentId,
    getTicketTypeById,
    createTicket,
    getTicketById
};

export default ticketsRepository;