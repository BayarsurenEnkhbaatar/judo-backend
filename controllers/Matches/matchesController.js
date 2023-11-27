import {PrismaClient} from "@prisma/client";
import { createFinal, createRepechage } from "../FinalAndRepechage/repeAndFinalController.js";
const prisma = new PrismaClient();

export const MatchCreate = async (req, res) => {
    const { comp_id, kg, groups, athletes, group_number } = req.body;
        try {

            const groupNames = ["A", "B", "C", "D"];
            for (let i = 0; i < parseInt(groups); i++) {
                const groupCreate = await prisma.groups.create({
                    data: {
                        comp_id: Number(comp_id),
                        kg: kg,
                        group_name: groupNames[i],
                        group_number: parseInt(group_number),
                    }
                });

                const createMatch = async (round, totalMatches) => {
                    for (let a = 0; a < totalMatches; a++) {
                        const response = await prisma.matches.create({
                            data: {
                                round: round,
                                match_number: a + 1,
                                group: groupNames[i],
                                kg: kg,
                                comp_id: parseInt(comp_id),
                                athlete1_id: 111,
                                athlete2_id: 111
                            }
                        });
                    }
                };
                if(parseInt(athletes) === 4){
                    const matchesPerRound = [athletes / 2, athletes / 4, athletes / 4];
                    for (let round = 1; round <= 3; round++) {
                        await createMatch(round, matchesPerRound[round - 1]);
                    }
                }
                else if(parseInt(athletes) === 8){
                    const matchesPerRound = [athletes / 2, athletes / 4, athletes / 8, athletes / 8];
                    for (let round = 1; round <= 4; round++) {
                        await createMatch(round, matchesPerRound[round - 1]);
                    }
                }
                else if(parseInt(athletes) === 16){
                    const matchesPerRound = [athletes / 4, athletes / 8, athletes / 16, athletes / 16];
                    for (let round = 1; round <= 4; round++) {
                        await createMatch(round, matchesPerRound[round - 1]);
                    }
                }
                else if(parseInt(athletes) === 32){
                    const matchesPerRound = [athletes / 8, athletes / 16, athletes / 32, athletes / 32];
                    for (let round = 1; round <= 4; round++) {
                        await createMatch(round, matchesPerRound[round - 1]);
                    }
                }
                else if(parseInt(athletes) === 64){
                    const matchesPerRound = [athletes / 8, athletes / 16, athletes / 32, athletes / 64, athletes / 64];
                    for (let round = 1; round <= 5; round++) {
                        await createMatch(round, matchesPerRound[round - 1]);
                    }
                }
                else if(parseInt(athletes) === 128){
                    const matchesPerRound = [athletes / 16, athletes / 32, athletes / 64, athletes / 128, athletes / 128];
                    for (let round = 1; round <= 5; round++) {
                        await createMatch(round, matchesPerRound[round - 1]);
                    }
                }
                
            }
            
            await createRepechage({comp_id: comp_id, kg: kg});
            await createFinal({comp_id: comp_id, kg: kg});

            return res.status(200).json('Success');
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
};



export const MatchUpdate = async (req, res) => {
    const { comp_id } = req.query;

    for (let i = 0; i < req.body.length; i++) {
        try {
            const currentMatchNumber = parseInt(req.body[i].match_sequence);
            const updateData = {};

            if (currentMatchNumber % 2 !== 0) {
                updateData.athlete1_id = parseInt(req.body[i].value);
            } else {
                updateData.athlete2_id = parseInt(req.body[i].value);
            }

            const existingMatch = await prisma.matches.findFirst({
                where: {
                    comp_id: parseInt(comp_id),
                    group: req.body[i].group,
                    match_number: parseInt(req.body[i].match_number),
                    round: parseInt(req.body[i].round),
                    kg: req.body[i].kg
                }
            });

            if (existingMatch) {
                const response = await prisma.matches.update({
                    where: {
                        id: existingMatch.id
                    },
                    data: updateData,
                });
            } else {
                // Handle the case where the matching record is not found
                console.log('Matching record not found');
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }
    return res.status(200).json("Success");
}


export const MatchCompGet = async (req, res) => {
    const { comp_id, kg } = req.query;

    try {
        const response = await prisma.matches.findMany({
            where:{
                comp_id:Number(comp_id),
                kg:kg,
            },
            include: {
                athlete1: {
                    include: {
                        organization: true, // Include organization details for athlete1
                    },
                },
                athlete2: {
                    include: {
                        organization: true, // Include organization details for athlete2
                    },
                },
            },
        });

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json('Internal server error');
    }
};


export const MatchWinner = async (req, res) => {
    const data = req.body.data;
    const el = req.body.el;

    if(data.round === 1){
        const updateData = {};
        const athlete_data = {};
        updateData.round = 2
        if(data.match_number === 1 ){
            updateData.match_number = 1
            athlete_data.athlete1_id = parseInt(el.id);
        }
        if(data.match_number === 2){
            updateData.match_number = 1
            athlete_data.athlete2_id = parseInt(el.id);
        }
        if(data.match_number === 3){
            updateData.match_number = 2
            athlete_data.athlete1_id = parseInt(el.id);
        }
        if(data.match_number === 4){
            updateData.match_number = 2
            athlete_data.athlete2_id = parseInt(el.id);
        }

        try {
            const matchWhere = await prisma.matches.findFirst({
                where: {
                    comp_id: Number(data.comp_id),
                    group: data.group,
                    match_number: Number(updateData.match_number),
                    kg: data.kg,
                    round: updateData.round
                }
            });
            if (matchWhere) {
                const response = await prisma.matches.update({
                    where: {
                        id: matchWhere.id
                    },
                    data: athlete_data
                });
            }
            return res.status(200).json("response");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
 
    }

    if(data.round === 2){
        const updateData = {};
        const athlete_data = {};
        updateData.round = 3
        if(data.match_number === 1 ){
            updateData.match_number = 1
            athlete_data.athlete1_id = parseInt(el.id);
        }
        if(data.match_number === 2){
            updateData.match_number = 1
            athlete_data.athlete2_id = parseInt(el.id);
        }

        try {
            const matchWhere = await prisma.matches.findFirst({
                where: {
                    comp_id: Number(data.comp_id),
                    group: data.group,
                    match_number: Number(updateData.match_number),
                    kg: data.kg,
                    round: updateData.round
                }
            });
            if (matchWhere) {
                const response = await prisma.matches.update({
                    where: {
                        id: matchWhere.id
                    },
                    data: athlete_data
                });
            }
            return res.status(200).json("response");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
 
    }

    if(data.round === 3){
        const updateData = {};
        const athlete_data = {};
        updateData.round = 4
        if(data.match_number === 1 ){
            updateData.match_number = 1
            athlete_data.athlete1_id = parseInt(el.id);
        }

        try {
            const matchWhere = await prisma.matches.findFirst({
                where: {
                    comp_id: Number(data.comp_id),
                    group: data.group,
                    match_number: Number(updateData.match_number),
                    kg: data.kg,
                    round: updateData.round
                }
            });
            if (matchWhere) {
                const response = await prisma.matches.update({
                    where: {
                        id: matchWhere.id
                    },
                    data: athlete_data
                });
            }
            return res.status(200).json("response");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
 
    }
};

export const MatchWinnerRepechage = async (req, res) => {
    const data = req.body.data;
    const el = req.body.el;

    if(data.round === 1){
        const updateData = {};
        const athlete_data = {};
        updateData.round = 2
        if(data.match_number === 1 ){
            updateData.match_number = 1
            athlete_data.athlete2_id = parseInt(el.id);
        }
        if(data.match_number === 2){
            updateData.match_number = 2
            athlete_data.athlete2_id = parseInt(el.id);
        }

        try {
            const matchWhere = await prisma.repechage.findFirst({
                where: {
                    comp_id: Number(data.comp_id),
                    match_number: Number(updateData.match_number),
                    kg: data.kg,
                    round: updateData.round
                }
            });
            if (matchWhere) {
                const response = await prisma.repechage.update({
                    where: {
                        id: matchWhere.id
                    },
                    data: athlete_data
                });
            }
            return res.status(200).json("response");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
 
    }
    if(data.round === 2){
        const updateData = {};
        const athlete_data = {};
        updateData.round = 3
        if(data.match_number === 1 ){
            updateData.match_number = 1
            athlete_data.athlete1_id = parseInt(el.id);
        }
        if(data.match_number === 2){
            updateData.match_number = 2
            athlete_data.athlete1_id = parseInt(el.id);
        }

        try {
            const matchWhere = await prisma.repechage.findFirst({
                where: {
                    comp_id: Number(data.comp_id),
                    match_number: Number(updateData.match_number),
                    kg: data.kg,
                    round: updateData.round
                }
            });
            if (matchWhere) {
                const response = await prisma.repechage.update({
                    where: {
                        id: matchWhere.id
                    },
                    data: athlete_data
                });
            }
            return res.status(200).json("response");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
 
    }
};

export const MatchWunnerFinal = async (req, res) => {
    const data = req.body.data;
    const el = req.body.el;

    if(data.round === 1){
        const updateData = {};
        const athlete_data = {};
        updateData.round = 2
        if(data.match_number === 1 ){
            updateData.match_number = 1
            athlete_data.athlete1_id = parseInt(el.id);
        }
        if(data.match_number === 2){
            updateData.match_number = 1
            athlete_data.athlete2_id = parseInt(el.id);
        }

        try {
            const matchWhere = await prisma.finals.findFirst({
                where: {
                    comp_id: Number(data.comp_id),
                    match_number: Number(updateData.match_number),
                    kg: data.kg,
                    round: updateData.round
                }
            });
            if (matchWhere) {
                const response = await prisma.finals.update({
                    where: {
                        id: matchWhere.id
                    },
                    data: athlete_data
                });
            }
            return res.status(200).json("response");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
 
    }
    if(data.round === 2){
        const updateData = {};
        const athlete_data = {};
        updateData.round = 3
        if(data.match_number === 1 ){
            updateData.match_number = 1
            athlete_data.athlete1_id = parseInt(el.id);
        }

        try {
            const matchWhere = await prisma.finals.findFirst({
                where: {
                    comp_id: Number(data.comp_id),
                    match_number: Number(updateData.match_number),
                    kg: data.kg,
                    round: updateData.round
                }
            });
            if (matchWhere) {
                const response = await prisma.finals.update({
                    where: {
                        id: matchWhere.id
                    },
                    data: athlete_data
                });
            }
            return res.status(200).json("response");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
 
    }
};


//zoon deer ylsan nohduudiig salgaj ylgaj hadgalj bga
export const MatchRepechage = async (req, res) => {
    const data = req.body.data;
    const winner = req.body.winner;
    const lose = req.body.lose;

    try {
        if(data.group === 'A'){
            const response = await prisma.repechage.findFirst({
                where: {
                    comp_id: data.comp_id,
                    kg: data.kg,
                    round: 1,
                    match_number: 1,
                },
            });
            if(response){
                const updated = await prisma.repechage.update({
                    where: {
                        id: response.id
                    },
                    data:{
                        athlete1_id: lose.id
                    }
                });
            }

            const winnerdata = await prisma.finals.findFirst({
                where: {
                    comp_id: data.comp_id,
                    kg: data.kg,
                    round: 1,
                    match_number: 1,
                },
            });
            if(winnerdata){
                const updated = await prisma.finals.update({
                    where: {
                        id: winnerdata.id
                    },
                    data:{
                        athlete1_id: winner.id
                    }
                });
            }
        }
        if(data.group === 'B'){
            const response = await prisma.repechage.findFirst({
                where: {
                    comp_id: data.comp_id,
                    kg: data.kg,
                    round: 1,
                    match_number: 1,
                },
            });
            if(response){
                const updated = await prisma.repechage.update({
                    where: {
                        id: response.id
                    },
                    data:{
                        athlete2_id: lose.id
                    }
                });
            }

            const winnerdata = await prisma.finals.findFirst({
                where: {
                    comp_id: data.comp_id,
                    kg: data.kg,
                    round: 1,
                    match_number: 1,
                },
            });
            if(winnerdata){
                const updated = await prisma.finals.update({
                    where: {
                        id: winnerdata.id
                    },
                    data:{
                        athlete2_id: winner.id
                    }
                });
            }
        }
        if(data.group === 'C'){
            const response = await prisma.repechage.findFirst({
                where: {
                    comp_id: data.comp_id,
                    kg: data.kg,
                    round: 1,
                    match_number: 2,
                },
            });
            if(response){
                const updated = await prisma.repechage.update({
                    where: {
                        id: response.id
                    },
                    data:{
                        athlete1_id: lose.id
                    }
                });
            }

            const winnerdata = await prisma.finals.findFirst({
                where: {
                    comp_id: data.comp_id,
                    kg: data.kg,
                    round: 1,
                    match_number: 2,
                },
            });
            if(winnerdata){
                const updated = await prisma.finals.update({
                    where: {
                        id: winnerdata.id
                    },
                    data:{
                        athlete1_id: winner.id
                    }
                });
            }
        }
        if(data.group === 'D'){
            const response = await prisma.repechage.findFirst({
                where: {
                    comp_id: data.comp_id,
                    kg: data.kg,
                    round: 1,
                    match_number: 2,
                },
            });
            if(response){
                const updated = await prisma.repechage.update({
                    where: {
                        id: response.id
                    },
                    data:{
                        athlete2_id: lose.id
                    }
                });
            }

            const winnerdata = await prisma.finals.findFirst({
                where: {
                    comp_id: data.comp_id,
                    kg: data.kg,
                    round: 1,
                    match_number: 2,
                },
            });
            if(winnerdata){
                const updated = await prisma.finals.update({
                    where: {
                        id: winnerdata.id
                    },
                    data:{
                        athlete2_id: winner.id
                    }
                });
            }
        }
        return res.status(200).json("response");
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }

};
