import type { NextApiRequest, NextApiResponse } from 'next'
import { AppConfig } from '../../../lib/AppConfig'
 
type ResponseData = {
  description: string
  external_url: string
  image: string
  name: string
  attributes: any[]

}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({
    "description": AppConfig.description, 
    "external_url": AppConfig.siteUrl, 
    "image": `${AppConfig.siteUrl}/images/nft/${req.query.day}.png`, 
    "name": `Unlock Protocol Advent Calendar - Day ${req.query.day} - Token ${req.query.token}`,
    "attributes": [    ]
  })
}