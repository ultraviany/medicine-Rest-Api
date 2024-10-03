import Express from "express"
import medicineRoute from "./router/MedicineRouter"
import { createValidation } from "./middlewere/MedicineValidation"
import adminRoute from "./router/AdminRouter"
import transaction from "./router/TransactionRouter"

const app = Express()
/**allow to read a body request with
 * JSON format
 */
app.use(Express.json())

/**prefix for medicine route */
app.use(`/medicine`, medicineRoute)
/**prefix for admin route */
app.use(`/admin`,adminRoute)

app.use(`/transaction`,transaction)

const PORT = 1992
app.listen(PORT, () => {
    console.log(`Server Drugstore run on port ${PORT}`)
})