import { ApplicationError } from "@/protocols";

export function noTicketTypeIdError(): ApplicationError {
  return {
    name: "NoTicketTypeIdError",
    message: "Ticket type ID was not supplied in the request body!",
  };
}