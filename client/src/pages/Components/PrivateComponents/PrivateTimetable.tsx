import { useState, useEffect } from "react";
import { getDates, getMonthName, getMonthNum, getYear, getCurrentDayNum } from "../../functions/getDates";
import "../Components.css";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import useMediaQueries from "media-queries-in-react";
import { ColourScheme } from "../../../globalVar";

type PrivateTimetableProps = {
    showTypes: (show:boolean) => void;
    step2: (date:string, time:string, coach:string) => void;
    location: string;
}

function PrivateTimetable({showTypes, step2, location}:PrivateTimetableProps){
    const [timetableState, settimetableState] = useState([-1,-1]);
    const [isCurrentMonth, setisCurrentMonth] = useState(true);
    const [timetableDates, setTimetableDates] = useState(getDates(isCurrentMonth));
    const [currentTimes, setCurrentTimes] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedCoach, setSelectedCoach] = useState("");
    const [availableDates, setAvailableDates] = useState({});
    const [currentCoaches, setCurrentCoaches] = useState<string[]>([]);
 
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    const colorsList = [
        "#77A6CC", // Light Blue
        "#5C8DBF", // Sky Blue
        "#46768E", // Steel Blue (base color)
        "#345E82", // Deep Blue
        "#1F4875", // Sapphire Blue
        "#153B68", // Royal Blue
        "#0B285C"  // Navy Blue
      ];
      


    const handleClick = (week:number, day:number) => {
        showTypes(false);
        let dateChosen = parseInt(timetableDates[week][day][0]);
        if (dateChosen <= getCurrentDayNum() && isCurrentMonth){
            settimetableState([-1, -1]);
            return;
        }
        let datesAvailable = Object.keys(availableDates);
        let toSet = false;
        datesAvailable.forEach((date) => {
            let brokenDate = date.split("/");
            let monthdays = isCurrentMonth ? getMonthNum() : getMonthNum() + 1;
            if (parseInt(brokenDate[0]) == dateChosen && monthdays == parseInt(brokenDate[1])) {
                toSet = true;
            } 
        })  
        if (toSet){
            let newCoords = [week, day];
            settimetableState(newCoords);
            getTimes(day, week);
            return
        }     
        settimetableState([-1, -1]);
        setSelectedTime("");
    }

    function changeMonth(){
        let nextState = !isCurrentMonth;
        setisCurrentMonth(nextState);
        let newDates = getDates(nextState);
        setTimetableDates(newDates);
        settimetableState([-1, -1]);
        setSelectedTime("");
        showTypes(false);
    }

    function getDate(){
        if (timetableState[0] == -1){
            return "";
        }
        let date = timetableDates[timetableState[0]][timetableState[1]][0];
        let month = isCurrentMonth ? getMonthNum().toString(): (getMonthNum() + 1).toString();
        return `${date}  /  ${month} / 2023`;
    }

    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
    });

    type CoachType = {
        name: string,
        dates: Array<string>,
        times: Array<string>,
        location: string
    }

    // type CoachTimes = {
    //     times: Array<string>
    // }

    interface CoachObject {
        Coachname: string[];
        CoachTimes: string[];
      }

    useEffect(() => {
        async function fetchCoaches() {
          const response = await fetch("https://aflkids-backend.onrender.com/PrivateTimes");
          const newCoaches = await response.json();
          const datesFree: {[date:string]: CoachObject } = {};
            newCoaches.forEach((value:CoachType) => {
                value.dates.forEach((date, index) => {
                    if (value.location != location){
                        return;
                    }
                    const Coachname = value.name;
                    const CoachTimes = value.times[index];
                    
                    if (!datesFree[date]) {
                        // The date is not present in datesFree, create a new date object
                        const newDate: CoachObject = {
                        Coachname: [Coachname],
                        CoachTimes: [CoachTimes],
                        };
                    
                        // Now you can do something with the newDate object, like adding it to the datesFree object
                        datesFree[date] = newDate;
                    } else {
                        // The date already exists in datesFree, update the existing date object
                        datesFree[date].CoachTimes.push(CoachTimes);
                        datesFree[date].Coachname.push(Coachname);
                    }
                })
            })
            setAvailableDates(datesFree);
            console.log(datesFree);
        }
        fetchCoaches();
      }, [location])


    function getTimes(day:number, week:number){
        const selectedDate = parseInt(timetableDates[week][day][0]);
        const asDate = `${selectedDate}/${isCurrentMonth ? getMonthNum() : getMonthNum() + 1}/23`;
        const values: {[dates:string]: CoachObject} = availableDates;
        const times = values[asDate].CoachTimes;
        const coaches = values[asDate].Coachname;
        setCurrentTimes(times);
        setCurrentCoaches(coaches);
    }

    function handleTimeClick(time:string, coach:string){
        setSelectedTime(time);
        setSelectedCoach(coach);
        showTypes(true);
        step2(getDate(), time, coach);
    }

    function isAvailableDate(day:number, week:number){
        let dateChosen = parseInt(timetableDates[week][day][0]);
        let datesAvailable = Object.keys(availableDates);
        let isavailable = false;
        datesAvailable.forEach((date) => {
            let brokenDate = date.split("/");
            let monthdays = isCurrentMonth ? getMonthNum() : getMonthNum() + 1;
            if (parseInt(brokenDate[0]) == dateChosen && monthdays == parseInt(brokenDate[1])) {
                isavailable = true;
            } 
        })
        return isavailable;
    }

    function findIndexesOfTimes(time:string){
        const indexes = [];
        for (let i = 0; i < currentTimes.length; i++) {
          if (currentTimes[i] === time) {
            indexes.push(i);
          }
        }
        return indexes;
    }


    return (
        <>
            <div className='private-timetable-box p-4 justify-content-between text-center' style={{display:mediaQueries.mobile?"":"flex", margin:mediaQueries.mobile?"20px":"40px"}}>
            <div className="timetable-box d-flex flex-column pb-5" style={{width: mediaQueries.mobile?"80%":"50%"}}>
                <div className="text-start d-flex justify-content-between">
                    <div className="d-flex justify-content-between align-items-end ms-4" style={{width:"150px"}}>
                        <h1><span className="fs-4">{getMonthName(isCurrentMonth)}</span></h1>
                        <div className="mb-2" onClick={() => changeMonth()} style={{cursor:"pointer"}}>
                            {isCurrentMonth ? <ArrowRight color="black" size={30}/>:<ArrowLeft color="black" size={30}/>}
                        </div>
                    </div>
                    <h1><span className="fs-4 me-4">{getYear()}</span></h1>
                </div>
                <div className="weekday d-flex justify-content-around" style={{height:"60px"}}>
                    {weekDays.map((day) => (
                        <div className=" p-1 text-center text-muted">{day}</div>
                    ))}
                </div>
                <div className="timetable-box">
                    {timetableDates.map((week, weeknum) => (
                        <div className="d-flex justify-content-around" style={{}}>
                        {week.map((day, daynum) => (
                            <div className="d-flex m-3 text-center row" style={{ width:mediaQueries.mobile?"5px":"30px", height:mediaQueries.mobile?"5px":"30px"}} onClick={() => handleClick(weeknum, daynum)}>
                                <div className={day[1] === "currentDay" && isCurrentMonth ? "current-day rounded-circle" : "" || isAvailableDate(daynum, weeknum) ? "box-red rounded-circle":""}>
                                    <div className={day[0] === "invalid" ? "":"show-shadow rounded-circle"}>
                                        <a> <span className="fs-6 d-flex align-items-start justify-content-center" style={{ height: "100%", width: "100%" }}>{day[0] === "invalid"? "":day[0]}</span></a>   
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-around pt-3">
                    <div className="d-flex">
                        <div className="rounded-circle me-4" style={{backgroundColor:ColourScheme.defaultColour, width:mediaQueries.mobile?"20px":"30px", height:mediaQueries.mobile?"20px":"30px"}}>
                        </div>
                        Current Day
                    </div>
                    <div className="d-flex">
                        <div className="rounded-circle me-4" style={{backgroundColor:"#6c757d", width:mediaQueries.mobile?"20px":"30px", height:mediaQueries.mobile?"20px":"30px"}}>
                        </div>
                        Available Days
                    </div>
                </div>
            </div>
            <div className="pe-3 border-left">
                    <h1><span className='text-end  fs-0.3'>Step 2: Pick Dates and Times</span></h1>
                    { timetableState[0] == -1 ? <div className="mt-5" style={{fontSize:"30px"}}>Choose a Date</div>:
                    <div className="p-3 mt-5" style={{backgroundColor:"#6c757d", borderRadius:"20px"}}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3>
                                    <span className="fs-4" style={{color:"white"}}>Available Times</span>
                                </h3>
                            </div>
                            <div>
                                <h3>
                                    <span className="fs-4" style={{color:"white"}}>{getDate()}</span>
                                </h3>
                            </div>
                        </div> 
                        <div className="mb-4 p-4">
                            {
                                currentTimes.map((time) => (
                                    <div className="mt-4 d-flex justify-content-between" style={{height:"30px"}}>
                                        <span>{time}</span>
                                        {currentTimes.includes(time) ? 
                                        <div className="d-flex align-items-center">
                                            {Array.from({ length: currentTimes.filter((val) => time === val).length }, (_, index) => (
                                                <div
                                                onClick={() => handleTimeClick(time, currentCoaches[findIndexesOfTimes(time)[index]])}
                                                key={index}
                                                className="rounded-circle me-2"
                                                style={{
                                                    backgroundColor: colorsList[findIndexesOfTimes(time)[index]],
                                                    borderColor: currentCoaches[findIndexesOfTimes(time)[index]] === selectedCoach ? "white":"transparent",
                                                    border: "solid transparent",
                                                    width: '30px',
                                                    height: '30px',
                                                    cursor: 'pointer'
                                                }}
                                                ></div>
                                            ))}
                                            <div>Choose coach</div>
                                        </div>:
                                        <></>}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="d-flex">
                            {currentCoaches.map((coach, indx) => (
                                <div className="p-2 m-2" style={{backgroundColor:colorsList[indx], borderRadius:"10px", fontWeight:"bold"}}>
                                    {coach}
                                </div>
                            ))}
                        </div>
                    </div>}
                    <div className="pt-4">
                        {selectedTime ? <><span className="text-muted">Selected:</span> <span style={{fontSize:mediaQueries.mobile?"15px":"27px", height:mediaQueries.mobile?"5px":"30px", paddingLeft:mediaQueries.mobile?"15px":"220px"}}>{selectedTime}{" "}{getDate()}</span>
                        <div><span className="text-muted">Coach:</span> <span style={{fontSize:mediaQueries.mobile?"15px":"27px", paddingLeft:mediaQueries.mobile?"15px":"220px"}}>{selectedCoach}</span></div>
                        </>:<></>}
                    </div>
               </div>            
            </div>           
        </>
        
      );
}


export default PrivateTimetable