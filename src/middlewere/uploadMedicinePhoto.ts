import multer from "multer";
import { Request } from "express";
import { ROOT_DIRECTORY } from "../config";
/**define storage to save uploaded file */
const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {
        const storagePath = `${ROOT_DIRECTORY}/public/medicine-photo`
        callback(null, storagePath)
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {
        const filename = `${Math.random()}-${file.originalname}`
        callback(null, filename)
    }
})

/**define function to filtering file */
const filterFile = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
) => {
    /**defind allowed extension */
    const allowedFile = /png|jpg|jpeg|gif/
    /**check extension of uploaded file */
    const isAllow = allowedFile.test(file.mimetype)
    /**mimetype (png jpg dll sesuai const allowedFile) */

    if (isAllow) {
        callback(null, true)
    } else {
        callback(new Error(`your file is not allow to upload`))
    }
}
const uploadMedicinePhoto = multer({
    storage,
    fileFilter: filterFile,
    limits: { fileSize: 2 * 1024 * 1024 }//2mb

})
export { uploadMedicinePhoto }