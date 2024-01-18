import NavBar from "./Components/NavBar";
import UpComingCamps from "./Components/CampComponents/UpcomingCamps";
import "./Camps.css";
import useMediaQueries from "media-queries-in-react";
import campVideo from "/assets/Videos/aflkidsvid.mp4";
import Footer from "./Components/Footer"

function Camps(){
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });
    return (
        <>
            <NavBar />
            <div style={{ paddingTop:mediaQueries.mobile?"100px":"120px", paddingLeft:mediaQueries.mobile?"30px":"90px", zIndex:"100"}}>
                <span style={{fontSize:mediaQueries.mobile?"30px":"90px", color:"white", fontFamily:"Rubik", fontWeight:"bold", WebkitTextStroke:"2px #000"}}>Holiday Camps</span>
            </div>
            
            <div style={{ position: 'relative' }}>
                <video
                    muted
                    autoPlay
                    src={campVideo}
                    loop
                    controls={false} // Remove controls
                    style={{position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(5px)',
                    zIndex: "-100"}}
                ></video>
            </div>
            
            <UpComingCamps />
            <Footer />
        </>
    )
}

export default Camps;