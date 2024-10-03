import { Router } from "express";
import { createValidation, updateValidation } from "../middlewere/TransactionValidation";
import { createTransaction, deleteTransaction, readTransaction, updateTransaction } from "../Controller/TransactionController";
import { verifyToken } from "../middlewere/authorization";

const router = Router()
router.post(`/`,[verifyToken,createValidation], createTransaction)
router.get(`/`,[verifyToken], readTransaction)
router.put(`/:id`,[verifyToken,updateValidation],updateTransaction)
router.delete(`/:id`,[verifyToken],deleteTransaction)
export default router