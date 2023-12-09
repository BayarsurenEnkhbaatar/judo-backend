import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import {STATUS} from '../../utils/types.js'
import {authjwt} from '../../utils/keys.js'

export const getOrg = async (req, res) => {
    try{
        const response = await prisma.organization.findMany({
            where:{
                status: STATUS.APPROVED
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const getOrgStatus = async (req, res) => {
    const { limit, page, status, name } = req.query;
    const offset = (page - 1) * limit;
    try {
        let whereClause = {
            status
        };

        if (name) {
            whereClause.name = {
                contains: name
            };
        }

        const alldata = await prisma.organization.findMany({
            where: whereClause,
            orderBy: {
                id: 'desc'
            },
            take: parseInt(limit),
            skip: offset
        });

        const count = await prisma.organization.count({
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

export const getOrgExpired = async (req, res) => {
    const { limit, page, name } = req.query;
    const offset = (page - 1) * limit;
    try {
        let whereClause = {
            status: STATUS.APPROVED,
            expiry_date: {
                lt: new Date()
            },
        };

        if (name) {
            whereClause.name = {
                contains: name
            };
        }

        const alldata = await prisma.organization.findMany({
            where: whereClause,
            orderBy: {
                id: 'desc'
            },
            take: parseInt(limit),
            skip: offset
        });

        const count = await prisma.organization.count({
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
export const OrgExpiredApproved = async (req, res) => {
    const {id} = req.body;
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    try {

        const org = await prisma.organization.update({
            where:{
                id: Number(id)
            },
            data:{
                expiry_date: oneYearFromNow
            }
        });

        res.status(200).json("Амжилттай сунгалаа");
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

    export const getOrgId = async (req, res) => {
        const {token} = req.params;

        jwt.verify(token, authjwt, async function(err, decoded){

            if(err) return res.status(444).json("Not auth");
            try{
                const response = await prisma.organization.findUnique({
                    where:{
                        id: Number(decoded.id)
                    }
                });
                res.status(200).json(response);
            }catch(error){
                res.status(404).json({msg: error.message});
            }
        });
    }

    export const getOrgIdAdmin = async (req, res) => {
        const {org} = req.query;
            try{
                const response = await prisma.organization.findUnique({
                    where:{
                        id: Number(org)
                    }
                });
                res.status(200).json(response);
            }catch(error){
                res.status(404).json({msg: error.message});
            }
    }

    export const createOrg = async (req, res) => {
        const { name, phone_no, description, email, address, created_date, type, status, logo, province, sum } = req.body;
        try {
        const existingOrg = await prisma.organization.findFirst({
            where: {
            OR: [
                { name: name },
                { email: email }
            ]
            }
        });
    
        if (existingOrg) {
            return res.status(200).json({ msg: "Таны нэр эсвэл имейл хаяг аль хэдийн бүртгэлтэй байна !" });
        }
    
        // Create the organization
        const response = await prisma.organization.create({
            data: {
            name: name,
            type: type,
            status: status,
            phone_no: phone_no,
            description: description,
            email: email,
            address: address,
            created_date: created_date,
            province:province,
            sum:sum,
            logo: logo,
            expiry_date: new Date('2023-01-01')
            }
        });
    
        res.status(201).json("Амжилттай илгээлээ таны мэдээллийг шалгаад имейл хаягаар хариу илгээнэ");
        } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Серверийн алдаа гарлаа" });
        }
    };

export const updateOrgStatus = async (req, res) => {
    const {status, password} = req.body;
    
    if(status === STATUS.APPROVED){
        const salt = bcrypt.genSaltSync(6);
        const hash = bcrypt.hashSync(password, salt);

        try{
            const response = await prisma.organization.update({
                where:{
                    id: Number(req.params.id)
                },
                data:{
                    status: status,
                    password: hash
                }
            });
            return res.status(200).json("Амжилттай шинчлэгдлээ");
        }catch(error){
            return res.status(400).json({msg: error.message});
        }
    }
    try{
        const response = await prisma.organization.update({
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


export const loginOrg = async (req, res) => {
    const {password, email} = req.body;
    try{
        const response = await prisma.organization.findFirst({
            where:{
                email: email
            },
        });
        if(!response) return res.status(204).json("Ийм имейл хаягтай харилцагч байхгүй байна !")
        const isPasswordCorrect = bcrypt.compareSync(password,response.password);
        if(!isPasswordCorrect) return res.status(205).json("Хэрэглэгчийн имейл эсвэл нууц үг таарахгүй байна !")

        const token = jwt.sign({ id: response.id}, authjwt, {
            expiresIn: '7d'
        });

        res.status(200).json(token);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}

export const getOrgAthleteGender = async (req, res) => {
    const {token, gender, name} = req.query;

    jwt.verify(token, authjwt, async function(err, decoded){
        if(err) return res.status(444).json("Not auth");

        if(name){
            try{
                const response = await prisma.athlete.findMany({
                    where:{
                        org_id: Number(decoded.id),
                        gender: gender,
                        status: STATUS.APPROVED,
                        expiry_date: {
                            gt: new Date()
                        },
                        username: {
                            contains: name
                        }
                    }
                });
                res.status(200).json(response);
            }catch(error){
                res.status(404).json({msg: error.message});
            }
        }else{
            try{
                const response = await prisma.athlete.findMany({
                    where:{
                        org_id: Number(decoded.id),
                        gender: gender,
                        status: STATUS.APPROVED,
                        expiry_date: {
                            gt: new Date()
                        }
                    }
                });
                res.status(200).json(response);
            }catch(error){
                res.status(404).json({msg: error.message});
            }
        }
    });
}

export const getOrgComptationAthletes = async (req, res) => {
    try{
        const response = await prisma.athlete_to_comptation.findMany({
            where:{
                org_id: Number(req.query.org_id),
            },
            include: {
                athlete: true 
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}