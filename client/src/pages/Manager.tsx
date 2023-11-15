import { Link } from "react-router-dom";
import AddCamp from "./ManagerHelp/AddCamp";
import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import "./manager.css"
import { CampType } from "../types/campType";
import ShowKids from "./ManagerHelp/ShowKids";
import { Child, Kids } from "../types/kidsType";
import DisplayCamp from "./ManagerHelp/DisplayCamp";

export default function Manager(){
    const [camps, setCamps] = useState<CampType[]>([]);
    const [showingAddCamp, setshowingAddCamp] = useState(false);

    useEffect(() => {
        async function fetchCamps() {
          const response = await fetch(`http://localhost:3000/camps`);
          const newCamps = await response.json();
          setCamps(newCamps);
        }
        fetchCamps();
      }, [])



    async function deleteCamp(name:string) {
        const update = {name_:name};
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if required
              },
            body: JSON.stringify(update),
        };

        const response = fetch("http://localhost:3000/updatecampstatus", requestOptions)
        console.log(response)
    }


    
    return(
        <>
        <span className="text-center ps-5 me-5" style={{width:"100vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"70px"}}>Welcome, Tom O'leary</span>
        <Link to="/">
            <Button style={{backgroundColor:"#46768E", border:"transparent"}}>Back to AFLKids</Button>
        </Link>

        <div className="ps-5 pt-3">
            <div className="d-flex justify-content-start">
                <div className="ps-3"><h1 style={{width:"20vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"40px"}}>Camps</h1></div>
                <div className="circle" onClick={() => setshowingAddCamp(true)}><div className="plus">+</div></div>
            </div>
            {showingAddCamp ? <AddCamp setShowingAddCamp={setshowingAddCamp}/>: <></>}
            <div> 
                {camps.reverse().map((value: CampType, index) => (
                    <DisplayCamp val={value}/>
                ))}
            </div>
            <div>

            </div>
        </div>
        </>
    )
}