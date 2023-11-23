//IMPORTS
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import "./Components.css";
import { useCart } from "../context/cartContext";
import useMediaQueries from "media-queries-in-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const {openCart, cartQuantity} = useCart();
  const mediaQueries = useMediaQueries({ 
    mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
  });
  return (
    <>
      {!mediaQueries.mobile? //DESKTOP VERSION
      <Navbar bg="white" fixed="top" variant="light" className="navbar-custom shadom-sm">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand className="navbar-brand-custom">
            <Link to="/">
            <Image alt="logo" src="/assets/aflkidsLogo.png" className="navbar-logo" style={{width:"400px"}}/>
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="nav-link-custom" href="/">Home</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/camps">Holiday Camps</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/private">Private Coaching</Nav.Link>
              {/* <Nav.Link className="nav-link-custom" href="/development">Academy Preparation</Nav.Link> */}
              {/* <Nav.Link className="nav-link-custom" href="/merch">Merch</Nav.Link> */}
              <Nav.Link className="nav-link-custom" href="/contact">Our Team</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          { (cartQuantity > 0) ? 
            <Button style={{
              width: "3rem", height: "3rem", position: "relative"}} 
              variant="outline-primary" className="rounded-circle"
              onClick={openCart}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
              width: "1.5rem", 
              height:"1.5rem", 
              color:"white", 
              position:"absolute", 
              bottom:"0", 
              right:"0",
              transform:"translate(25%, 25%)"}}>
              {cartQuantity}
            </div>
            </Button>:<></>
          }
        </Container>
      </Navbar>: //MOBILE VERSION
      <Navbar expand="true" fixed="top" variant="light" style={{ background: 'white', height:"100px"}}>
      <Navbar.Brand className="navbar-brand-custom" style={{marginLeft:"20px", marginBottom:"10px"}}>
        <Link to="/">
        <Image alt="logo" src={logo} className="navbar-logo" style={{width:"150px"}}/>
        </Link>
      </Navbar.Brand>
      { (cartQuantity > 0) ? 
            <Button style={{
              width: "40px", height: "40px", position: "relative", right:"110px"}} 
              variant="outline-primary" className="rounded-circle"
              onClick={openCart}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
              width: "1.5rem", 
              height:"1.5rem", 
              color:"white", 
              position:"absolute", 
              bottom:"0", 
              right:"0",
              transform:"translate(25%, 25%)"}}>
              {cartQuantity}
            </div>
            </Button>:<></>
        }
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{position:"absolute", right:"30px", top:"30px"}}/>
      <Navbar.Collapse id="" style={{marginLeft:"180px", backgroundColor:"white", width:"200px"}}>
  
        <Nav className="ms-auto" style={{fontSize:"12px", border:"3px solid light grey"}}>
              <Nav.Link className="nav-link-custom" style={{padding:"10px"}} href="/">Home</Nav.Link>
              <Nav.Link className="nav-link-custom" style={{padding:"10px"}} href="/camps">Holiday Camps</Nav.Link>
              <Nav.Link className="nav-link-custom" style={{padding:"10px"}} href="/private">Private Coaching</Nav.Link>
              {/* <Nav.Link className="nav-link-custom" href="/development">Academy Preparation</Nav.Link> */}
              <Nav.Link className="nav-link-custom" style={{padding:"10px"}} href="/merch">Merch</Nav.Link>
              <Nav.Link className="nav-link-custom" style={{padding:"10px"}} href="/contact">Our Team</Nav.Link>
          </Nav>
      </Navbar.Collapse>
    </Navbar>
      }
    </>
        
  );
}



