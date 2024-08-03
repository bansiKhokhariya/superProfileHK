// import React from 'react'

// const Analytics = () => {
//   return (
//     <div className='w-full flex justify-center items-center'>
//       <div className='w-1/2 flex flex-col gap-5'>
//         <div className='bg-white p-5 rounded-xl flex flex col'>
//           <h1 className="text-2xl font-bold mb-5">Top performing links</h1>
//         </div>
//         <div className='bg-white p-5 rounded-xl flex flex col'>
//           <h1 className="text-2xl font-bold mb-5">Top performing Social Connect</h1>
//         </div>
//       </div>
//     </div>
//   )
// }


import Chart from '@/components/Analytics/bar-chart';
import Select from 'react-select';
import useAnalytics from '@/hooks/useAnalytics';
import { useState } from 'react';
import { LocationStats } from '@/components/Analytics/location-stats';
import { DeviceStats } from '@/components/Analytics/device-stats';
import useLocationAnalytics from '@/hooks/useLocationAnalytics';
import useDeviceAnalytics from '@/hooks/useDeviceAnalytics';

export function Analytics(currentUser) {

  const options = [
    { value: 'last_hour', label: 'Last hour' },
    { value: 'last_24_hours', label: 'Last 24 hours' },
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
  ];

  const [filter, setFilter] = useState('last_hour');

  const { data: visitAnalytics } = useAnalytics(filter, currentUser?.currentUser?.handle);
  const { data: locationAnalytics } = useLocationAnalytics(currentUser?.currentUser?.handle);
  const { data: deviceAnalytics } = useDeviceAnalytics(currentUser?.currentUser?.handle);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="w-1/2 pl-4 pr-4 overflow-auto">
        <h3 className="text-xl font-semibold">Analytics</h3>
        <div className='flex justify-end'>
          <Select
            onChange={(option) => setFilter(option.value)}
            className="w-[170px]"
            defaultValue={options[0]}
            options={options}
          />
        </div>
        <Chart analytics={visitAnalytics} />
        <DeviceStats analytics={deviceAnalytics} />
        <LocationStats analytics={locationAnalytics} />
      </div>
    </div>
  );
}

export default Analytics