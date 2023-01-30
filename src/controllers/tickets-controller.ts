import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import { unauthorizedError } from "@/errors";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    if (!userId) throw unauthorizedError;

    try {
        const ticketTypes = ticketsService.getTicketTypes();

        return res.status(httpStatus.OK).send(ticketTypes)
    } catch (e) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
};
