import { useState, useEffect } from "react";
import { getStartOfWeek, addDaysToDate } from "../../functions/getDates";
import "../Components.css";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import useMediaQueries from "media-queries-in-react";
import { ColourScheme, backendLink, daysOfWeek } from "../../../globalVar";
import { Coach } from "../../../types/coachType";
import ChooseDetails from "./ChooseDetails";

type PrivateTimetableProps = {
    showTypes: (show:boolean) => void;
    step2: (date:string, time:string, coach:string) => void;
    location: string;
}

const MAX_WEEKS = 5;

function PrivateTimetable({showTypes, step2, location}:PrivateTimetableProps){
    const [currentCoaches, setCurrentCoaches] = useState<Array<Coach>>([]);

    const [startDate, setStartDate] = useState<Date>(getStartOfWeek(new Date()));
    const [endDate, setEndDate] = useState<Date>(addDaysToDate(startDate, 6));

    const [weekIndex, setWeekIndex] = useState(0);

    const [isShowingDate, setShowingDate] = useState(false);
    const [valueOfDateShowing, setValueOfDateShowing] = useState(new Date())

    // useEffect so that the coaches are found immediately
    useEffect(() => {
        async function findCoaches(){
            let response = await fetch(`${backendLink}/Coaches`);
            let coaches = await response.json();
            coaches = coaches.filter((val:Coach) => val.locations[location])
            console.log(coaches);
            setCurrentCoaches(coaches);
        }
        findCoaches();
        setShowingDate(false)
    }, [location]);

    // function to change what week the client is looking at
    function changeWeekIndex(change:number){
        if (weekIndex + change < 0 || weekIndex + change >= MAX_WEEKS){
            return
        }
        setStartDate(addDaysToDate(startDate, change * 7))
        setEndDate(addDaysToDate(endDate, change * 7))
        setWeekIndex(weekIndex + change);
    }

    function getAnyTimes(index: number){
        for (const val of currentCoaches) {
            if (val.weekAvailabilities[index].some((value) => value)) {
                console.log(index);
                return true;
            }
        }
        return false;
    }

    // function that sets the date from the user clicking on a specific index 
    function chooseDateFromArrayIndex(index: number){
        let newDate = addDaysToDate(startDate, index);
        if (newDate == valueOfDateShowing){
            setShowingDate(false);
        } else {
            setShowingDate(true);
            setValueOfDateShowing(newDate);
        }
    }

    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
    });

    return (
        <>
            <div className='private-timetable-box p-4 justify-content-between text-center' style={{display:mediaQueries.mobile?"":"flex", margin:mediaQueries.mobile?"20px":"40px"}}>
            <div className="timetable-box d-flex flex-column pb-5" style={{width: mediaQueries.mobile?"80%":"50%"}}>
                <div className="d-flex justify-content-around">
                    <div><ArrowLeft style={{cursor:"pointer"}} onClick={() => changeWeekIndex(-1)}/>         {startDate.toDateString()}</div>
                    <div>{endDate.toDateString()}       <ArrowRight style={{cursor:"pointer"}} onClick={() => changeWeekIndex(1)}/></div>
                </div>
                <div className="weekday d-flex justify-content-around" style={{height:"60px"}}>
                    {daysOfWeek.map((day, index) => (
                        <div>
                        <div className=" pb-4 mt-3 text-center text-muted" key={index}>{day}</div>
                        {
                            getAnyTimes(index) ? <span className="p-2" style={{fontWeight:"bold", backgroundColor:ColourScheme.defaultColour, color:"white", borderRadius:"15px", cursor:"pointer"}} onClick={() => chooseDateFromArrayIndex(index)}>Select Time</span>:<></>
                        }
                        </div>
                    ))}

                </div>
                {
                    isShowingDate ? <ChooseDetails date={valueOfDateShowing} coaches={currentCoaches} showTypes={showTypes}/>:<></>
                }

            </div>
            <div className="pe-3 border-left">
                    <h1><span className='text-end  fs-0.3'>Step 2: Pick Dates and Times</span></h1>
               </div>            
            </div>           
        </>
        
      );
}


export default PrivateTimetable