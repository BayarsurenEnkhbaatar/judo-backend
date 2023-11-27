import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import {STATUS} from '../../utils/types.js'
import {authjwt} from '../../utils/keys.js'



// export const getOrg = async (req, res) => {
//     try{
//         const response = await prisma.organization.findMany();
//         res.status(200).json(response);
//     }catch(error){
//         res.status(404).json({msg: error.message});
//     }
// }

export const getAthleteStatus = async (req, res) => {
    const { limit, page, status, username } = req.query;
    const offset = (page - 1) * limit;
    try {
        let whereClause = {
            status
        };

        if (username) {
            whereClause.username = {
                contains: username
            };
        }

        const alldata = await prisma.athlete.findMany({
            where: whereClause,
            orderBy: {
                id: 'desc'
            },
            take: parseInt(limit),
            skip: offset
        });

        const count = await prisma.athlete.count({
            where: whereClause
        });

        const totalPage = Math.ceil(count / limit);
        const response = {
            data: alldata,
            page: +page,
            limit: +limit,
            all: count,
            totalPage
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

    export const getAthleteOrg = async (req, res) => {
        const { limit, page, username, token } = req.query;

        jwt.verify(token, authjwt, async function(err, decoded){

            if(err) return res.status(444).json("Not auth");
            
            const offset = (page - 1) * limit;
            try {
                let whereClause = {
                    org_id:decoded.id
                }
        
                if (username) {
                    whereClause.username = {
                        contains: username
                    };
                }
        
                const alldata = await prisma.athlete.findMany({
                    where: whereClause,
                    orderBy: {
                        id: 'desc'
                    },
                    take: parseInt(limit),
                    skip: offset
                });
        
                const count = await prisma.athlete.count({
                    where: whereClause
                });
        
                const totalPage = Math.ceil(count / limit);
                const response = {
                    data: alldata,
                    page: +page,
                    limit: +limit,
                    all: count,
                    totalPage
                };
        
                res.status(200).json(response);
            } catch (error) {
                res.status(404).json({ msg: error.message });
            }
        });
    }

    export const createAthlete = async (req, res) => {
        const { username, lastname, gender, birth_date, phone_no, register_no, token, document_img, profile_img } = req.body;
        jwt.verify(token, authjwt, async function(err, decoded){
            if(err) return res.status(444).json("Not auth");
                try {
                    const response = await prisma.athlete.create({
                        data: {
                            username: username,
                            lastname: lastname,
                            gender: gender,
                            birth_date: birth_date,
                            phone_no: phone_no,
                            register_no: register_no,
                            org_id: decoded.id,
                            document_img: document_img,
                            profile_img: profile_img,
                            status:STATUS.REQUESTED
                        }
                    });

                    res.status(201).json("Амжилттай илгээлээ таны мэдээллийг шалгаад имейл хаягаар хариу илгээнэ");
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ msg: "Серверийн алдаа гарлаа" });
                }
        }
    )}
    

export const updateAthleteStatus = async (req, res) => {
    const {status} = req.body;

    try{
        const response = await prisma.athlete.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                status: status,
            }
        });
        res.status(200).json("Амжилттай шинчлэгдлээ");
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}

export const AthletetoComp = async (req, res) => {
    const {org_id, comp_id} = req.query;
    try{
        const response = await prisma.athlete_to_comptation.findMany({
            where:{
                org_id: Number(org_id),
                comp_id: Number(comp_id),
            },
            include:{
                athlete: true,
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}
