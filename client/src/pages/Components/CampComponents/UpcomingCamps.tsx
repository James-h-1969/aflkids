import { useEffect, useState } from "react";
import Campbox from "./Campbox";
// import useMediaQueries from "media-queries-in-react";
import { backendLink } from "../../../globalVar";

type CampType = {
  name: string,
  ages: String,
  date: String,
  times: String,
  Price: Number,
  Location: String,
  address:String,
  locPic:string,
  kidsDay1: Array<Object>,
  kidsDay2: Array<Object>,
  archived: boolean,
}

function UpcomingCamps() {
  const [camps, setCamps] = useState<CampType[]>([]);
  
  useEffect(() => {
    async function fetchCamps() {
      const response = await fetch(`${backendLink}/camps`);
      const newCamps = await response.json();
      let activeCamps: CampType[] = [];
      for (let i = 0; i < newCamps.length; i++){ //only show the camps that havnt been archived
        if (!newCamps[i].archived){
          activeCamps.push(newCamps[i]);
        }
      }
      setCamps(activeCamps);
    }
    fetchCamps();
  }, [])

  //"https://aflkids-backend.onrender.com/camps";


  // const mediaQueries = useMediaQueries({ 
  //   mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
  // });

  return (
      <div className="p-5">
          {camps.map((value, index) => (
            <Campbox Location={value.Location} name={value.name} ages={value.ages} date={value.date} times={value.times} Price={value.Price} address={value.address} locPic={value.locPic} index={index}/>
          ))}
      </div>
  );
}

export default UpcomingCamps;
