import paymentsService from "@/services/payments-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentInfo(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketId } = req.query;
    console.log(ticketId);

    try {
        const paymentInfo = await paymentsService
            .getPaymentStatusByTicketId(Number(ticketId), userId);

        return res.status(httpStatus.OK).send(paymentInfo);
    } catch (e) {
        if (e.name === 'InvalidTicketIdError')
            return res.status(httpStatus.NOT_FOUND).send(e.message);

        if (e.name === 'NoTicketIdError')
            return res.status(httpStatus.BAD_REQUEST).send(e.message);

        if (e.name === 'UnauthorizedError')
            return res.status(httpStatus.UNAUTHORIZED)
                .send('Id do ticket não está associado ao usuário');
    }
};