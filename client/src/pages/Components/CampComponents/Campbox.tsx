import { Image, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useCart } from "../../context/cartContext";
import camp1 from "/assets/CampPhotos/IMG_2365.jpg"
import camp2 from "/assets/CampPhotos/IMG_2363.jpg"
import camp3 from "/assets/CampPhotos/IMG_2368.jpg"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import useMediaQueries from "media-queries-in-react";
import { backendLink } from "../../../globalVar";

type CampboxProps = {
    name: string,
    ages: String,
    date: String,
    times: String,
    Price: Number,
    Location: String,
    address: String,
    locPic: string,
    index: number
}

function Campbox ({name, Location, ages, date, times, Price, address, locPic, index}: CampboxProps) {
    const [isBooking, setIsBooking] = useState(false);
    const { addToCart } = useCart();
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');
    const [club, setClub] = useState('');
    const [comments, setComments] = useState('');
    const [selectedOption, setSelectedOption] = useState('Choose Days');
    const [couponInput, setCouponInput] = useState("");
    const [validCode, setValidCode] = useState(false);


    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
      });  
    
    //this function checks whether the coupon is a valid coupon (async because it is fetching data)
    async function isValidCode(id: number, token: string){
        const response = await fetch(`${backendLink}/checkTokens`, { //make a post request with the info in the body. handle in backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, token: token }),
        });
        return response.ok
    }

    // this function handles when all the details are inputted and the user wants to add it to the cart
    async function handleAddingCart(){
        let ID = 0;
        let day = "";
        if (couponInput.length > 0){
            if (selectedOption == "Day One" || selectedOption == "Day Two"){
                setValidCode(true)
                setCouponInput("");
                return;
            }
            //chekc whether it is a valid code
            let isValid = await isValidCode(11, couponInput);
            if (isValid){ //only check if both days have been selected
                ID = 17 //change this to be the ID of the new cheap object
            } else { //not a valid code
                setValidCode(true)
                setCouponInput("");
                return;
            }
            //if it is not then exit
        } else if (selectedOption == "Day One" || selectedOption == "Day Two"){ // check whether a single option has been selected
            ID = 16; // ID of one day
            if (selectedOption == "Day One"){
                day = "1";
            } else {
                day = "2";
            }
        } else {
            ID = 11; // ID for both days
        }
        const Customdetails = {
            childName: childName,
            childAge: childAge,
            childComments: comments,
            childClub: club,
            purchaseName: [name, day],
        }
        addToCart(ID, 1, Customdetails);
        location.reload();
    }

    const handleOptionSelect = (eventKey: string | null) => {
        if (eventKey) {
          setSelectedOption(eventKey);
        }
      };

    const imgs = [camp1, camp2, camp3];


    const brokenDate = date.split(" ");
    const firstDate = [brokenDate[0], brokenDate.slice(-2).join(" ")].join(" ");
    const secondDate = [brokenDate[2], brokenDate.slice(-2).join(" ")].join(" ");

    const isButtonDisabled = !(childName && childAge && club  && (selectedOption != "Choose Days"));
    
    return(
        <div className="m-3 pb-4 " style={{backgroundColor:"rgb(70, 118, 142)", fontFamily:"Rubik", borderRadius:"15px", paddingLeft:mediaQueries.mobile?"0px":"30px", paddingRight:mediaQueries.mobile?"10px":"30px"}}>
            <div className="ps-4 w-10 d-flex justify-content-between" style={{paddingTop:mediaQueries.mobile?"17px":"30px"}}>
                <div className="text-center d-flex flex-column" style={{width:"50%"}}>
                    <span className="mb-2" style={{fontWeight:"bold", fontSize:mediaQueries.mobile?"15px":"30px", color:"white"}}>{name}</span>
                    <span className="mb-1" style={{fontWeight:"400", fontSize:mediaQueries.mobile?"20px":"70px"}}>${Price.toString()}</span>
                    <span style={{fontWeight:"400", fontSize:mediaQueries.mobile?"10px":"30px"}}>{ages}</span>
                    <span style={{fontWeight:"400", fontSize:mediaQueries.mobile?"10px":"20px"}}>{date}</span>
                    <span className="mb-3" style={{fontWeight:"400", fontSize:mediaQueries.mobile?"10px":"20px"}}>{times}</span>
                    {!isBooking?<span className="" style={{fontWeight:"400", fontSize:mediaQueries.mobile?"10px":"40px"}}>{Location}</span>:<></>}
                    <Button className="" style={{fontSize:mediaQueries.mobile?"10px":'30px', backgroundColor:"white", color:"black", width:"100%", marginTop:mediaQueries.mobile?"17px":"50px"}} onClick={() => setIsBooking(!isBooking)}>{!isBooking ? "Show more":"Hide"}</Button>
                </div>
                <div>
                    <Image src={imgs[index]} style={{contain:"cover", borderRadius:"10px", width:mediaQueries.mobile?"120px":"500px", height:mediaQueries.mobile?"110px":"400px", marginTop:mediaQueries.mobile?"40px":"0px", paddingLeft:mediaQueries.mobile?"10px":"0px"}}/>
                </div>
            </div>
            { isBooking ? 
                <div className="d-flex">
                    <div className="p-2" style={{width:"100%"}}>
                        <div className="pb-2 " style={{textAlign:"center", fontSize:mediaQueries.mobile?"10px":"20px", paddingTop:mediaQueries.mobile?"15px":"30px"}}>
                            Our camps are run by Senior AFL players who have been through the Swans Academy, 
                            played VFL, play AFLW or play Premier Division AFL. 
                            We are a tackle free, and we separate players into groups by age and gender to 
                            ensure skills are being matched. Namely, players from ages 5-8 will split from players aged 9-13
                            participating in two seperate camps.
                        </div>
                        <div className="d-flex justify-content-between" style={{marginTop:mediaQueries.mobile?"30px":"50px"}}>
                            <div className="" style={{textAlign:"center", fontSize:mediaQueries.mobile?"10px":"25px"}}>
                                <div>
                                    Location : <span className="ps-1" style={{fontWeight:"bold", fontSize:mediaQueries.mobile?"12px":"30px"}}>{Location}</span><br />
                                    {address}
                                </div>
                                <Image src={locPic} className="pt-4 ms-3" style={{width:mediaQueries.mobile?"100px":"400px", height:mediaQueries.mobile?"120px":"400px"}}/>
                                {mediaQueries.mobile?<>
                                        <div className="mt-3 d-flex justify-content-center gap-4">
                                            <div>
                                            Both Days<br/><span style={{fontSize:"20px"}}>$150</span>
                                            </div>
                                            <div>
                                                One Day<br/><span style={{fontSize:mediaQueries.mobile?"20px":"50px"}}>$100</span>
                                            </div>
                                        </div>
                                        <span style={{fontSize:"10px"}}>Select which days you want<br/> to join (Select both for<br/> the full experience)</span>
                                        <DropdownButton
                                            as={ButtonGroup}
                                            size={mediaQueries.mobile?"sm":"lg"}
                                            title={selectedOption}
                                            onSelect={handleOptionSelect}
                                            variant="secondary"
                                            style = {{width:mediaQueries.mobile?"80%":'100%', paddingTop:"20px"}}
                                        >
                                            <Dropdown.Item eventKey="Both Days">Both Days</Dropdown.Item>
                                            <Dropdown.Item eventKey="Day One">Day One ({firstDate})</Dropdown.Item>
                                            <Dropdown.Item eventKey="Day Two">Day Two ({secondDate})</Dropdown.Item>
                                        </DropdownButton></>:<></>}
                            </div>
                            <div style={{fontSize:mediaQueries.mobile?"7px":"15px", textAlign:"center", width:"50%"}}>
    
                                    <Form className="mt-3">
                                        <Form.Group className="d-flex mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ width: "60%" }}>Child name</Form.Label>
                                            <Form.Control
                                            placeholder="Enter name"
                                            value={childName}
                                            onChange={(e) => setChildName(e.target.value)}
                                            style={{fontSize:mediaQueries.mobile?"5px":"15px"}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "60%" }}>Child Age</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Age"
                                            value={childAge}
                                            onChange={(e) => setChildAge(e.target.value)}
                                            style={{fontSize:mediaQueries.mobile?"5px":"15px"}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "60%" }}>Club</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Club"
                                            value={club}
                                            onChange={(e) => setClub(e.target.value)}
                                            style={{fontSize:mediaQueries.mobile?"5px":"15px"}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "60%" }}>Comments for Coach</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Comments"
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                            style={{fontSize:mediaQueries.mobile?"5px":"15px"}}
                                            />
                                        </Form.Group>
                                        {/* For the coupon code */}
                                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                                            <Form.Label style={{ width: "60%" }}>Coupon</Form.Label>
                                            <Form.Control
                                            placeholder="Enter Coupon Code (Leave empty if not)"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                            style={{fontSize:mediaQueries.mobile?"5px":"15px"}}
                                        />
                                        </Form.Group>
                                        {/*This will show a warning if an incorrect code is inputted */}
                                        {validCode ? <a style={{color:"red"}}>Please input a valid code</a>:<></>}
                                        {!mediaQueries.mobile?<>
                                        <div className="mt-5 d-flex justify-content-around">
                                            <div>
                                            Both Days<br/><span style={{fontSize:mediaQueries.mobile?"20px":"50px"}}>$150</span>
                                            </div>
                                            <div>
                                                One Day<br/><span style={{fontSize:mediaQueries.mobile?"20px":"50px"}}>$100</span>
                                            </div>
                                        </div>
                                        Select which days you want to join (Select both for the full experience)
                                        <DropdownButton
                                            as={ButtonGroup}
                                            size={mediaQueries.mobile?"sm":"lg"}
                                            title={selectedOption}
                                            onSelect={handleOptionSelect}
                                            variant="secondary"
                                            style = {{width:mediaQueries.mobile?"20%":'100%', paddingTop:"20px"}}
                                        >
                                            <Dropdown.Item eventKey="Both Days">Both Days</Dropdown.Item>
                                            <Dropdown.Item eventKey="Day One">Day One ({firstDate})</Dropdown.Item>
                                            <Dropdown.Item eventKey="Day Two">Day Two ({secondDate})</Dropdown.Item>
                                        </DropdownButton></>:<></>}
                                        <Button
                                            className="mt-3"
                                            style={{ backgroundColor: "white", color: "black", width: "100%", fontSize:mediaQueries.mobile?"10px":'30px' }}
                                            onClick={() => handleAddingCart()}
                                            disabled={isButtonDisabled}
                                        >
                                            Add to cart
                                        </Button>
                                    </Form>
  
                           </div>
                        </div>
                    </div>
                </div>
                :
                <>

                </>
            }
        </div>
        
    )
}

export default Campbox;