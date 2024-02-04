import { times } from "../../../globalVar"
import { Coach } from "../../../types/coachType"
import { useEffect, useState } from "react"

type ChooseDetailsPropType = {
    date: Date,
    coaches: Array<Coach>,
    showTypes: (show:boolean) => void;
}

export default function ChooseDetails({date, coaches, showTypes}:ChooseDetailsPropType){
    const [dayAvailables, setDayAvailables] = useState<Array<Array<Coach>>>(
        [[], [], [], [], [], [], [], [], [], [], [], []]
    )

    const [selectedTime, setSelectedTime] = useState("");
    const [isShowingSelected, setIsShowingSelected] = useState(false);
    
    useEffect(() => {
        const updatedDayAvailables: Array<Array<Coach>> = Array.from({ length: 12 }, () => []);
        for (const coach of coaches) {
            const dayArray1 = coach.weekAvailabilities[date.getDay()-1];
            const bookedSessionsOnDay = coach.bookedSessions.filter((val) => val.timing.getDate() == date.getDate());

            const dayArray2: boolean[] = times.map((time) => {
                // Check if there's a booked session at the current time
                const currentTime = new Date(date);
                let [hours, minutes] = time.match(/\d+/g)!.map(Number);
                const isPM = time.toLowerCase().includes('pm');

                // Adjust for PM time
                if (isPM && hours !== 12) {
                    hours += 12;
                }

                currentTime.setHours(hours, minutes, 0, 0);

                const isBooked = bookedSessionsOnDay.some((session) => {
                    // Adjust the condition based on your session and time comparison logic
                    return session.timing.getTime() === currentTime.getTime();
                });
                return isBooked;
            });
            
            for (const [i, session]  of times.entries()){
                if (dayArray1[i] && !dayArray2[i]){
                    updatedDayAvailables[i].push(coach);
                }
            }
        }
        setDayAvailables(updatedDayAvailables);
    }, [date])



    return(
        <div className="mt-5">
            {date.toDateString()}
            <div className="d-flex justify-content-around">
                {
                    times.map((val, index) => (
                        <div key={index} className="mt-3 p-2" style={{backgroundColor: dayAvailables[index].length > 0 ? "green":"red", borderRadius:"10px", cursor: dayAvailables[index].length > 0 ? "pointer": ""}} onClick={() => showTypes(true)}>
                            {val}
                        </div>
                    ))
                }
            </div>
            {isShowingSelected ? 
                <div>
                    {selectedTime}
                </div>:
                <></>
            }
        </div>
    )
}