import { ApplicationError } from "@/protocols";

export function noTicketError(): ApplicationError {
  return {
    name: "NoTicketError",
    message: "User does not have a ticket!",
  };
}