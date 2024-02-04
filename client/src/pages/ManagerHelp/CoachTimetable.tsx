import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { backendLink, times, daysOfWeek } from "../../globalVar";
import { Coach } from "../../types/coachType";

type coachTimetableType = {
    coach?: Coach
}

type LocationState = {
    [key: string]: boolean;
  };

export default function CoachTimetable({coach}: coachTimetableType){  
    const [weekArray, setWeekArray] = useState<Array<Array<Boolean>>>([
        [false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false]
      ]);
    const [locations, setLocation] = useState<LocationState>({
        "Northern Beaches": false,
        "North Shore": false,
    })


    // function to update location correctly
    function updateLocation(loc:string){
        setLocation(locations => ({
            ...locations,
            [loc]: !locations[loc],
        }));
    }

    function updateGrid(row: number, col: number){
        const updatedArray = [...weekArray]; // Create a shallow copy of the array
        updatedArray[row][col] = !weekArray[row][col]; // Update the specific value
        setWeekArray(updatedArray);
    }

    // Get the current availabilities for the week
    useEffect(() => {
        if (coach?.weekAvailabilities){
            setWeekArray(coach?.weekAvailabilities);
            setLocation(coach?.locations);
        }
    }, [])

    // function to change the current availabilities of the week
    async function changeAvailabilities(){
        const update = {name_: coach?.name, available_:weekArray, locs_:locations};
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if required
              },
            body: JSON.stringify(update),
        };
        fetch(`${backendLink}/CoachsetAvailable`, requestOptions);
        location.reload();
    }

    return(
        <>
            <div className="d-flex justify-content-center" style={{width:"100%", fontWeight:"bold", color:"black"}}>Change Availabilities</div>
            <div className="d-flex justify-content-around">
                {daysOfWeek.map((day, index) => (
                <>
                <div key={index}>
                    {day}
                    {times.map((time, j) => (
                        <>
                        {index < new Date().getDay()?
                          <div style={{fontSize:"11px", color:"red"}} key={j}>{time}</div>
                          :
                          <div key={j} style={{fontSize:"11px", cursor:"pointer", color:weekArray[index]?.[j] ? "green": "red"}} onClick={() => {updateGrid(index, j)}} >{time}</div>}
                        </>
                    ))}
                </div>
                </>
                ))}
            </div>
            <div className="d-flex justify-content-center">
                <Button className="mt-4 d-flex justify-content-center" style={{backgroundColor:"green"}} onClick={() => changeAvailabilities()}>Update Week</Button>
            </div>
            <div className="d-flex justify-content-around mt-4">
            {Object.entries(locations).map(([key, value]) => (
                <div onClick={() => updateLocation(key)} key={key} style={{backgroundColor: value ? "green":"red", width:"140px",  borderRadius:"10px", textAlign:"center", padding:"3px", cursor:"pointer"}}>
                    {key}
                </div>
            ))}
                
            </div>
            
        </>
    )
}
