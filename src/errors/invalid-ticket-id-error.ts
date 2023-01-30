import { ApplicationError } from "@/protocols";

export function invalidTicketIdError(): ApplicationError {
  return {
    name: "InvalidTicketIdError",
    message: "Ticket does not exist!",
  };
}