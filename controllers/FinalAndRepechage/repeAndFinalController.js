import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const getRepechageAndFinal = async (req, res) => {
    const {comp_id, kg} = req.query;
    try{
        const final = await prisma.finals.findMany({
            where:{
                comp_id:parseInt(comp_id),
                kg:kg
            },
            include:{
                athlete1: true,
                athlete2: true,
            }
        });
        const repechage = await prisma.repechage.findMany({
            where:{
                comp_id:parseInt(comp_id),
                kg:kg
            },
            include:{
                athlete1: true,
                athlete2: true,
            }
        });
        res.status(200).json({final:final, repechage: repechage});
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const patchRepechange = async (req, res) => {
    console.log(req.body);
    try{
        // const response = await prisma.repechage.findMany();
        // res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const createRepechage = async ({comp_id, kg}) => {
    const createMatch = async (round, totalMatches) => {
        for (let a = 0; a < totalMatches; a++) {
            const response = await prisma.repechage.create({
                data: {
                    round: round,
                    match_number: a + 1,
                    kg: kg,
                    comp_id: parseInt(comp_id),
                    athlete1_id: 111,
                    athlete2_id: 111,
                    winner_id: 111
                }
            });
        }
    };

    for (let round = 1; round <= 3; round++) {
        await createMatch(round, 2);
    }
}


export const createFinal = async ({comp_id, kg}) => {
    const createMatch = async (round, totalMatches) => {
        for (let a = 0; a < totalMatches; a++) {
            const response = await prisma.finals.create({
                data: {
                    round: round,
                    match_number: a + 1,
                    kg: kg,
                    comp_id: parseInt(comp_id),
                    athlete1_id: 111,
                    athlete2_id: 111,
                    winner_id: 111
                }
            });
        }
    };

    for (let round = 1; round <= 3; round++) {
        const matchesPerRound = [2, 1, 1];
        await createMatch(round, matchesPerRound[round-1]);
    }
}