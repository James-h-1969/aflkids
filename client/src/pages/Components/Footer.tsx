import { Image } from "react-bootstrap";
import "./Components.css";
import { Link } from "react-router-dom";
import useMediaQueries from "media-queries-in-react";


export default function Footer(){
    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });

    function changeURL(url:string){
        window.parent.postMessage(url, "https://www.aflkids.com.au/") // so wix changes its url\
    }
    return(<>
        <div className="d-flex justify-content-around text-center" style={{gap:mediaQueries.mobile?"0px":"20px", height:mediaQueries.mobile?"100px":"300px", fontFamily:"Rubik", fontWeight:"bold", fontSize:mediaQueries.mobile?"12px":"40px"}}>
            <div>
                Thanks to our sponsers
                <div className="d-flex justify-content-around pt-4">
                    <Link to="https://www.ontop.com.au/">
                    <Image src="/assets/Logos/ontop.png" style={{width:mediaQueries.mobile?"50px":"300px"}}/>
                    </Link>
                    <Link to="https://www.code5.com.au/">
                        <Image src="/assets/Logos/code5.png" style={{width:mediaQueries.mobile?"50px":"250px"}}/>
                    </Link>
                </div>
            </div>
            <div>
                Thanks to our partnered clubs
                <div className="d-flex justify-content-around align-items-center pt-4" style={{gap:mediaQueries.mobile?"0px":"10px"}}>
                    <Image src="/assets/Logos/bombers.jpeg" onClick={() => changeURL("https://www.manlybombers.com.au/")} style={{width:mediaQueries.mobile?"30px":"90px"}}/>
                    <Image src="/assets/Logos/Lions.jpeg" onClick={() => changeURL("https://forestafl.com.au/")} style={{width:mediaQueries.mobile?"30px":"90px"}}/>
                    <Image src="/assets/Logos/stives.jpeg" onClick={() => changeURL("https://stivesafl.teamapp.com/?_webpage=v1")} style={{width:mediaQueries.mobile?"30px":"90px"}}/>
                    <Image src="/assets/Logos/swans.png" onClick={() => changeURL("https://mosmanswans.com.au/")} style={{width:mediaQueries.mobile?"30px":"90px"}}/>
                    <Image src="/assets/Logos/Tigers.png" onClick={() => changeURL("https://www.pittwatertigers.com.au/")} style={{width:mediaQueries.mobile?"30px":"90px"}}/>
                    <Image src="/assets/Logos/eagles.jpg" onClick={() => changeURL("https://hornsbyberowraeagles.com/")} style={{width:mediaQueries.mobile?"30px":"90px"}}/>
                    <Link to="https://wildcatsafl.com/">
                        <Image src="/assets/Logos/wildcats.jpg" onClick={() => changeURL("https://www.manlybombers.com.au/")} style={{width:mediaQueries.mobile?"30px":"90px"}}/>
                    </Link>
                </div>
            </div>
        </div>
    </>)
}