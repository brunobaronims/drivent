import {
    noTicketIdError, unauthorizedError
} from "@/errors";
import { invalidTicketIdError } from "@/errors/invalid-ticket-id-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Payment } from "@prisma/client";

async function getPaymentStatusByTicketId(ticketId: number, userId: number): Promise<Payment> {
    if (!ticketId) throw noTicketIdError();

    const ticketExists = await ticketsRepository.getTicketById(ticketId);
    if (!ticketExists) throw invalidTicketIdError();

    const userIdFromTicket = await enrollmentRepository
        .getUserIdFromEnrollmentId(ticketExists.enrollmentId);
    if (userIdFromTicket !== userId) throw unauthorizedError();

    const paymentInfo = await paymentsRepository.getPaymentInfoFromTicketId(ticketId);

    return paymentInfo;
}

const paymentsService = {
    getPaymentStatusByTicketId
};

export default paymentsService;