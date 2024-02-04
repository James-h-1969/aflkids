import { Button, Card, Form } from "react-bootstrap";
import { useState } from 'react';
import { useCart } from "../context/cartContext";

type AcademyItemProps = {
    name:string,
    time:String,
    start:String,
    Location:String,
    dates:String[]
}


export default function AcademyItem({name, time, start, Location, dates}:AcademyItemProps){
    const [plan, setPlan] = useState(0);
    const [timesChosen, setTimesChosen] = useState<String[]>([]);
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');
    const [club, setClub] = useState('');
    const [comments, setComments] = useState('');
    const { addToCart } = useCart();

    function handleClick(Givenplan:number){
        const emptyTimes: string[] = [];
        if (plan === Givenplan){
            setPlan(0);
            setTimesChosen(emptyTimes);
            return;
        }
        setTimesChosen(emptyTimes);
        setPlan(Givenplan);
    }

    function isDateActive(date:String){
        if (timesChosen?.find((item:String) => item === date) == null){
            return false;
        }
        return true;
    }

    function handleTimeClick(date:String){
        if (isDateActive(date)) {
            const newTimes = timesChosen.filter((item:String) => item !== date); 
            setTimesChosen(newTimes);
        }
        else {
            if (timesChosen.length >= plan){
                if (plan === 0){
                    return;
                }
                const newTimes = [date]
                setTimesChosen(newTimes);
                return;
            }
            const newTimes = timesChosen.length < 1 ? [date] : [...timesChosen, date];
            setTimesChosen(newTimes);
        }
    }

    function handleCartClick(){
        const times = timesChosen.join(" ");
        const Customdetails = {
            childName: childName,
            childAge: childAge,
            childComments: comments,
            childClub: club,
            purchaseName: [name, times]
        }
        if (plan === 1){
            addToCart(12, 1, Customdetails);
        } else {
            addToCart(13, 1, Customdetails);
        }
        location.reload();
    }

    const isButtonDisabled = !(childName && childAge && club && comments && plan == timesChosen.length);

    return(
        <Card className="mb-5 ms-5 p-3" style={{width: "500px", backgroundColor:"#46768E"}}>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                </Card.Title>
                <div className="d-flex justify-content-between fs-5">
                    <span style={{fontWeight:"bold"}}>
                        {time} (1 hr)
                    </span>
                    <span className="text-muted">
                        Starting {start}
                    </span>
                </div>
                <div className="d-flex justify-content-between fs-5">
                    <span>
                        Location:
                    </span>
                    <span className="text-muted">
                        {Location}
                    </span> 
                </div>
                <span className="mt-3">Select Amount of sessions:</span>
                <div className="d-flex justify-content-around fs-5 mt-2">
                    <div className="p-4" style={{backgroundColor: plan != 1 ? "rgb(222, 222, 231)":"grey", borderRadius:"20px", cursor:"pointer"}} onClick={() => handleClick(1)}>
                        1 session - $40
                    </div>
                    <div className="p-4" style={{backgroundColor: plan != 4 ? "rgb(222, 222, 231)":"grey",borderRadius:"20px", cursor:"pointer"}} onClick={() => handleClick(4)}>
                        4 sessions - $130
                    </div>
                </div>
                <div className="d-flex flex-column mt-4 ms-3 me-3">
                    {dates.map((date) => (
                        <div className="fs-5 mt-3 d-flex justify-content-between">
                            <span>
                                {date}
                            </span>
                            {!isDateActive(date) ? 
                                <div className="p-2" style={{backgroundColor:"rgb(222, 222, 231)", borderRadius:"10px", cursor:"pointer"}} onClick={() => handleTimeClick(date)}>
                                    Choose Date
                                </div>
                            :   <div className="p-2" style={{backgroundColor:"grey", borderRadius:"10px", cursor:"pointer"}} onClick={() => handleTimeClick(date)}>
                                    Date Chosen
                                </div>}
                        </div>
                    ))}
                </div>
                <Form className="mt-5">
                    <Form.Group className="d-flex mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ width: "50%" }}>Child name</Form.Label>
                        <Form.Control
                        placeholder="Enter name"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ width: "50%" }}>Child Age</Form.Label>
                        <Form.Control
                        placeholder="Enter Age"
                        value={childAge}
                        onChange={(e) => setChildAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ width: "50%" }}>Club</Form.Label>
                        <Form.Control
                        placeholder="Enter Club"
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
                    <Button
                        className="mt-5"
                        style={{ backgroundColor:"white", color: "black", width: "100%" }}
                        onClick={() => handleCartClick()}
                        disabled={isButtonDisabled}
                    >
                        Add to cart
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}