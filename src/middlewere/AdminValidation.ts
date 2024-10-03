import { join } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ROOT_DIRECTORY } from "../config";

/**create a rule / schema
 * for add new admin
 */

const createSchema = Joi.object({
    Nama_admin: Joi.string().required(),
    Password: Joi.string().required(),
    Email: Joi.string().required()
})
const createValidaton = (req: Request, res: Response, next: NextFunction) => {
    const validation = createSchema.validate(req.body)
    if (validation.error) {
        return res.status(404).json({
            message: validation
                .error
                .details
                .map(it => it.message)
                .join()
        })
    }
    return next()
}
/**create a rule schema 
 * for update new admin
 */

const updateSchema = Joi.object({
    Nama_admin: Joi.string().optional(),
    Password: Joi.string().optional(),
    Email: Joi.string().optional(),
})
const updateValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = updateSchema.validate(req.body)
    if (validation.error) {
        return res.status(400)
            .json({
                message: validation
                    .error
                    .details
                    .map(it => it.message).join()
            })
    }
    return next()
}
const authSchema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required()
})

const authValidation = (req: Request, res: Response, next: NextFunction) => {
    const validation = authSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).json({
            message: validation
            .error
            .details
            .map(item => item.message).join()
        })
    }
    return next()
}

export { createValidaton, updateValidation,authValidation}