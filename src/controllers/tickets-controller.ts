import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    try {
        const ticketTypes = await ticketsService.getTicketTypes();

        return res.status(httpStatus.OK).send(ticketTypes)
    } catch (e) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
};

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const ticket = await ticketsService.getUserTicket(userId);
        
        return res.status(httpStatus.OK).send(ticket);
    } catch (e) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body;
    
    try {
        const ticket = await ticketsService.createTicket(ticketTypeId, userId);

        return res.status(httpStatus.OK).send(ticket);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}