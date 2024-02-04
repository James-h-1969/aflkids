import { Coach } from "../../types/coachType"
import { useState } from "react"

type coachLocationType = {
    coach?: Coach
}

type LocationState = {
    [key: string]: boolean;
  };

export default function CoachTimetable({coach}: coachLocationType){  
    const [location, setLocation] = useState<LocationState>({
        "Northern Beaches": false,
        "North Shore": false,
    })

    // function to update location correctly
    function updateLocation(loc:string){
        setLocation(location => ({
            ...location,
            [loc]: !location[loc],
          }));
    }

    return (
        <>
        <div className="d-flex justify-content-around mt-4">
            {Object.entries(location).map(([key, value]) => (
                <div onClick={() => updateLocation(key)} key={key} style={{backgroundColor: value ? "green":"red", width:"140px",  borderRadius:"10px", textAlign:"center", padding:"3px", cursor:"pointer"}}>
                    {key}
                </div>
            ))}
            
        </div>
        </>
    )
}