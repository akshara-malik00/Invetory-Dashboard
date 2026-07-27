import './Analytics.css'; 
import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Pie, Line} from "react-chartjs-2" 
export function Analytics (){
    return(
        <div className="Analytics">
            <h2>Analytics Overview</h2>
            <p>Real-time performance metrics and inventory forecasting</p> 
            <div className="mainone"> 
                <div className='linegraph'></div>
                <div className='piegraph'></div>
            </div>
            <div className="maintwo">
                <div className='barGraph'></div>
            </div>
        </div>
    ); 
}