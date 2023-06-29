import "../Components.css";

function PrivateTimetable(){

    const dummyTimetable = {
        week1:{
            Monday: {
                date: "20/6/23", 
                times: []
            },
            Tuesday: {
                date: "21/6/23", 
                times: []
            },
            Wednesday: {
                date: "22/6/23", 
                times: []
            },
            Thursday: {
                date: "23/6/23", 
                times: []
            },
            Friday: {
                date: "24/6/23", 
                times: []
            },
            Saturday: {
                date: "25/6/23", 
                times: []
            },
            Sunday: {
                date: "26/6/23", 
                times: []
            },
        },
        week2:{
            Monday: {
                date: "27/6/23", 
                times: []
            },
            Tuesday: {
                date: "28/6/23", 
                times: []
            },
            Wednesday: {
                date: "29/6/23", 
                times: []
            },
            Thursday: {
                date: "30/6/23", 
                times: []
            },
            Friday: {
                date: "1/7/23", 
                times: []
            },
            Saturday: {
                date: "2/7/23", 
                times: []
            },
            Sunday: {
                date: "3/7/23", 
                times: []
            },
        },
        week3:{
            Monday: {
                date: "4/7/23", 
                times: []
            },
            Tuesday: {
                date: "5/7/23", 
                times: []
            },
            Wednesday: {
                date: "6/7/23", 
                times: []
            },
            Thursday: {
                date: "7/7/23", 
                times: []
            },
            Friday: {
                date: "8/7/23", 
                times: []
            },
            Saturday: {
                date: "9/7/23", 
                times: []
            },
            Sunday: {
                date: "10/7/23", 
                times: []
            },
        },

    }

    return (
        <div className='private-timetable-box'>
          <h1><span className='step1'>Step 2: Pick Dates and Times</span></h1>
          <div className="timetable-box">
            <div className="boundary">
              {Object.entries(dummyTimetable).map(([week, days]) => (
                <div className="column" key={week}>
                  {Object.values(days).map((day) => (
                    <div className="cell">{day.date}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}


export default PrivateTimetable