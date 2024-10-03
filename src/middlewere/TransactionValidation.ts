import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const detailSchema = Joi.object({
    medicine_id: Joi.number().required(),
    qty: Joi.number().required().min(1)
})
const createSchema = Joi.object({
    cashier_name: Joi.string().required(),
    order_date: Joi.date().required(),
    transaction_detail: Joi
        .array()
        .items(detailSchema)
        .min(1)
        .required()
})

const createValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = createSchema.validate(req.body)
    if (validate.error) {
        return res.status(400)
            .json({
                message: validate.error.details.map(item => item.message).join()
            })
    }
    return next()
}
const updateSchema = Joi.object({
    cashier_name: Joi.string().optional(),
    order_date: Joi.date().optional(),
    transaction_detail: Joi
        .array()
        .items(detailSchema)
        .min(1)
        .optional()
})

const updateValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = updateSchema.validate(req.body)
    if (validate.error) {
        return res.status(400)
            .json({
                message: validate.error.details.map(item => item.message).join()
            })
    }
    return next()
}

export { createValidation,updateValidation}