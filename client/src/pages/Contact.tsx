import NavBar from "./Components/NavBar"
import Header from "./Components/Header"
import insta from "/assets/Logos/instagram.png";
// import smitPhoto from "/assets/CampPhotos/IMG_3338.jpg"
// import kalePhoto from "/assets/CampPhotos/IMG_0603.jpg"
// import hannahPhoto from "/assets/CampPhotos/IMG_2326.jpg"
import facebook from "/assets/Logos/facebook.png"
import { Image } from "react-bootstrap";
import TeamCard from "./Components/ContactComponents/TeamCard";
import { useState } from "react";
import CoachInfo from "./Components/ContactComponents/CoachInfo";
import teamPhoto from "/assets/CampPhotos/IMG_2363.jpg";
import { Link } from "react-router-dom";
import useMediaQueries from "media-queries-in-react";
import Footer from "./Components/Footer";



export default function Contact() {
    const [playerShowing, setplayerShowing] = useState("");

    function changeActive(name:string){
        if (name == playerShowing){
            setplayerShowing("");
            return;
        }
        setplayerShowing(name);
    }

    //need to add an image, the afl accomplishments and their coach accomplishments

    const playerInfo = {
        "Tom O'Leary":{
            role: "Founder/Sydney Coach",
            position: "Midfielder/Small Forward",
            phone: "+61 448 408 920",
            quote: "I want to inspire and develop the next generation of excellent people on and off the field",
            img: "/assets/CampPhotos/IMG_3794.jpg",
            coachingExperience: ["Level 1 Accredited AFL Coach", "Head Coach of Manly Wolves U12 Talent Academy", "Asssistant Coach of Manly Bombers U17 Div 1"],
            playingExperience: ["6x Manly Bombers Best and Fairest Winner", "1x Manly Bomber Club Champion", "2020 U17 Div 1 Premiership Captain", "Sydney Swans Academy PLayer (2015-2019)", "Manly Wolves Premier Division Player", "Manly Wolves U19 Div1 Captain"]

        },
        "William Smit":{
            role: "Northern Beaches Head Coach",
            position: "Winger/Small Forward",
            phone: "+61 426 585 152",
            quote: "I want to give back to the game that has given me so much",
            img: "/assets/CampPhotos/IMG_9822.jpg",
            coachingExperience: ["Level 1 Accredited AFL Coach", "Sydney Swans Academy Coach Youth(11-16) Boys and Girls", "Joss Cup State Trials Assistant Coach", "Sydney Swans Tryout Coach", "NSHS Sports Academy Coach"],
            playingExperience: ["U17 Div 1 Grand Final Best on Ground", "Swans VFL Development List", "Sydney Swans U19 Captain", "Selection in NAB League", "Manly Wolves Premier Division Player"]
        },
        "Kale Gablia":{
            role: "North Shore Head Coach",
            position: "Key/Small Forward",
            phone: "+61 431 036 199",
            quote: "I have built up an interest coaching different teams over the years and would love to gain but also pass on experience through 1:1's",
            img: "/assets/CampPhotos/IMG_0603.jpg",
            coachingExperience: ["Level 1 Accredited AFL Coach", "Willoughby/Mosman Coach of U17 Boys Premiers 2022", "Swans Academmy Coach Ages (U11-16) 2019-2022", "Pymble Ladies College AFL Coach"],
            playingExperience: ["Swans Academy Graduate 2015-2021", "Swans NAB league player", "Sydney Swans Reserve Squad Member 2022", "Knox Grammer First VIII Player 2018-2020", "CIS Representive Team 2018", "Manly Wolves Forward of the Year and Premier Division Player"]
        },
        "Hannah Woolf":{
            role: "Girls Head Coach",
            position: "Key/Small Forward",
            phone: "+61 431 036 199",
            quote: "I enjoy seeing kids find the same spark of enjoyment I gained from footy, as well as watching smiles on faces when thy finally execute a new skill they've been practicing.",
            img: "/assets/Imgs/woolf.jpg",
            coachingExperience: ["Forest Lions Coach U12 Head Coach", "Forest Lions U12-U15 Boys assisttant Coach 2019-2022", "Stella Maris Coach", "St Lukes Coach", "AFL NSW/ACT Coaching experience"],
            playingExperience: ["Forest Lion Junior", "Manly Wolves Premier Division at 16 y.o", "Swams acade,y Graduate", "All Schools Team NSW", "NSW Rams player"]
        }

    }

    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });


    return(
        <>
            <NavBar />
            <Header title="Our Team" description="Find out more about our team and get in contact to get the most out of your experience. Learn about the coaches years of experience and some of the performances they have had on the field."/>
            <div className="" style={{position:"absolute", left:"63%", top:"15%"}}>
                <Image src={teamPhoto} style={{width:mediaQueries.mobile?"130px":"450px", height:mediaQueries.mobile?"100px":"300px", borderRadius:"20px"}}/>
            </div>
            <div className="d-flex" style={{fontFamily:"Rubik"}}>
                <div className="ps-3 pt-3 pb-3 mb-5" style={{marginLeft:mediaQueries.mobile?"20px":"40px",marginTop:mediaQueries.mobile?"20px":"40px",backgroundColor:"rgb(222, 222, 231)", width:mediaQueries.mobile?"40%":"30%", borderRadius:"15px", fontSize:mediaQueries.mobile?"12px":"20px"}}>
                    <div style={{fontWeight:"bold"}}>Contact Us</div>
                    <div className="pt-3">Email:</div>
                    <div className="" style={{fontWeight:"lighter", fontSize:mediaQueries.mobile?"10px":"20px"}}>
                        <div>Tomoleary@AFLKids.com.au</div>
                        <div>WillemSmit@AFLKids.com.au</div>
                        <div>KaleGablia@AFLKids.com.au</div>
                    </div>
                    <div className="pt-3">Phone (Between 9-5 Mon-Fri):</div>
                    <div className="" style={{fontWeight:"lighter"}}>+61 448 408 920</div>
                    <div className="pt-3">Socials</div>
                    <div className="d-flex">
                        <Link to="https://www.instagram.com/aflkids_/" className="d-flex justify-content-between me-3 mt-3" style={{cursor:"pointer", textDecoration: "none", color:"black"}}>
                            <img src={insta} style={{width:mediaQueries.mobile?"100%":"100%"}}/>
                        </Link>
                        <Link to="https://www.facebook.com/AFLKids1/" className="d-flex justify-content-between me-5 mt-3" style={{cursor:"pointer", textDecoration: "none", color:"black"}}>
                            <img src={facebook} style={{width:mediaQueries.mobile?"30%":"30%"}}/>
                        </Link>
                    </div>
                    <div className="" style={{fontWeight:"bold", marginTop:mediaQueries.mobile?"20px":"50px"}}>Our Vision</div>
                    <div className="" style={{fontSize:mediaQueries.mobile?"12px":"20px"}}>
                        Our goal at AFLKids is to help players reach their full potential through experienced and accredited AFL coaches, striving for excellence at a junior level.  Through video analysis, goal setting strategies and mental advice, AFLKids goes above and beyond in order to take players to the next level.
                    </div>
                </div>
                <div className="fs-4 pt-3 pb-3 mb-5" style={{paddingLeft:mediaQueries.mobile?"":"20px",marginLeft:mediaQueries.mobile?"20px":"40px", backgroundColor:"rgb(222, 222, 231)", width:mediaQueries.mobile?"46%":"60%", borderRadius:"15px", marginTop:mediaQueries.mobile?"20px":"150px", height:"10%"}}>
                    <div className="mt-1 ms-1" style={{fontWeight:"bold", fontSize:mediaQueries.mobile?"12px":"20px"}}>Our Team</div>
                    <div className="">
                        <div style={{textAlign:"center", fontSize:mediaQueries.mobile?"12px":"20px", paddingBottom:mediaQueries.mobile?"":"20px"}}>
                            Click on a Coach to learn more
                        </div>
                        <div className="d-flex justify-content-around text-align-center">
                            {Object.keys(playerInfo).map((val) => (
                                <TeamCard name={val} changePlayer={changeActive} player={playerShowing}/>
                            ))}
                            
                        </div>
                        {playerShowing === "" ? <></>: <CoachInfo role={playerInfo[playerShowing as keyof typeof playerInfo].role} position={playerInfo[playerShowing as keyof typeof playerInfo].position} phone={playerInfo[playerShowing as keyof typeof playerInfo].phone} quote={playerInfo[playerShowing as keyof typeof playerInfo].quote} image={playerInfo[playerShowing as keyof typeof playerInfo].img} coachingExperience={playerInfo[playerShowing as keyof typeof playerInfo].coachingExperience} playingExperience={playerInfo[playerShowing as keyof typeof playerInfo].playingExperience}/>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}