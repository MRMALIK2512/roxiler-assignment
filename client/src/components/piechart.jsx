import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect } from "react";

export const Piechart = (props) => {
  const piechart = props.piechart;
  const currMonth = props.month;
  const loading = props.loading;

  useEffect(() => {
    console.log(piechart);
  }, [piechart]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center ">Loading...</div>
    );
  }

  if (!piechart) {
    return (
      <div className="w-full flex justify-center items-center ">
        Invalid data for Piechart
      </div>
    );
  }

  return (
    <div className="w-[90%] flex flex-col justify-center items-center  px-5 py-10 gap-y-8 rounded-xl mx-auto bg-blue-200">
      <div className="  flex font-extrabold text-4xl place-self-center items-center  justify-center overflow-hidden">
        <h2 className="overflow-hidden">Pie Chart Data </h2>-
        {  currMonth ? (<h2>{currMonth.toUpperCase()}</h2>) : (<h2> OVERALL</h2>)}
      </div>

      <PieChart
        series={[
          {
            data: piechart,
          },
        ]}
        width={1000}
        height={600}
      />
    </div>
  );
};
