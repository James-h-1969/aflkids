import { useCart } from "../../context/cartContext";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import storeItems from "../../data/items.json"
import useMediaQueries from "media-queries-in-react";
import { backendLink } from "../../../globalVar";
// import { ColourScheme } from "../../../globalVar";

// type storeItemType = {
//     id:number,
//     name:String
// }


type AddSessionProps = {
    id: number;
    location:string;
    date:string;
    time:string;
    price: number;
    name: string;
}

//add a bunch of backend adding it to the system

export default function AddSession(props:AddSessionProps){

    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
    });

    const { addToCart } = useCart();
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');
    const [club, setClub] = useState('');
    const [comments, setComments] = useState('');
    const [token, setToken] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [email, setEmail] = useState('');

    async function isTokenRight(token:string, id:number){
        // let newHash = await bcrypt.hash(token, 10);
        const response = await fetch('http://localhost:3000/checkTokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, token: token }),
            });
        const data = await response.json();
        console.log(data);
        return response.ok

    }


    async function handleAddingCart(){
        let ID = props.id;

        if (token.length > 0){ // the token field has been used 
            let isValid = await isTokenRight(token, props.id);
            if (isValid){ //check if valid token
                ID = ID === 3 ? 14 : 15;
            } else {
                setShowWarning(true);
                return
            }
        }
        
        const Customdetails = {
            childName: childName,
            childAge: childAge,
            childComments: comments,
            childClub: club,
            purchaseName: [props.name, props.time, token]
        }

        addToCart(ID, 1, Customdetails);
        location.reload();
    }


    const isEmailingPossible =  email && childName && childAge && club;
    
    return(
        <div className="p-2 ps-4 pe-4" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"15px", margin:mediaQueries.mobile?"20px":"40px"}}>
            <Form className="mt-5">
                        <Form.Group className="d-flex mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ width: "50%" }}>Parent Email</Form.Label>
                            <Form.Control
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ width: "50%" }}>Child name(s)</Form.Label>
                            <Form.Control
                            placeholder="Enter name(s), comma seperated"
                            value={childName}
                            onChange={(e) => setChildName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: "50%" }}>Child Age(s)</Form.Label>
                            <Form.Control
                            placeholder="Enter Age(s), comma seperated"
                            value={childAge}
                            onChange={(e) => setChildAge(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: "50%" }}>Club(s)</Form.Label>
                            <Form.Control
                            placeholder="Enter Club(s), comma seperated"
                            value={club}
                            onChange={(e) => setClub(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: "50%" }}>Comments for Coach</Form.Label>
                            <Form.Control
                            placeholder="Enter Comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ width: "50%" }}>Plan Token</Form.Label>
                            <Form.Control
                            placeholder="Enter Token if available"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            />
                        </Form.Group>
                        { showWarning ?                    
                         <div style={{color:"red"}}>
                            Either input a valid token or none at all
                        </div>: <></>}

                    </Form>
            <div className="p-3 d-flex m-5">
                <div className="d-flex justify-content-around align-items-center gap-4" style={{width:"100%"}}>
                    <div>
                        <span style={{fontSize:mediaQueries.mobile?"13px":"20px"}}>
                            {props.date}
                        </span>
                        <span style={{marginLeft:"30px"}}>
                            {props.time}
                        </span>
                    </div>
                    <span style={{fontSize:mediaQueries.mobile?"13px":"20px"}}>{props.location}</span>
                    <div className="" >
                        <span style={{fontWeight:"bold"}}>${props.price}.00</span>
                    </div>
                </div>
                <Button variant="secondary" style={{width:"300px", cursor:"pointer"}} onClick={() => handleAddingCart()}>Add session</Button>
            </div>
        </div>
    )
}

