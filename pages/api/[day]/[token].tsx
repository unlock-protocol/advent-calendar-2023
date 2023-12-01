import type { NextApiRequest, NextApiResponse } from 'next'
import { AppConfig } from '../../../lib/AppConfig'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.query)
  // Ok so we have the day and the token
  // We need to render the metadata!
  res.status(200).json({
    "description": AppConfig.description, 
    "external_url": AppConfig.siteUrl, 
    "image": `${AppConfig.siteUrl}/images/nft/${req.query.day}.png`, 
    "name": `Unlock Protocol Advent Calendar - Day ${req.query.day} - Token ${req.query.token}`,
    "attributes": [  ]
  })
}