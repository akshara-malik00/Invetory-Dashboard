import './Analytics.css'; 
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