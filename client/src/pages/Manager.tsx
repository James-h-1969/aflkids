import { Link } from "react-router-dom";
import AddCamp from "./ManagerHelp/AddCamp";
import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import "./manager.css"
import { CampType } from "../types/campType";
import DisplayCamp from "./ManagerHelp/DisplayCamp";
// import CoachSection from "./ManagerHelp/CoachSection";
import ParentSection from "./ManagerHelp/ParentSection";
import { backendLink, ColourScheme } from "../globalVar";

export default function Manager(){
    const [camps, setCamps] = useState<CampType[]>([]);
    const [showingAddCamp, setshowingAddCamp] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function fetchCamps() {
          const response = await fetch(`${backendLink}/camps`);
          const newCamps = await response.json();
          setCamps(newCamps);
        }
        fetchCamps();
        const isLogged = sessionStorage.getItem('isLoggedin') === 'True';
        setLoggedIn(isLogged);
      }, [])


    
    return(
        <>
        {isLoggedIn ? <>
        <span className="text-center ps-5 me-5" style={{width:"100vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"70px"}}>Welcome, Tom O'leary</span>
        <Link to="/">
            <Button style={{backgroundColor:ColourScheme.defaultColour, border:"transparent"}}>Back to AFLKids</Button>
        </Link>

        <div className="ps-5 pt-3">
            <div className="d-flex justify-content-start">
                <div className="ps-3"><h1 style={{width:"20vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"40px"}}>Camps</h1></div>
                <div className="circle" onClick={() => setshowingAddCamp(true)}><div className="plus">+</div></div>
            </div>
            {showingAddCamp ? <AddCamp setShowingAddCamp={setshowingAddCamp}/>: <></>}
            <div> 
                {camps.slice().reverse().map((value: CampType, index) => (
                    <DisplayCamp key={index} val={value} />
                ))}
            </div>
            {/* <div>
                <CoachSection />                
            </div>   */}
            <div>
                <div className="ps-3"><h1 style={{width:"20vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"40px"}}>Parents</h1></div>
                <ParentSection />
            </div>  
        </div></>:<><span className="text-center ps-5 me-5" style={{width:"100vw", fontWeight:"bold", fontFamily:"Rubik", fontSize:"70px"}}>Nice Try</span>
        <Link to="/">
            <Button style={{backgroundColor:ColourScheme.defaultColour, border:"transparent"}}>Back to AFLKids</Button>
        </Link></>}
        
        </>
    )
}