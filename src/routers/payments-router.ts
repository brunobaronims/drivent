import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPaymentInfo, postPayment } from "@/controllers";
import { paymentSchema } from "@/schemas/payments-schemas";

const paymentsRouter = Router();

paymentsRouter  
    .all('/*', authenticateToken)
    .get('/', getPaymentInfo)
    .post('/process', validateBody(paymentSchema), postPayment)

export { paymentsRouter };