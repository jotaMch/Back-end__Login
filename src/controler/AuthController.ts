// Importe o pacote dotenv e carregue as variáveis de ambiente
import dotenv from "dotenv";
dotenv.config();

// Importe os outros módulos necessários
import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        
        const isValuePassword = await compare(password, user.password);
        
        if (!isValuePassword) {
            return res.json({ error: "Password invalid" });
        }

        // Acessando a chave secreta do JWT do arquivo .env
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.log(jwtSecret, "token erro")
            return res.status(500).json({ error: "JWT secret key not found in .env file" });
        }

        const token = sign({ id: user.id }, jwtSecret, { expiresIn: "1d" });

        console.log( user, token )
        return res.json({ user, token });
    } 
}
