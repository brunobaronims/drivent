import { prisma } from "@/config";

async function getTicketTypes() {
    const tickets = prisma.ticketType.findMany();

    return tickets;
};

async function getUserTicketType(typeId: number) {
    const ticketType = prisma.ticketType.findFirst({
        where: {
            id: typeId
        }   
    });

    return ticketType;
}

async function getUserTicket(enrollmentId: number) {
    const ticket = prisma.ticket.findFirst({
        where: {
            enrollmentId: enrollmentId
        }
    });
    
    return ticket;
}

const ticketsRepository = {
    getTicketTypes,
    getUserTicket,
    getUserTicketType
};

export default ticketsRepository;