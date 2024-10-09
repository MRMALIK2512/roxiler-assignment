import React from 'react'
import { useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

export const Barchart = (props) => {
    const barchart = props.barchart;
    const currMonth = props.month;
    const loading = props.loading;

    useEffect( () => {
        // console.log(barchart);
    } , [barchart]);

    if(loading) {
        return (<div className = "w-full flex justify-center items-center ">
            Loading...
        </div>)
    }

    if (!barchart || !Array.isArray(barchart.keys) || !Array.isArray(barchart.values)) {
        return (
            <div className="w-full flex justify-center items-center ">
                Invalid data for BarChart
            </div>
        );
    }

  return (
    <div className = "w-[95%] flex flex-col justify-center items-center rounded-xl mx-auto bg-blue-200 px-5 py-10 ">
               <div className = "flex font-extrabold text-4xl overflow-hidden">
                    <h2 className='overflow-hidden'>Bar Chart Data</h2>
                    -
                    {
                    currMonth ? (<h2>{currMonth.toUpperCase()}</h2>) : (<h2> OVERALL</h2>)
                    }
                </div>
    <div>
    <BarChart
      xAxis={[
        {
          id: 'Ranges',
          data: barchart.keys,
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: barchart.values,
        },
      ]}
      width={1000}
      height={500}
    />
    </div>
    </div>
  )
}
