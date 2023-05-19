import type { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../lib/db'

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
){
    try{
        if(req.method === 'GET'){ // GETのとき
            const users = await excuteQuery({
                query: `SELECT * FROM users;`,
                values: [],
            })

            res.status(200).json({ users: users })
        }else{ //POSTのとき
            
        }
    }catch(error){
        console.log(error)
    }
}