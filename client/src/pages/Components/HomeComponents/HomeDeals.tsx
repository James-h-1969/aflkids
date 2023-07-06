import React from "react";
import LinkButton from "./../LinkButton";
import campPhoto from "/assets/camps.jpg";
import privatePhoto from "/assets/flag.jpg";
import devPhoto from "/assets/development.jpg";
import { Carousel, Button } from "react-bootstrap";



function HomeDeals(){
    return(
        <div className="page-box">
            <Carousel style={{paddingBottom:"40px"}}>
                <Carousel.Item interval={1000}>
                    <img
                    className="d-block"
                    src="/assets/camps.jpg"
                    alt="First slide"
                    style={{content:"cover", height:"700px", width:"900px", margin:"0 auto", paddingBottom:"220px"}}
                    />
                    <Carousel.Caption style={{ paddingBottom:"40px"}}>
                    <h3><span style={{fontWeight:"bold", fontSize:"40px"}}>Holiday Camps</span></h3>
                    <p><span style={{fontWeight:"lighter", fontSize:"20px"}}>Our camps combine a mix of skill drills and games to create a fun environment for AFL kids.</span></p>
                    <Button variant="secondary" style={{fontWeight:"bold"}}>View Holiday Camps</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                    className="d-block"
                    src="/assets/development.jpg"
                    alt="second slide"
                    style={{content:"cover", height:"700px", width:"900px", margin:"0 auto", paddingBottom:"230px"}}
                    />
                    <Carousel.Caption>
                    <h3><span style={{fontWeight:"bold", fontSize:"40px"}}>Private Sessions</span></h3>
                    <p><span style={{fontWeight:"lighter", fontSize:"20px"}}>Get personalized assissance from one of our many top coaches to get the most out of your AFL kid.</span></p>
                    <Button variant="secondary" style={{fontWeight:"bold"}}>View Private Sessions</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                    className="d-block"
                    src="/assets/flag.jpg"
                    alt="third slide"
                    style={{content:"cover", height:"700px", width:"900px", margin:"0 auto", paddingBottom:"230px"}}
                    />
                    <Carousel.Caption>
                    <h3><span style={{fontWeight:"bold", fontSize:"40px"}}>Development Programs</span></h3>
                    <p><span style={{fontWeight:"lighter", fontSize:"20px"}}>Enhance the skills of AFL kids within your club over multiple weeks from some of our best coaches.</span></p>
                    <Button variant="secondary" style={{fontWeight:"bold"}}>View Development Programs</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}


export default HomeDeals;