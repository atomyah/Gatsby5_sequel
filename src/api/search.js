import { createClient } from 'microcms-js-sdk';

export default async function formHandler(req, res) {
   const keyword = req.query.keyword;
   //const keyword = "アクトリオン星系";

    const client = createClient({
        serviceDomain: "yah-space-work",
        apiKey: process.env.MICROCMS_APIKEY,
    });

    const response = await client
        .get({
            endpoint: 'information',
            queries: {
              q: decodeURI(keyword)
            },
        })
        return res.status(200).json(response)
}
