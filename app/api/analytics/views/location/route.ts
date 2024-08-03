// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest, res: NextResponse) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const handle = searchParams.get('handle');
//         const endpoint = 'https://api.tinybird.co/v0/pipes/top_locations.json';

//         if (!handle || typeof handle !== 'string') {
//             return NextResponse.json({
//                 message: 'Handle type not valid'
//             }, { status: 404 });
//         }

//         const response = await axios.get(
//             `${endpoint}?limit=50&token=${process.env.ANALYTICS_TOKEN}`
//         );

//         return NextResponse.json(
//             { analytics: response.data.data },
//             { status: 200 }
//         );
//     } catch (error: any) {
//         console.log("Error fetching analytics:", error.message);
//         return NextResponse.json(
//             { message: "An error occurred", error: error.message },
//             { status: 500 }
//         );
//     }
// }


import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface AnalyticsData {
    timestamp: string;
    action: string;
    version: string;
    session_id: string;
    location: string;
    referrer: string;
    pathname: string;
    href: string;
    device: string;
    browser: string;
}

interface LocationVisits {
    location: string;
    visits: number;
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const { searchParams } = new URL(req.url);
        const handle = searchParams.get('handle');
        const endpoint = 'https://api.tinybird.co/v0/pipes/analytics_hits.json';
        if (!handle || typeof handle !== 'string') {
            return NextResponse.json(
                {
                    message: 'Handle type not valid',
                },
                { status: 404 }
            );
        }
        const response = await axios.get<{ data: AnalyticsData[] }>(
            `${endpoint}?token=${process.env.ANALYTICS_TOKEN}`
        );
        const analyticsData = response.data.data;
        // Filter data for the specific handle
        const filteredData = analyticsData.filter(
            (entry) => entry.pathname === `/${handle}`
        );
        // Count visits by location
        const locationCounts: Record<string, number> = {};
        filteredData.forEach((entry) => {
            const location = entry.location;
            if (locationCounts[location]) {
                locationCounts[location]++;
            } else {
                locationCounts[location] = 1;
            }
        });
        // Convert to desired format for locations
        const locationVisits: LocationVisits[] = Object.entries(locationCounts).map(
            ([location, visits]) => ({ location, visits })
        );
        return NextResponse.json(locationVisits, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'An error occurred', error: error.message },
            { status: 500 }
        );
    }
}
