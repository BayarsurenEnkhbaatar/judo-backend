import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import {authjwt} from "../../utils/keys.js"
import { STATUS } from "../Utils/types.js";

export const createComptation = async (req, res) => {
    const {name, desc, province, sum, start_date, end_date, orgenizer, cover_img, categorys, mandat_price, more_address, type} = req.body;
    const startdate = new Date(start_date);
    const enddate = new Date(end_date);

    try{
        const response = await prisma.comptation.create({
            data:{
                name: name,
                desc: desc,
                province: province,
                sum:sum,
                start_date:startdate,
                end_date:enddate,
                orgenizer:orgenizer,
                cover_img:cover_img,
                mandat_price:parseInt(mandat_price),
                more_address:more_address,
                type:type
            }
        });
        for(let i = 0; i<categorys.length; i++){
            const res = await prisma.comp_to_category.create({
                data:{
                    comp_id: response.id,
                    category_id: categorys[i]
                }
            });
        }
        res.status(201).json("Амжилттай нэмлээ");
    }catch(error){
        console.log(error)
        res.status(400).json({msg: error.message});
    }
}


export const getCompAll = async (req, res) => {
    const { limit, page, name } = req.query;
    const offset = (page - 1) * limit;
    try {
        let whereClause = {
            
        };

        if (name) {
            whereClause.name = {
                contains: name
            };
        }

        const alldata = await prisma.comptation.findMany({
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


export const compAllList = async (req, res) => {
    try{
        const response = await prisma.comptation.findMany();
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}
export const compFindId = async (req, res) => {
    try{
        const response = await prisma.comptation.findFirst({
            where:{
                id: parseInt(req.query.id),
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}


//athlete to comptation
export const createAthleteToComptation = async (req, res) => {
    const { token, athlete_ids, kg, comp_id, category_id } = req.body;
  
    jwt.verify(token, authjwt, async function(err, decoded) {
      if (err) return res.status(444).json("Not auth");
  
      try {
        const createPromises = athlete_ids.map(async athlete_id => {
          const existingRecord = await prisma.athlete_to_comptation.findFirst({
            where: {
              org_id: parseInt(decoded.id), 
              athlete_id: parseInt(athlete_id),
              comp_id: parseInt(comp_id),
            },
            include: {
                athlete: true,
            },
          });
  
          if (existingRecord) {
            return existingRecord;
          }
  
          const newRecord = await prisma.athlete_to_comptation.create({
            data: {
              org_id: parseInt(decoded.id),
              athlete_id: parseInt(athlete_id),
              kg: kg,
              comp_id: parseInt(comp_id),
              category_id: parseInt(category_id),
              status: STATUS.REQUESTED,
            }
          });
        });
  
        const results = await Promise.all(createPromises);
  
        res.status(200).json(results.filter(record => record !== undefined));
      } catch (error) {
        res.status(404).json({ msg: error.message });
      }
    });
  };


  export const compToCategoryAthletesAndOrg = async (req, res) => {
      const {org_id, comp_id, category_id, kg} = req.query;

      jwt.verify(org_id, authjwt, async function(err, decoded) {
        if (err) return res.status(444).json("Not auth");

         try{
            const response = await prisma.athlete_to_comptation.findMany({
                where:{
                    org_id: parseInt(decoded.id),
                    comp_id: parseInt(comp_id),
                    category_id: parseInt(category_id),
                    kg:kg
                },
                include:{
                    athlete: true,
                }
            });
            res.status(200).json(response);
        }catch(error){
            res.status(404).json({msg: error.message});
        }

      });
    }

    export const compAthleteCatgoryDelete = async (req, res) => {
        const {org_id, comp_id, category_id, kg, athlete, id} = req.query;
  
        jwt.verify(org_id, authjwt, async function(err, decoded) {
          if (err) return res.status(444).json("Not auth");
  
           try{
              const response = await prisma.athlete_to_comptation.delete({
                  where:{
                      id: parseInt(id),
                      org_id: parseInt(decoded.id),
                      comp_id: parseInt(comp_id),
                      category_id: parseInt(category_id),
                      kg:kg,
                      athlete_id: parseInt(athlete)
                  },
              });
              res.status(200).json("устгалаа");
          }catch(error){
              res.status(404).json({msg: error.message});
          }
  
        });
      }

    export const AdminCompAthlete = async (req, res) => {
    const {comp_id, kg} = req.query;
        try{
            const response = await prisma.athlete_to_comptation.findMany({
                where:{
                    comp_id: parseInt(comp_id),
                    kg:kg,
                    status: STATUS.APPROVED
                },
                include:{
                    athlete:true,
                }
            });
            res.status(200).json(response);
        }catch(error){
            res.status(404).json({msg: error.message});
        }
    }

    export const Comp_to_Athletes = async (req, res) => {
        const { comp_id, kg, status, username } = req.query;
        try {
          const response = await prisma.athlete_to_comptation.findMany({
            where: {
                comp_id: parseInt(comp_id),
                kg: kg,
                status: status,
                athlete: {
                    username: {
                    contains: username,
                    },
                },
            },
            include: {
              athlete: true,
              organization: true,
            },
          });
      
          res.status(200).json(response);
        } catch (error) {
          res.status(404).json({ msg: error.message });
        }
      };
      
      
    export const Jin_Control_Update = async (req, res) => {
    const {jin, atid, standart_jin, comp_id} = req.body;
    
        if(parseFloat(jin) > 0 && parseFloat(jin) <= parseFloat(standart_jin)){
            try{
                const response = await prisma.athlete_to_comptation.findFirst({
                    where:{
                        athlete_id: parseInt(atid),
                        comp_id: parseInt(comp_id),
                    },
                });
                if(response){
                    const res = await prisma.athlete_to_comptation.update({
                        where:{
                            id: parseInt(response.id),
                        },
                        data:{
                            status: STATUS.APPROVED,
                            control_jin: jin
                        }
                    });
                }
                return res.status(200).json("response");
            }catch(error){
                res.status(404).json({msg: error.message});
            }
        }
        
        if(parseFloat(jin) >= parseFloat(standart_jin) && parseFloat(jin) < 0){
            try{
                const response = await prisma.athlete_to_comptation.findFirst({
                    where:{
                        athlete_id: parseInt(atid),
                        comp_id: parseInt(comp_id),
                    },
                });
                if(response){
                    const res = await prisma.athlete_to_comptation.update({
                        where:{
                            id: parseInt(response.id),
                        },
                        data:{
                            status: STATUS.APPROVED,
                            control_jin: jin
                        }
                    });
                }
                return res.status(200).json("response");

            }catch(error){
                res.status(404).json({msg: error.message});
            }
        }else{
            try{
                const response = await prisma.athlete_to_comptation.findFirst({
                    where:{
                        athlete_id: parseInt(atid),
                        comp_id: parseInt(comp_id),
                    },
                });
                if(response){
                    const res = await prisma.athlete_to_comptation.update({
                        where:{
                            id: parseInt(response.id),
                        },
                        data:{
                            status: STATUS.DECLINED,
                            control_jin: jin
                        }
                    });
                }
                
                return res.status(200).json(response);
            }catch(error){
                res.status(404).json({msg: error.message});
            }
        }
    }
