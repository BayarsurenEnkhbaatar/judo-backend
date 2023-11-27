import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
import {authjwt} from '../../utils/keys.js'
import jwt from 'jsonwebtoken'
import { STATUS } from "../../utils/types.js";
import { response } from "express";

export const createComp_to_org = async (req, res) => {
    const {org_id, comp_id} = req.body
    try{
        const response = await prisma.comptation_to_Organization.create({
            data:{
                org_id: parseInt(org_id),
                comp_id: parseInt(comp_id)
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const getComp_to_org = async (req, res) => {
    const {comp_id} = req.query;
    try{
        const response = await prisma.comptation_to_Organization.findMany({
            where:{
                comp_id: parseInt(comp_id)
            },
            include:{
                organization: true
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const OrgAthletesComp = async (req, res) => {
    const {comp_id, category_id, kg, org_id} = req.query;
    try{
        const response = await prisma.athlete_to_comptation.findMany({
            where:{
                comp_id: parseInt(comp_id),
                category_id: parseInt(category_id),
                kg: kg,
                org_id: parseInt(org_id)
            },
            include:{
                athlete: true
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const OrgComp = async (req, res) => {
    const {comp_id, org_id} = req.query;
    try{
        const response = await prisma.comptation_to_Organization.findFirst({
            where:{
                comp_id: parseInt(comp_id),
                org_id: parseInt(org_id)
            },
            include:{
                comptation: true
            }
        });
        const re = await prisma.athlete_to_comptation.findMany({
            where:{
                comp_id: parseInt(comp_id),
                org_id: parseInt(org_id)
            },
        });
        res.status(200).json({
            comp:response,
            athletes: re
        });
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const OrgCompToken = async (req, res) => {
    const {comp_id, org_id} = req.query;
    jwt.verify(org_id, authjwt, async function(err, decoded){
        if(err) return res.status(444).json("Not auth");
        try{
            const response = await prisma.comptation_to_Organization.findFirst({
                where:{
                    comp_id: parseInt(comp_id),
                    org_id: parseInt(decoded.id)
                },
                include:{
                    comptation: true
                }
            });
            const re = await prisma.athlete_to_comptation.findMany({
                where:{
                    comp_id: parseInt(comp_id),
                    org_id: parseInt(decoded.id)
                },
            });
            res.status(200).json({
                comp:response,
                athletes: re
            });
        }catch(error){
            res.status(404).json({msg: error.message});
        }
    });
    // jwt.verify(token, authjwt, async function(err, decoded){

    //     if(err) return res.status(444).json("Not auth");
}

export const OrgCompStatus = async (req, res) => {
    const {comp_id, org_id, status} = req.body;
    try{
        const response = await prisma.comptation_to_Organization.findFirst({
            where:{
                comp_id: parseInt(comp_id),
                org_id: parseInt(org_id)
            },
        });
        if(response){
            const sa = await prisma.comptation_to_Organization.update({
                where:{
                    id: parseInt(response.id),
                },
                data:{
                    status:status
                }
            });

            const at = await prisma.athlete_to_comptation.updateMany({
                where:{
                    comp_id: parseInt(comp_id),
                    org_id: parseInt(org_id),
                },
                data:{
                    status: STATUS.PENDING
                }
            });

            // if(at){
            //     // for(let i; i<at.length; i++){
            //     //     const fd = await prisma.athlete_to_comptation.update({
            //     //         where:{
            //     //             id: parseInt(at[i].id),
            //     //         },
            //     //         data:{
            //     //             status: STATUS.PENDING
            //     //         }
            //     //     });    
            //     // }
            //     const fd = await prisma.athlete_to_comptation.update({
            //         where:{
            //             id: parseInt(at[i].id),
            //         },
            //         data:{
            //             status: STATUS.PENDING
            //         }
            //     });  
            // }
        }
        res.status(200).json("S");
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const CompToOrg = async (req, res) => {
    const {token, comp_id} = req.query;

    jwt.verify(token, authjwt, async function(err, decoded){

        if(err) return res.status(444).json("Not auth");
        try{
            const response = await prisma.comptation_to_Organization.findFirst({
                where:{
                    org_id: Number(decoded.id),
                    comp_id: Number(comp_id),
                }
            });
            res.status(200).json(response);
        }catch(error){
            res.status(404).json({msg: error.message});
        }
    });
}

export const CompToOrgCreate = async (req, res) => {
    const {token, comp_id} = req.body;

    jwt.verify(token, authjwt, async function(err, decoded){

        if(err) return res.status(444).json("Not auth");
        try{
            const response = await prisma.comptation_to_Organization.findFirst({
                where:{
                    org_id: Number(decoded.id),
                    comp_id: Number(comp_id),
                }
            });

           if(!response){
            const response = await prisma.comptation_to_Organization.create({
                data:{
                    comp_id: Number(comp_id),
                    org_id: Number(decoded.id),
                    status: STATUS.REQUESTED
                }
            });
           }
            res.status(200).json("амжилттай");
        }catch(error){
            res.status(404).json({msg: error.message});
        }
    });
}
