import { prisma } from "@/config";

function getPaymentInfoFromTicketId(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId: ticketId
        }
    });
}

const paymentsRepository = {
    getPaymentInfoFromTicketId
};

export default paymentsRepository;