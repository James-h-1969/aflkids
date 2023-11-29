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
        <div style={{ height: "150vh", marginBottom: "100px", position: "relative" }}>
          <div style={{ backgroundColor: ColourScheme.defaultColour, width: "100%", position: "absolute", zIndex: 6, opacity: 0.5,  height:"150vh" }}></div>
          <div style={{ overflow: "hidden" }}>
            <img src={campPhoto} style={{ width: "98.5vw", zIndex: 5, position: "absolute", height:"150vh"}} alt="Camp Photo" />
          </div>
          <div className="d-flex justify-content-start">
            <div className="d-flex flex-column" style={{ width: "300px", zIndex: 30, marginTop:"300px", marginLeft:"100px" }}>
              <div className="linkbox">
                <Link to={"/camps"}>
                    <img src={campPhoto} style={{ width: "400px", paddingBottom:"30px" }} alt="Camp Photo" />
                </Link>
              </div>
              <div className="linkbox">
                <Link to={"/private"}>
                <img src={soloPhoto} style={{ width: "400px", height:"400px" }} alt="Solo Photo" />
                </Link>
              </div>
            </div>
            <div className="" style={{ zIndex: 30, marginTop:"350px", marginLeft:"200px", paddingRight:"100px" }}>
                <span style={{fontSize:"60px", fontWeight:"bold", fontFamily:"Rubik", color:"white"}}>Holiday Camps<br /></span>
                <span style={{fontSize:"30px", fontWeight:"normal", fontFamily:"Rubik", color:"white"}}>
                    Experience the ultimate <span style={{color:'red', fontWeight:"bold"}}>AFL</span> holiday camps for kids!  Join us for fun-filled days of skill development, teamwork, and excitement in a safe and supportive environment. 
                    </span>
                    <Link to="/camps" className="mb-5" style={{}}>
                        <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{color:ColourScheme.defaultColour, backgroundColor:"white", border:"transparent", fontWeight:"bold"}}>View Upcoming Camps</Button>
                    </Link>
                <div style={{marginTop:"130px"}}>
                    <span style={{fontSize:"60px", fontWeight:"bold", fontFamily:"Rubik", color:"white"}}>Private Coaching<br /></span>
                    <span style={{fontSize:"30px", fontWeight:"normal", fontFamily:"Rubik", color:"white"}}>
                        Elevate your skills with personalized <span style={{color:'red', fontWeight:"bold"}}>AFL</span> private coaching. Tailored sessions offer focused skill enhancement, strategy development, and individualized attention<br /></span>
                        <Link to="/private" className="" style={{}}>
                            <Button className="mt-3" size={mediaQueries.mobile?"sm":"lg"} style={{color:ColourScheme.defaultColour, backgroundColor:"white", border:"transparent", fontWeight:"bold"}}>View Available Sessions</Button>
                        </Link>
                </div>
            </div>
          </div>
        </div>
      );
}


export default HomeDeals;