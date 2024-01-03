import {PrismaClient} from "@prisma/client";
import { authjwt } from "../../utils/keys.js";
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const AdminGet = async (req, res) => {
    const { comp_id, kg, round,group } = req.query;

    try {
        const response = await prisma.results.findMany({
            where:{
                comp_id:Number(comp_id),
                kg:kg,
                round: Number(round),
                group:group
            },
            include: {
                winnerid: true,
            },
        });

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json('Internal server error');
    }
};

export const AdminCreate = async (req, res) => {
    const { username, password, type } = req.body;
    try {
    const existingOrg = await prisma.admins.findFirst({
        where: {
            username: username
        }
    });

    if (existingOrg) {
        return res.status(200).json({ msg: "Таны нэр эсвэл имейл хаяг аль хэдийн бүртгэлтэй байна !" });
    }

    const salt = bcrypt.genSaltSync(6);
    const hash = bcrypt.hashSync(password, salt);

    // Create the organization
    const response = await prisma.admins.create({
        data: {
            username: username,
            password: hash,
            type: type,
        }
    });

    res.status(201).json("Амжилттай илгээлээ таны мэдээллийг шалгаад имейл хаягаар хариу илгээнэ");
    } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Серверийн алдаа гарлаа" });
    }
};


export const AdminLogin = async (req, res) => {
    const {password, username} = req.body;
    try{
        const response = await prisma.admins.findFirst({
            where:{
                username: username
            },
        });
        if(!response) return res.status(204).json("Ийм имейл хаягтай харилцагч байхгүй байна !")
        const isPasswordCorrect = bcrypt.compareSync(password,response.password);
        if(!isPasswordCorrect) return res.status(205).json("Хэрэглэгчийн имейл эсвэл нууц үг таарахгүй байна !")

        const token = jwt.sign({ id: response.id}, authjwt, {
            expiresIn: '7d'
        });

        res.status(200).json(response.type);
        
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}