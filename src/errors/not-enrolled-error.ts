import { ApplicationError } from "@/protocols";

export function notEnrolledError(): ApplicationError {
  return {
    name: "NotEnrolledError",
    message: "User is not enrolled!",
  };
}