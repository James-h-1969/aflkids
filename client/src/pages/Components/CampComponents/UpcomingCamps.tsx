import { useEffect, useState } from "react";
import Campbox from "./Campbox";
import useMediaQueries from "media-queries-in-react";

type CampType = {
  name: string,
  ages: String,
  date: String,
  times: String,
  Price: Number,
  Location: String,
  address:String,
  locPic:string,
}

function UpcomingCamps() {
  const [camps, setCamps] = useState<CampType[]>([]);
  
  useEffect(() => {
    async function fetchCamps() {
      const response = await fetch("https://aflkids-backend.onrender.com/camps");
      const newCamps = await response.json();
      setCamps(newCamps);
    }
    fetchCamps();
  }, [])

  //"https://aflkids-backend.onrender.com/camps");


  const mediaQueries = useMediaQueries({ 
    mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
  });

  return (
      <div className="pb-2 mb-5" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"20px", paddingLeft:mediaQueries.mobile?"0px":"30px", marginTop:mediaQueries.mobile?"30px":"100px",paddingTop:mediaQueries.mobile?"15px":"30px", marginLeft:mediaQueries.mobile?"30px":"50px", marginRight:mediaQueries.mobile?"30px":"50px"}}>
        <div className="mt-3">
            <span className="fs-1" style={{fontFamily:"Rubik", fontWeight:"bold", paddingLeft:mediaQueries.mobile?"20px":"40px"}}>Upcoming Camps</span>
            {camps.map((value, index) => (
              <Campbox Location={value.Location} name={value.name} ages={value.ages} date={value.date} times={value.times} Price={value.Price} address={value.address} locPic={value.locPic} index={index}/>
            ))}
        </div>
      </div>
  );
}

export default UpcomingCamps;
