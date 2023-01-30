import joi from "joi";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { notFoundError } from "@/errors";

dayjs.extend(customParseFormat);
const date = (value: string) => {
  if (!dayjs(value, 'MM/DD', true).isValid())
    throw notFoundError();
  return value;
}

export const paymentSchema = joi.object({
    ticketId: joi.number().required(),
    cardData: joi.object({
        issuer: joi.string().required(),
        number: joi.string().creditCard().required(),
        name: joi.string().required(),
        expirationDate: joi.string().custom(date, 'date validation').required(),
        cvv: joi.string().length(3).required()
    })
});