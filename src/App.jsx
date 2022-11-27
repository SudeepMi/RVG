import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [labels, setLabels] = useState("");
  const [Distribution, setDistribution] = useState("exp");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution Graph",
      },
    },
  };
  const [a, b] = [3, 5];

  // let labels = [0.1306, 0.422, 0.6597, 0.7965, 0.7696];
  // for (let index = 0; index < 10; index++) {
  //   labels[index] = Math.random().toPrecision(5)
  // }
  // labels = labels.sort((a,b)=>b-a)

  const functionProvider = (r) =>{
     if(Distribution==="exp"){
      return -Math.log(1 - r).toPrecision(5)
     }
     if(Distribution==="uniform"){
      return (a+(b-a)*r).toPrecision(5)
     }
     if(Distribution==="triangular"){
      if(r<=0.5){
        return Math.sqrt(2*r).toFixed(5)
      }
      if(r>0.5){
        return (2 - Math.sqrt(2*(1-r))).toFixed(5)
      }
     }
  }



  const data = {
    labels: labels.split(","),
    datasets: [
      {
        label: "Random Variate",
        data: labels.split(",").map((l) => functionProvider(l)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: `Random Number`,
        data: labels.split(","),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const GenerateRandomNumber = () => {
    let _labels = [];
    for (let index = 0; index < 10; index++) {
      _labels[index] = Math.random().toPrecision(5);
    }
    _labels = _labels.sort((a, b) => a - b).join(",");
    setLabels(_labels);
  };

  const handleChange = (e) => {
    setLabels(e.target.value);
  };

  return (
    <div className="App">
      <div className="wrap">
        <div className="form">
          <h3>Random Variate Calculator</h3>
          <hr />
          <div className="dis_selector">
            <div>
              <input
                type={"radio"}
                value="exponential"
                name="distribution"
                id="exp"
                checked={Distribution=="exp"}
                onChange={() =>
                  setDistribution("exp")
                }
              />
              <label htmlFor="exp">Exponential</label>
            </div>
            <div>
              <input
                type={"radio"}
                value="uniform"
                name="distribution"
                id="uni"
                onChange={() =>
                  setDistribution("uniform")
                }
              />
              <label htmlFor="uni">Uniform</label>
            </div>
            <div>
              <input
                type={"radio"}
                value="trianglar"
                name="distribution"
                id="tri"
                onChange={() =>
                  setDistribution("triangular")
                }
              />
              <label htmlFor="tri">Triangular</label>
            </div>
            <div>
              <input
                type={"radio"}
                value="weibull"
                name="distribution"
                id="wei"
                onChange={() =>
                  setDistribution("weibull")
                }
              />
              <label htmlFor="wei">Weibull</label>
            </div>
          </div>
          <div className="btn-area">
            <button onClick={() => GenerateRandomNumber()}>
              Generate Random Number
            </button>
            <div className="input_area">
              <textarea
                rows={3}
                value={labels}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {
              labels && <>
               <h4 style={{margin:0,padding:0}}>Solution</h4><hr/>
               { Distribution==="exp" && <p>X<sub>i</sub> = -1/λ ln(1-R<sub>i</sub>)</p> }
               { Distribution==="uniform" && <p>X<sub>i</sub> = a + (b - a)R<sub>i</sub></p> }
               { Distribution==="triangular" && <p>{`X = ( 0 < R <= 0.5) && √2R `}<br/>
               {`X = ( 0.5 < R <= 1) && 2 - √2 (1 - R)`}</p> }
               <p>{Distribution==="exp" && "Assuming: λ = 1" }</p>
            <p>{Distribution==="uniform" && "Assuming: [a,b] = [3,5]" }</p>
            <div style={{textAlign:"left"}}>
              {
                labels.split(",").map((rn,key)=>{
                  return <p key={key}>For <span className="a">{rn}</span>, X<sub>{key+1}</sub> = <span className="b">{functionProvider(rn)}</span></p>
                })
              }
            </div>
              </>
            }
          </div>
        </div>
        <div className="graph">
          <div className="graphContainer">
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
