import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).end();
//   }

//   try {
//     const {handle} = req.query;
//     const endpoint =
//       'https://api.tinybird.co/v0/pipes/libre_location_tracking.json';

//     if (!handle || typeof handle !== 'string') {
//       return res.status(404).end();
//     }

//     const analytics = await axios.get(
//       `${endpoint}?token=${process.env.LOCATION_ANALYTICS_TOKEN}&handle=/${handle}`
//     );

//     return res.status(200).json(analytics.data.data);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).end();
//   }
// }


export async function GET(req: NextRequest, res: NextResponse) {

    console.log('in api location');
    try {
        const { searchParams } = new URL(req.url);
        const handle = searchParams.get('handle');


        const endpoint = 'https://api.us-east.tinybird.co/v0/pipes/top_locations.json';

        if (!handle || typeof handle !== 'string') {
            return NextResponse.json({
                message: 'Handle type not valid'
            }, { status: 404 });
        }

        const analytics = await axios.get(
            `${endpoint}?token=${process.env.LOCATION_ANALYTICS_TOKEN}&handle=/${handle}`
          );
        
        return NextResponse.json({
            analytics
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "An error occurred", error: error.message },
            { status: 500 }
        );
    }
}