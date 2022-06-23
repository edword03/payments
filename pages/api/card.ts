import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../lib/mongodb'
import {v4} from 'uuid'

type Data = {
  requestId: string
  amount: number
}

export default function cardPay(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    return addNewCard(req, res)
  }
}

async function addNewCard(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const {db} = await connectToDatabase()

    await db.collection('posts').insertOne(JSON.parse(req.body));

    return res.json({
      requestId: v4(),
      amount: req.body.amount
    });
  } catch (error) {
    throw new Error(String(error))
  }
}