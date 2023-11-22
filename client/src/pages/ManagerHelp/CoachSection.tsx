import { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { Coach } from "../../types/coachType";
import "../manager.css"
import { backendLink } from "../../globalVar";

export default function CoachSection(){
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [coachName, setCoachName] = useState("");

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



    return(
        <>
        <div className="ps-3"><h1 style={{width:"20vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"40px"}}>Coaches</h1></div>
            <div className="ms-5 mb-5 mt-3 d-flex gap-5">
                <div className="d-flex flex-column align-items-center">
                    <svg style={{height:"100px", width:"100px", marginBottom:"20px", marginLeft:"10px"}} fill="#576eb2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.532 45.532" stroke="#576eb2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"></path> </g> </g></svg>
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
                            <Button type="submit" style={{backgroundColor:"#46768E", border:"transparent", width:"120px"}}>Add Coach</Button>
                        </Form>
                    </div>
                </div>
                {coaches.slice().reverse().map((value) => (
                    <div style={{ width: "100px", height: "130px" }}>
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
                  </div>
                ))}

            </div>
        </>
    )
}