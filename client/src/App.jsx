import "./App.css";
import Heading from "./components/heading";
import { Transactions } from "./components/transactions";
import { Stats } from "./components/stats";
import { Piechart } from "./components/piechart";
import { Barchart } from "./components/barchart";
import { useState, useEffect } from "react";
import { combinedStatsUrl } from "./services/path";
import apiConnector from "./services/apiConnector";
import months from "./utils/months";


function App() {
  //states
  const [month, setMonth] = useState("");
  const [stats, setStats] = useState({});
  const [piechart, setPieChart] = useState([]);
  const [barchart, setBarChart] = useState([]);
  const [loading , setLoading] = useState(false);



  function convertBardata(bardata) {
    let keys = [];
    let values = []
    for (let data in bardata){
        keys.push(data);
        values.push(bardata[data])
    }
    // console.log(keys,values);
    return {
      keys,
      values
    }
  }

  function convertPierchartdata(piechartdata){
    let data = [];
    piechartdata.map( (piedata, index ) => {
      data.push({
        "id": index,
        "value": piedata.itemCount,
        "label": piedata.category
      })
    });
    console.log("logginf piedata");
    console.log(data);
    return data ;
  }
  // api call
  async function fetchCombinedStats(){
    setLoading(true);
    try {
      const response = await apiConnector.get( `${combinedStatsUrl}?month=${month}`);
      setStats(response.data.stats);
      let convertedbardata;
      convertedbardata = convertBardata(response.data.barChartData);
      setBarChart(convertedbardata);
      setPieChart(() => ( convertPierchartdata(response.data.pieChartData)));
      console.log(response);
    } catch (err) {
      console.log("Error while fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  }

  //useffect 
  useEffect( () => {
    fetchCombinedStats();
  },[month])


  return (
    <main className="w-[100vw] h-auto  flex flex-col  gap-y-32 py-4 ">
      <div>
        <Heading/>
      </div>

      <div className = "">
        <Transactions month={month} setMonth={setMonth}/>
      </div>

      <div>
        <Stats month={month}  stats={stats}  loading={loading}/>
      </div> 

      <div>
        <Barchart month={month} loading={loading} barchart={barchart} />
      </div>

      <div>
        <Piechart month={month}  piechart={piechart} loading={loading}/>
      </div>

    </main>
  );
}

export default App;
