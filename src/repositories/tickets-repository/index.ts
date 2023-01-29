import { prisma } from "@/config";

async function getTicketTypes() {
    const tickets = prisma.ticketType.findMany();
    console.log(tickets);

    return tickets;
};

const ticketsRepository = {
    getTicketTypes
};

export default ticketsRepository;