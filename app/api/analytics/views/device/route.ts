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

interface DeviceVisits {
    device: string;
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

        // Count visits by device
        const deviceCounts: Record<string, number> = {};
        filteredData.forEach((entry) => {
            const device = entry.device;
            if (deviceCounts[device]) {
                deviceCounts[device]++;
            } else {
                deviceCounts[device] = 1;
            }
        });

        // Convert to desired format
        const deviceVisits: DeviceVisits[] = Object.entries(deviceCounts).map(
            ([device, visits]) => ({ device, visits })
        );
        return NextResponse.json(deviceVisits, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'An error occurred', error: error.message },
            { status: 500 }
        );
    }
}

