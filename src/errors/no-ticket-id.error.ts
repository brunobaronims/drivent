import { ApplicationError } from "@/protocols";

export function noTicketIdError(): ApplicationError {
  return {
    name: "NoTicketIdError",
    message: "Ticket ID was not supplied in the request body!",
  };
}