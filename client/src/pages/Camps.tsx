import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import UpComingCamps from "./Components/CampComponents/UpcomingCamps";
import "./Camps.css";
import useMediaQueries from "media-queries-in-react";
import campVideo from "/assets/Videos/aflkidsvid.mp4";
import Footer from "./Components/Footer"

function Camps(){
    const text = "Our camps combine a mix of skill drills and games to create a fun environment for AFL kids. Guarenteed to learn new skills and make friends!";
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });
    return (
        <>
            <NavBar />
            <Header title="Holiday Camps" description={text}/>
            {!mediaQueries.mobile?
            <div className="" style={{position:"absolute", left:"63%", top:"18%"}}>
            <video muted autoPlay src={campVideo} loop controls width={mediaQueries.mobile?"130":"360"} height={mediaQueries.mobile?"100":"200"} >
            </video>
            </div>:
            <div className="d-flex justify-content-center pt-3 pb-2" style={{width: "80%", alignItems:"center", marginLeft:"30px"}}>
            <video muted autoPlay src={campVideo} loop controls width={300} height={200} >
            </video>
            </div>
            }
            <UpComingCamps />
            <Footer />
        </>
    )
}

export default Camps;