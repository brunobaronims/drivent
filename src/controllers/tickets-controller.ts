import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    try {
        const ticketTypes = ticketsService.getTicketTypes();

        return res.status(httpStatus.OK).send(ticketTypes)
    } catch (e) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
};
