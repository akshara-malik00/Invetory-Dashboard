import mac from '../assets/mac.png'; 
import iphone from '../assets/iphone.png';
import ipad from '../assets/ipad.png';
import './ProductUpdates.css'; 

function UpdateItem({img, title, subtitle, time}){
    return(
        <div className="updateItem">
            <img src={img} alt={title}></img>
            <div className="title">
                <h2>{title}</h2>
                <h4>{subtitle}</h4>
            </div>
            <p>{time}</p>
        </div>

    );
}


export function ProductUpdates (){
    return(
        <div className="updateTable">
        <div className='heading'>
            <h3>Recent Product Updates</h3>
            <a href="">View All</a>
        </div>
        <div className='updatecontent'>
        <UpdateItem img={mac} title="MacBook" subtitle="Stock Updated: +25 Units" time="2 mins ago"  />
        <UpdateItem img={iphone} title="IPhone" subtitle="Price Modified:$245 -> $229" time="45 mins ago"  />
        <UpdateItem img={ipad} title="IPad" subtitle="Status changed to SOLD OUT" time="1 hour ago" />
        </div>
        </div>
    );
}