import {
    invalidDataError,
    noTicketIdError, unauthorizedError
} from "@/errors";
import { invalidTicketIdError } from "@/errors/invalid-ticket-id-error";
import { noCardDataError } from "@/errors/no-card-data-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Payment } from "@prisma/client";

async function getPaymentStatusByTicketId(ticketId: number, userId: number): Promise<Payment> {
    validateTicket(ticketId, userId);

    const paymentInfo = await paymentsRepository.getPaymentInfoFromTicketId(ticketId);

    return paymentInfo;
}

async function createPayment(ticketId: number, cardData: {issuer: string, number: number}, userId: number): Promise<Payment> {
    if (!cardData) throw noCardDataError;

    const ticketTypeId = (await validateTicket(ticketId, userId)).ticketTypeId;

    const value = (await ticketsRepository.getTicketTypeById(ticketTypeId)).price;

    const paymentInfo = {
        ticketId: ticketId,
        value: value,
        cardIssuer: cardData.issuer,
        cardLastDigits: String(cardData.number).slice(-3)
    };

    const newPayment = await paymentsRepository.createPayment(paymentInfo);

    return newPayment;
};

async function validateTicket(ticketId: number, userId: number) {
    if (!ticketId) throw noTicketIdError();

    const ticketExists = await ticketsRepository.getTicketById(ticketId);
    if (!ticketExists) throw invalidTicketIdError();

    const userIdFromTicket = await enrollmentRepository
        .getUserIdFromEnrollmentId(ticketExists.enrollmentId);
    if (userIdFromTicket !== userId) throw unauthorizedError();

    return ticketExists;
}

const paymentsService = {
    getPaymentStatusByTicketId,
    createPayment
};

export default paymentsService;