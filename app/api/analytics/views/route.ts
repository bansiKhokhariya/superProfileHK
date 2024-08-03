import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface AnalyticsData {
  t: string;
  visits: number;
}

interface FormattedAnalyticsData {
  t: string;
  visits: number;
}


export async function GET(req: NextRequest, res: NextResponse) {

  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get('handle');
    const filter = searchParams.get('filter');

    const endpoint = 'https://api.tinybird.co/v0/pipes/trend.json';

    if (!handle || typeof handle !== 'string') {
      return NextResponse.json({
        message: 'Handle type not valid'
      }, { status: 404 });
    }

    const response = await axios.get<{ data: AnalyticsData[] }>(
      `${endpoint}?token=${process.env.ANALYTICS_TOKEN}&date_from=2024-08-03&date_to=2024-08-03&handle=/${handle}`
    );

    const analytics = response.data;

    let analytics_formatted: FormattedAnalyticsData[];

    if (filter !== 'last_24_hours' && filter !== 'last_hour') {
      analytics_formatted = analytics.data.map(({ t, visits }: AnalyticsData) => ({
        t: formatDate(t),
        visits,
      }));
    } else {
      analytics_formatted = analytics.data.map(({ t, visits }: AnalyticsData) => ({
        t: formatTime(t),
        visits,
      }));
    }

    return NextResponse.json(
      { analytics_formatted: analytics_formatted },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}

function formatDate(dateStr: string): string {
  const dateObj = new Date(dateStr);
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const month = monthNames[dateObj.getMonth()];
  const day = dateObj.getDate();
  return `${month} ${day}`;
}

function formatTime(dateStr: string): string {
  const dateObj = new Date(dateStr);
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const amPM = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour clock
  return `${hours}:${minutes} ${amPM}`;
}


// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';

// interface AnalyticsData {
//   t: string;
//   visits: number;
// }

// interface FormattedAnalyticsData {
//   t: string;
//   visits: number;
// }

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const handle = searchParams.get('handle');
//     const filter = searchParams.get('filter');

//     if (!handle || typeof handle !== 'string') {
//       return NextResponse.json({
//         message: 'Handle type not valid',
//       }, { status: 404 });
//     }

//     // Calculate date range based on filter
//     const { dateFrom, dateTo } = calculateDateRange(filter);

//     const endpoint = 'https://api.tinybird.co/v0/pipes/trend.json';
//     const response = await axios.get<{ data: AnalyticsData[] }>(
//       `${endpoint}?token=${process.env.ANALYTICS_TOKEN}&date_from=${dateFrom}&date_to=${dateTo}&handle=${handle}`
//     );

//     const analytics = response.data;

//     const analytics_formatted: FormattedAnalyticsData[] = analytics.data.map(({ t, visits }: AnalyticsData) => ({
//       t: filter !== 'last_24_hours' && filter !== 'last_hour' ? formatDate(t) : formatTime(t),
//       visits,
//     }));

//     return NextResponse.json(
//       { analytics_formatted: analytics_formatted },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: "An error occurred", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// function calculateDateRange(filter: string | null) {
//   const today = new Date();
//   let dateFrom: string, dateTo: string;

//   switch (filter) {
//     case 'today':
//       dateFrom = formatDateForAPI(today);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'yesterday':
//       const yesterday = new Date(today);
//       yesterday.setDate(today.getDate() - 1);
//       dateFrom = formatDateForAPI(yesterday);
//       dateTo = formatDateForAPI(yesterday);
//       break;

//     case 'last_7_days':
//       const sevenDaysAgo = new Date(today);
//       sevenDaysAgo.setDate(today.getDate() - 7);
//       dateFrom = formatDateForAPI(sevenDaysAgo);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'last_24_hours':
//       const last24Hours = new Date(today);
//       last24Hours.setHours(today.getHours() - 24);
//       dateFrom = formatDateForAPI(last24Hours);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'last_30_days':
//       const thirtyDaysAgo = new Date(today);
//       thirtyDaysAgo.setDate(today.getDate() - 30);
//       dateFrom = formatDateForAPI(thirtyDaysAgo);
//       dateTo = formatDateForAPI(today);
//       break;

//     default:
//       // Default to today's date if filter is invalid or not provided
//       dateFrom = formatDateForAPI(today);
//       dateTo = formatDateForAPI(today);
//       break;
//   }

//   return { dateFrom, dateTo };
// }

// function formatDateForAPI(date: Date): string {
//   return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
// }

// function formatDate(dateStr: string): string {
//   const dateObj = new Date(dateStr);
//   const monthNames = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
//   ];
//   const month = monthNames[dateObj.getMonth()];
//   const day = dateObj.getDate();
//   return `${month} ${day}`;
// }

// function formatTime(dateStr: string): string {
//   const dateObj = new Date(dateStr);
//   let hours = dateObj.getHours();
//   const minutes = dateObj.getMinutes().toString().padStart(2, '0');
//   const amPM = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12 || 12; // Convert to 12-hour clock
//   return `${hours}:${minutes} ${amPM}`;
// }











// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';

// interface AnalyticsData {
//   timestamp: string;
//   action: string;
//   version: string;
//   session_id: string;
//   location: string;
//   referrer: string;
//   pathname: string;
//   href: string;
//   device: string;
//   browser: string;
// }

// interface FormattedAnalyticsData {
//   t: string; // Formatted time
//   visits: number; // Number of visits
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const handle = searchParams.get('handle');
//     const filter = searchParams.get('filter');

//     if (!handle || typeof handle !== 'string') {
//       return NextResponse.json(
//         {
//           message: 'Handle type not valid',
//         },
//         { status: 404 }
//       );
//     }

//     // Calculate date range based on filter
//     const { dateFrom, dateTo } = calculateDateRange(filter);

//     const endpoint = 'https://api.tinybird.co/v0/pipes/analytics_hits.json';
//     const response = await axios.get<{ data: AnalyticsData[] }>(
//       `${endpoint}?token=${process.env.ANALYTICS_TOKEN}&date_from=${dateFrom}&date_to=${dateTo}&handle=${handle}`
//     );

//     const data = response.data.data;

//     // Filter by handle and time range
//     const filteredData = data.filter(entry => entry.pathname === `/${handle}`);

//     // Count visits per time slot
//     const timeCounts = filteredData.reduce((acc, { timestamp }) => {
//       const timeSlot = formatTime(timestamp);
//       if (!acc[timeSlot]) {
//         acc[timeSlot] = 0;
//       }
//       acc[timeSlot]++;
//       return acc;
//     }, {} as Record<string, number>);

//     // Format data into the desired structure
//     const analytics_formatted: FormattedAnalyticsData[] = Object.entries(timeCounts).map(([t, visits]) => ({
//       t,
//       visits,
//     }));

//     return NextResponse.json(analytics_formatted, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: "An error occurred", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// function calculateDateRange(filter: string | null) {
//   const today = new Date();
//   let dateFrom: string, dateTo: string;

//   switch (filter) {
//     case 'today':
//       dateFrom = formatDateForAPI(today);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'yesterday':
//       const yesterday = new Date(today);
//       yesterday.setDate(today.getDate() - 1);
//       dateFrom = formatDateForAPI(yesterday);
//       dateTo = formatDateForAPI(yesterday);
//       break;

//     case 'last_7_days':
//       const sevenDaysAgo = new Date(today);
//       sevenDaysAgo.setDate(today.getDate() - 7);
//       dateFrom = formatDateForAPI(sevenDaysAgo);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'last_24_hours':
//       const last24Hours = new Date(today);
//       last24Hours.setHours(today.getHours() - 24);
//       dateFrom = formatDateForAPI(last24Hours);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'last_30_days':
//       const thirtyDaysAgo = new Date(today);
//       thirtyDaysAgo.setDate(today.getDate() - 30);
//       dateFrom = formatDateForAPI(thirtyDaysAgo);
//       dateTo = formatDateForAPI(today);
//       break;

//     default:
//       dateFrom = formatDateForAPI(today);
//       dateTo = formatDateForAPI(today);
//       break;
//   }

//   return { dateFrom, dateTo };
// }

// function formatDateForAPI(date: Date): string {
//   return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
// }

// function formatTime(dateStr: string): string {
//   const dateObj = new Date(dateStr);


// console.log("dateObj",dateObj);


//   if (isNaN(dateObj.getTime())) {
//     console.error("Invalid date format:", dateStr);
//     return "Invalid Date";
//   }

//   let hours = dateObj.getHours();
//   const minutes = dateObj.getMinutes().toString().padStart(2, '0');
//   const amPM = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12 || 12; // Convert to 12-hour clock
//   return `${hours}:${minutes} ${amPM}`;
// }


// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';

// interface AnalyticsData {
//   timestamp: string;
//   action: string;
//   version: string;
//   session_id: string;
//   location: string;
//   referrer: string;
//   pathname: string;
//   href: string;
//   device: string;
//   browser: string;
// }

// interface FormattedAnalyticsData {
//   t: string; // Formatted time
//   visits: number; // Number of visits
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const handle = searchParams.get('handle');
//     const filter = searchParams.get('filter');

//     if (!handle || typeof handle !== 'string') {
//       return NextResponse.json(
//         {
//           message: 'Handle type not valid',
//         },
//         { status: 404 }
//       );
//     }

//     // Calculate date range based on filter
//     const { dateFrom, dateTo } = calculateDateRange(filter);

//     const endpoint = 'https://api.tinybird.co/v0/pipes/analytics_hits.json';
//     const response = await axios.get<{ data: AnalyticsData[] }>(
//       `${endpoint}?token=${process.env.ANALYTICS_TOKEN}&date_from=${dateFrom}&date_to=${dateTo}&handle=${handle}`
//     );

//     const data = response.data.data;

//     // Filter by handle and time range
//     const filteredData = data.filter(entry => entry.pathname === `/${handle}`);

//     // Define all time slots
//     const allTimeSlots = generateAllTimeSlots();

//     // Count visits per time slot
//     const timeCounts: Record<string, number> = {};

//     filteredData.forEach(({ timestamp }) => {
//       const timeSlot = formatTime(timestamp);
//       if (!timeCounts[timeSlot]) {
//         timeCounts[timeSlot] = 0;
//       }
//       timeCounts[timeSlot]++;
//     });

//     // Create time slot data including missing slots
//     const analyticsByTime: FormattedAnalyticsData[] = allTimeSlots.map(timeSlot => ({
//       t: timeSlot,
//       visits: timeCounts[timeSlot] || 0,
//     }));

//     return NextResponse.json({
//       timeSlots: analyticsByTime
//     }, { status: 200 });

//   } catch (error: any) {
//     return NextResponse.json(
//       { message: "An error occurred", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// function calculateDateRange(filter: string | null) {
//   const today = new Date();
//   let dateFrom: string, dateTo: string;

//   switch (filter) {
//     case 'today':
//       dateFrom = formatDateForAPI(today);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'yesterday':
//       const yesterday = new Date(today);
//       yesterday.setDate(today.getDate() - 1);
//       dateFrom = formatDateForAPI(yesterday);
//       dateTo = formatDateForAPI(yesterday);
//       break;

//     case 'last_7_days':
//       const sevenDaysAgo = new Date(today);
//       sevenDaysAgo.setDate(today.getDate() - 7);
//       dateFrom = formatDateForAPI(sevenDaysAgo);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'last_24_hours':
//       const last24Hours = new Date(today);
//       last24Hours.setHours(today.getHours() - 24);
//       dateFrom = formatDateForAPI(last24Hours);
//       dateTo = formatDateForAPI(today);
//       break;

//     case 'last_30_days':
//       const thirtyDaysAgo = new Date(today);
//       thirtyDaysAgo.setDate(today.getDate() - 30);
//       dateFrom = formatDateForAPI(thirtyDaysAgo);
//       dateTo = formatDateForAPI(today);
//       break;

//     default:
//       dateFrom = formatDateForAPI(today);
//       dateTo = formatDateForAPI(today);
//       break;
//   }

//   return { dateFrom, dateTo };
// }

// function formatDateForAPI(date: Date): string {
//   return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
// }

// function generateAllTimeSlots(): string[] {
//   const slots = [];
//   for (let hour = 0; hour < 24; hour++) {
//     const time = new Date();
//     time.setHours(hour, 0, 0, 0);
//     const formattedTime = formatTime(time.toISOString());
//     slots.push(formattedTime);
//   }
//   return slots;
// }

// function formatTime(dateStr: string): string {
//   const dateObj = new Date(dateStr);
//   if (isNaN(dateObj.getTime())) {
//     console.error("Invalid date format:", dateStr);
//     return "Invalid Date";
//   }

//   let hours = dateObj.getHours();
//   const minutes = dateObj.getMinutes().toString().padStart(2, '0');
//   const amPM = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12 || 12; // Convert to 12-hour clock
//   return `${hours}:${minutes} ${amPM}`;
// }

