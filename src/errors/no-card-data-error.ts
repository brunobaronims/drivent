import { ApplicationError } from "@/protocols";

export function noCardDataError(): ApplicationError {
  return {
    name: "NoCardDataError",
    message: "Card data was not supplied in the request body!",
  };
}