import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient({errorFormat:"minimal"})

//CREAT
const createAdmin = async(req:Request, res:Response)=>{
    try {
        /**
         * bentuk code lain
         * const {nama,email,password} = req.body
         */
        const Nama_admin: string=req.body.Nama_admin
        const Email :string =req.body.Email
        const Password : string = req.body.Password
        //check email 
        const findEmail = await prisma.admin
        .findFirst({where:{Email}})
        if (findEmail){
            return res.status(400)
            .json({message : `Email has exists`})
        }

        //proses hash 
        const hashPassword = await bcrypt.hash(Password,12)

        const newAdmin = await prisma.admin.create({
            data: {
               Nama_admin,
               Email,
               Password: hashPassword
            }
        })
        return res.status(200)
            .json({
                message: `New admin has been created`,
                data: newAdmin
            })
    } catch (error) {
        console.log(error);

        return res.status(500)
            .json({
                error
            })
    }
}


/**READ */
const readAdmin = async (
    req: Request,
    res: Response
) => {
    try {
        const search = req.query.search
        /**get all admin */
        const allAdmin = await prisma.admin.findMany({
            where:{
                OR:[
                    {Nama_admin:{contains:search?.toString()||""}}
                ]
            }
        })
        return res.status(200)
            .json({
                message: `admin has been retrivied`,
                data: allAdmin
            })
    } catch (error) {
        res.status(500)
            .json(error)
    }
}


/**UPDATE */
const updateAdmin = async (req: Request, res: Response) => {
    try {
        /** read "id" of medicine that sent at
         * parameter URL
         */
        const id = req.params.id

        /** check existing admin based on id */
        const findAdmin = await prisma.admin
            .findFirst({
                where: { id: Number(id) }
            })

        if (!findAdmin) {
            return res.status(200)
                .json({
                    message: `Admin is not found`
                })
        }
        const {
            Nama_admin, Email, Password
        } = req.body


        /** update admin*/
        const saveAdmin = await prisma.admin
            .update({
                where: { id: Number(id) },
                data: {
                   Nama_admin:Nama_admin?Nama_admin: findAdmin.Nama_admin,
                   Email: Email?Email:findAdmin.Email,
                   Password:Password?
                   await bcrypt.hash(Password,12)
                   :findAdmin.Password
                }
            })

        return res.status(200)
            .json({
                message: `Admin has been updated`,
                data: saveAdmin
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}


/**DELETE */
const deleteAdmin = async (req: Request, res: Response) => {
    try {
        /** read id of medicine from  0*/
        const id = req.params.id

        const findAdmin = await prisma.admin
            .findFirst({
                where: { id: Number(id) }
            })

        if (!findAdmin) {
            return res.status(200)
                .json({
                    message: `Admin is not found`
                })
        }

        const saveAdmin = await prisma.admin
            .delete({
                where: { id: Number(id) }
            })

        return res.status(200)
            .json({
                message: `Admin has been removed`,
                data: saveAdmin
            })

    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

/** function for login (authentication) */
const authentication = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body
        /** check existing email */
        const findAdmin = await prisma
        .admin.findFirst({ 
            where: {Email} 
        })

        if(!findAdmin){
            return res.status(200).json({
                message: `Email is not registered`
            })
        }

        const isMatchPassword = await bcrypt
        .compare(Password, findAdmin.Password)

        if(!isMatchPassword){
            return res.status(200).json({
                message: `Invalid password`
            })
        }
        /** prepare to generate token
         * using JWT
         */
        const playload = {
            name: findAdmin.Nama_admin,
            email: findAdmin.Email
        }
        const signature = process.env.SECRET || ``

        const token = jwt.sign(playload, signature)

        return res.status(200)
        .json({
            logged: true,
            token,
            id: findAdmin.id,
            name: findAdmin.Nama_admin,
            email: findAdmin.Email
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}



export{readAdmin,createAdmin,deleteAdmin,updateAdmin,authentication}