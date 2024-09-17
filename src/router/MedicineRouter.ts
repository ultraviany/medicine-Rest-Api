import { Router } from "express";
import { create } from "ts-node";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../Controller/MedicineController";
import { createValidation, updateValidation } from "../middlewere/MedicineValidation";
const router = Router()

/**route for add new medicine */
router.post(`/`,[createValidation],createMedicine)

/**root for show all madicine*/
router.get(`/`,readMedicine)

/**route for update medicine , untuk update use put */
router.put(`/:id`, [updateValidation],updateMedicine)

/*route for delete medicine , untuk update use delete*/
router.delete(`/:id`, deleteMedicine)

export default  router