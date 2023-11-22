import {Row, Col } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MerchItem from "../Components/MerchItem";
import "./Merch.css";
import hoodie from "/assets/AFLkids hoodie.jpg";
import shirt from "/assets/AFLkids playing shirt.jpg"



function Merch(){
    return (
        <>
            <NavBar />
            <Header title="Merch" description="Look good, play good. Choose from our range of top quality products below."/>
            <div className="d-flex merch-box" style={{marginLeft:"20px", marginTop:"20px", marginBottom:"30px"}}>
                <Row className="g-3 ml-1" xs={1} lg={2} >
                    <Col>
                        <MerchItem name="Hoodie" price="$54.99" image={hoodie} id={1}/>
                    </Col>
                    <Col>
                    <MerchItem name="Training Shirt" price="$34.99" image={shirt} id={2}/>
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    )
}

export default Merch;