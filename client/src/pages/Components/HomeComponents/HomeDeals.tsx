import useMediaQueries from "media-queries-in-react";
import campPhoto from "/assets/CampPhotos/IMG_2368.jpg"
import soloPhoto from "/assets/Imgs/usePhoto.jpg";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./home.css"
import { ColourScheme } from "../../../globalVar";


function HomeDeals(){
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });


    
      return (
        <>
        <div style={{ height: mediaQueries.mobile?"400px":"100vh", marginBottom: mediaQueries.mobile?"40px":"100px", position: "relative" }}>
          <div style={{ backgroundColor: ColourScheme.defaultColour, width: "100%", position: "absolute", zIndex: 6, opacity: 0.7,  height:mediaQueries.mobile?"400px":"100vh" }}></div>
          <div style={{ overflow: "hidden" }}>
            <img src={campPhoto} style={{ width: "98.5vw", zIndex: 5, position: "absolute", height:mediaQueries.mobile?"400px":"100vh"}} alt="Camp Photo" />
          </div>
          <div className="d-flex justify-content-start">
            <div className="d-flex flex-column" style={{ width:mediaQueries.mobile?"120px": "300px", zIndex: 30, marginTop:mediaQueries.mobile?"100px":"240px", marginLeft:mediaQueries.mobile?"2rem":"5rem" }}>
              <div className="linkbox" >
                <Link to={"/camps"}>
                    <img src={campPhoto} style={{ width:mediaQueries.mobile?"120px": "300px", paddingBottom:"30px" }} alt="Camp Photo" />
                </Link>
              </div>
              <div className="linkbox">
                <Link to={"/private"}>
                <img src={soloPhoto} style={{ width:mediaQueries.mobile?"120px": "300px", height:mediaQueries.mobile?"120px": "300px"}} alt="Solo Photo" />
                </Link>
              </div>
            </div>
            <div className="d-flex flex-column">
            <div className="" style={{ zIndex: 30, marginTop:mediaQueries.mobile?"100px":"230px", marginLeft:mediaQueries.mobile?"50px":"200px", paddingRight:mediaQueries.mobile?"20px":"100px",lineHeight:mediaQueries.mobile?"0.8":"1" }}>
                <span style={{fontSize:mediaQueries.mobile?"15px":"60px", fontWeight:"bold", fontFamily:"Rubik", color:"white"}}>Holiday Camps<br /></span>
                <span style={{fontSize:mediaQueries.mobile?"7px":"30px", fontWeight:"normal", fontFamily:"Rubik", color:"white"}}>
                Experience the ultimate <span style={{color:'red', fontWeight:"bold"}}>AFL</span> holiday camps for kids!  Join us for fun-filled days of skill development, teamwork, and excitement in a safe and supportive environment. 
                  </span>
                  <Link to="/camps" className="mb-5" style={{}}>
                      <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{color:ColourScheme.defaultColour, backgroundColor:"white", border:"transparent", fontWeight:"bold", fontSize:mediaQueries.mobile?"10px":""}}>View Upcoming Camps</Button>
                  </Link>
            </div>
            <div style={{zIndex: 30, marginTop:mediaQueries.mobile?"50px":"230px", marginLeft:mediaQueries.mobile?"50px":"200px", paddingRight:mediaQueries.mobile?"20px":"100px",lineHeight:mediaQueries.mobile?"0.8":"1"}}>
                  <span style={{fontSize:mediaQueries.mobile?"15px":"60px", fontWeight:"bold", fontFamily:"Rubik", color:"white"}}>Private Coaching<br /></span>
                  <span style={{fontSize:mediaQueries.mobile?"7px":"30px", fontWeight:"normal", fontFamily:"Rubik", color:"white"}}>
                      Elevate your skills with personalized <span style={{color:'red', fontWeight:"bold"}}>AFL</span> private coaching. Tailored sessions offer focused skill enhancement, strategy development, and individualized attention<br /></span>
                      <Link to="/private" className="" style={{}}>
                          <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{color:ColourScheme.defaultColour, backgroundColor:"white", border:"transparent", fontWeight:"bold",fontSize:mediaQueries.mobile?"10px":""}}>View Available Sessions</Button>
                      </Link>
            </div>
            </div>
          </div>
        </div>
        </>
      );
}


export default HomeDeals;