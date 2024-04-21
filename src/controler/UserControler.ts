import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";

export class UserControler {
    async index (req: Request, res: Response){
        const users = await prisma.user.findMany();
        return res.json({users})
    }
    async store(req: Request, res: Response) {
        const { name, email, password } = req.body

        
        const userExists = await prisma.user.findUnique({
            where: {                
            email: name,
            name: email,
            password: password,
        }})
        
        if (userExists) {
            return res.json({ error: "User Exists" });
        }
        
        const hash_password = await hash(password, 8);
        
        const user = await prisma.user.create({
            data: {
                name, 
                email, 
                password: hash_password,
            },
        });

        console.log(user)
        return res.json({user});
    } 
}