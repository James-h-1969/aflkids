import { useState, useEffect } from "react"
import { Button, Form, Image } from "react-bootstrap"
import { Coach, BookedSession, AvailableSession } from "../../types/coachType";
import "../manager.css"
import { ColourScheme, backendLink } from "../../globalVar";
import { Kids } from "../../types/kidsType";

export default function CoachSection(){
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [coachName, setCoachName] = useState("");
    const [showCoach, setShowCoach] = useState(false);
    const [CoachtoShow, setCoachToShow] = useState<Coach>();
    const [bookedSessionShowing, setBookedSessionShowing] = useState(-1);

    function addCoach(){
        const newCoach = {
            name_:coachName
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if required
            },
            body: JSON.stringify(newCoach),
          };

        fetch(`${backendLink}/Coaches`, requestOptions)

        location.reload();
    }

    async function deleteCoach(name:string) {
        const update = {name_:name};
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if required
              },
            body: JSON.stringify(update),
        };

        fetch(`${backendLink}/deleteCoach`, requestOptions)
        location.reload();
    }

    useEffect(() => {
        async function fetchCoaches() {
          const response = await fetch(`${backendLink}/Coaches`);
          const coaches = await response.json();
          setCoaches(coaches);
        }
        fetchCoaches();
      }, [])

    function setShowingCoach(coach:Coach){
      setShowCoach(!showCoach);
      setCoachToShow(coach)
    }

    const kids: Kids = {
      kids: [],
    }

    function test(){
      let session = {
        name_: "Tom O'Leary",
        location_: "Weldon Oval",
        timing_: new Date(),
        kids_: kids,
        type_: "1 on 1"
      }
      const requestOptions: RequestInit = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if required
            },
          body: JSON.stringify(session),
      };

      fetch(`${backendLink}/addCoachSess`, requestOptions)

    }

    async function delCoachSession(timing:Date){
      const toDel = {
        name_: CoachtoShow?.name,
        timing_:timing
      }
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if required
          },
        body: JSON.stringify(toDel),
    };

      const del = await fetch(`${backendLink}/delCoachSess`, requestOptions);
      location.reload();
    }

    const timing = CoachtoShow?.bookedSessions[bookedSessionShowing]?.timing;
    const CoachSessionKids = CoachtoShow?.bookedSessions[bookedSessionShowing]?.kids;

    return(
        <>
        <div className="ps-3"><h1 style={{width:"20vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"40px"}}>Coaches</h1></div>
            <div className="ms-5 mb-5 mt-3 d-flex gap-5">
                <div className="d-flex flex-column align-items-center">
                    <svg style={{height:"100px", width:"100px", marginBottom:"20px", marginLeft:"10px"}} fill="#576eb2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.532 45.532" stroke="#576eb2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"></path> </g> </g></svg>
                    <div>
                        <Form onSubmit={addCoach} className="d-flex flex-column align-items-center">
                            <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                <Form.Control
                                placeholder="Enter Name"
                                value={coachName}
                                onChange={(e) => setCoachName(e.target.value)}
                                style={{fontSize:"15px"}}
                                />
                            </Form.Group>
                            <Button type="submit" style={{backgroundColor:ColourScheme.defaultColour, border:"transparent", width:"120px"}}>Add Coach</Button>
                        </Form>
                    </div>
                </div>
                {coaches.slice().reverse().map((value) => (
                    <div className="d-flex flex-column align-items-center" style={{ width: "100px", height: "180px" }}>
                    <div className="rounded-circle mb-2" style={{ backgroundImage:`url(${value.imgName})`, backgroundSize: "cover",
                        backgroundPosition: "center",width: "100px", height: "100px", position: "relative", backgroundColor: value.imgName === "" ? "grey":"" }}>
                      {/* Red "X" */}
                      <div onClick={() => deleteCoach(value.name.valueOf())} className="need_hover rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "white",
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}>
                        X
                      </div>
                    </div>
                    <div style={{ width: "100px", textAlign: "center", fontWeight: "bold" }}>{value.name}</div>
                    <Button onClick={() => setShowingCoach(value)} style={{backgroundColor:ColourScheme.defaultColour, border:"transparent", width:"120px", marginTop:"20px"}}>View</Button>
                  </div>
                ))}
                {showCoach ?  <div style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Red color with 50% transparency
                  zIndex: "120"
                }}>
                <div style={{
                  position: 'fixed',
                  top: '20%',
                  left: "20%",
                  width: '60%',
                  height: '60%', // Adjust the height as needed
                  backgroundColor: ColourScheme.defaultColour,
                  zIndex: "200",
                  borderRadius: "10px"
                }}>
                  <div onClick={() => setShowCoach(false)} className="need_hover rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
                        width: "2rem",
                        height: "2rem",
                        color: "white",
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}>
                        X
                  </div>
                  <div className="d-flex">
                    <div className="d-flex gap-5 ps-5 pt-3">
                      <div>
                        <div style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}>{CoachtoShow?.name}</div>
                        <div style={{ color: "grey", fontSize: "20px", fontWeight: "bold" }}>CEO, AFLKids</div>
                      </div>
                      <div className="rounded-circle mb-2" style={{
                        backgroundImage: `url(${CoachtoShow?.imgName})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100px",
                        height: "100px",
                        position: "relative"
                      }}></div>
                    </div>
                    <div>
                    <div className="ms-4 mt-4">
                      <div style={{color:"white", fontWeight:"bold", fontSize:"22px"}}>Available</div>
                      {CoachtoShow?.availableSessions.map((value) => (
                        <div className="rounded-circle">
                          Test1
                        </div>
                      ))}
                    </div>
                    <div className="ms-4 mt-4">
                      <div  style={{color:"white", fontWeight:"bold", fontSize:"22px"}}>Booked</div>
                      <div className="d-flex flex-row"> 
                      {CoachtoShow?.bookedSessions.map((value, index) => (
                        <div
                        className="rounded-circle"
                        style={{ width: "20px", cursor:"pointer", height: "20px", backgroundColor: "green", margin: "5px" }}
                        onClick = {() => setBookedSessionShowing(bookedSessionShowing == -1 ?  index: (bookedSessionShowing == index ? -1 : index))}
                     > 
                       
                      </div>
                      ))}</div>
                    </div>
                        { bookedSessionShowing != -1 ?
                        <div className="ms-3 mt-4 p-3" style={{backgroundColor:"white", width:"400px", height:"200px", borderRadius:"10px"}}>
                          <div className="d-flex justify-content-between">
                            <div style={{fontWeight:"bold", fontSize:"20px"}}>{CoachtoShow?.bookedSessions[bookedSessionShowing]?.type} Session</div>
                            <div>{CoachSessionKids?.kids.length} kids</div>
                          </div>
                          <div>{CoachtoShow?.bookedSessions[bookedSessionShowing]?.location}</div>
                          <div>{timing?.toLocaleString()}</div>
                          <div>
                            {CoachSessionKids?.kids.map((kid, index) => (
                              <div key={index}>Kid: {kid.childName}</div>
                            ))}
                          </div>
                          {timing !== undefined ? <Button onClick={() => delCoachSession(timing)} className="bg-danger" style={{border:"transparent", marginTop:"40px"}}>Delete Session</Button>:<></>}
                          
                        </div>:<></>
                        }
                      
                    </div>
                    
                  </div>
                </div>
              </div>
              :<></>}
            </div>
        </>
    )
}