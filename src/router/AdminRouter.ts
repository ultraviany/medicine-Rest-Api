import { Router } from "express";
import { create } from "ts-node";
import { authentication,createAdmin,deleteAdmin,updateAdmin,readAdmin } from "../Controller/AdminController";
import { authValidation,createValidaton,updateValidation } from "../middlewere/AdminValidation";
import { verifyToken } from "../middlewere/authorization";

const router = Router()
/**for add new admin */
router.post(`/`,[verifyToken,createValidaton],createAdmin)
/**for show all adminn */
router.get(`/`,[verifyToken],readAdmin)
/**for update admin */
router.put(`/:id`,[verifyToken,updateValidation],updateAdmin)
/**for delate admin */
router.delete(`/:id`,[verifyToken],deleteAdmin)

router.post(`/auth`,[authValidation],authentication)


export default router
