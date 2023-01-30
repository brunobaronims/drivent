import { prisma } from "@/config";


function getPaymentInfoFromTicketId(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId: ticketId
        }
    });
}

function createPayment(params: CreatePaymentParams) {
    const newPayment = prisma.payment.create({
        data: params
    })

    return newPayment;
};

export type CreatePaymentParams = {
    cardIssuer: string,
    ticketId: number,
    cardLastDigits: string,
    value: number
};

const paymentsRepository = {
    getPaymentInfoFromTicketId,
    createPayment
};

export default paymentsRepository;