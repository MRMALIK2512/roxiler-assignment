import React from 'react'
import {useEffect} from 'react'

export const Stats = (props) => {
    const currMonth = props.month;
    const stats = props.stats;
    const loading = stats.loading;
    

    useEffect( () => {
        console.log(stats);
    },
    [stats])


    if(loading) {
        return <div className = "w-full flex justify-center items-center "> Loading... </div>
    }
  return (
    <div className = "w-full flex justify-center items-center ">
        <div className = "w-[50%] border border-gray-400 flex py-10 px-6 flex-col gap-y-5 rounded-xl">
                <div className = "flex font-extrabold text-2xl">
                    <h2 >
                    Statistics
                    </h2>
                    -
                  
                    {
                      currMonth ? (<h2>{currMonth.toUpperCase()}</h2>) : (<h2> OVERALL</h2>)
                    }
         
                </div>
                <div className = "bg-red-200 px-8 py-8 w-content rounded-xl text-xl ">
                    <p><span className = "font-bold">Total sale</span> : {stats?.totalSaleAmount}</p>
                    <p><span className = "font-bold">Total sold items</span> : {stats?.totalSoldItems}</p>
                    <p><span className = "font-bold">Total unsold items</span> : {stats?.totalUnsoldItems}</p>
                </div>
        </div>
        
    </div>
  )
}
