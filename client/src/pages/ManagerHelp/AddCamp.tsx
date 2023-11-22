import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { locations } from "../../types/campType";
import { backendLink } from "../../globalVar";


type AddCampProps = {
    setShowingAddCamp: (showing: boolean) => void
}


export default function AddCamp({setShowingAddCamp}:AddCampProps){
    const [campName, setCampName] = useState("");
    const [campAgeRange, setCampAgeRange] = useState("");
    const [campDate, setCampDate] = useState("");
    const [campTimes, setCampTimes] = useState("");
    const [campLocation, setCampLocation] = useState("");

    async function addTheCamp(e:React.FormEvent<HTMLFormElement>){        
        e.preventDefault()

        let Address = "";
        let Pic = "";

        if (locations[campLocation] != undefined){
            Address = locations[campLocation].address;
            Pic = locations[campLocation].locPic;
        } 

        const newCamp = {
            name_: campName,
            ages_: campAgeRange,
            date_: campDate,
            times_: campTimes,
            Price_: 150, 
            Location_: campLocation,
            address_: Address,
            locPic_: Pic
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if required
            },
            body: JSON.stringify(newCamp),
          };

        fetch(`${backendLink}/camps`, requestOptions)

        location.reload();
    }

    return(
        <div className="p-3" style={{position:"absolute", width:"400px", height:"500px", backgroundColor:"grey", borderRadius:"15px", left:"30vw", zIndex:'100'}}>
            <div className= "d-flex justify-content-between">
                <h3>Add a Camp</h3>
                <div className="circle" onClick={() => setShowingAddCamp(false)}><div className="plus">x</div></div>
            </div>
            <Form className="mt-4" onSubmit={addTheCamp}>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Name</Form.Label>
                    <Form.Control
                    placeholder="Enter Name of Camp"
                    value={campName}
                    onChange={(e) => setCampName(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Age Range</Form.Label>
                    <Form.Control
                    placeholder="Enter Age Range of Camp"
                    value={campAgeRange}
                    onChange={(e) => setCampAgeRange(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Dates</Form.Label>
                    <Form.Control
                    placeholder="Enter Camp Dates"
                    value={campDate}
                    onChange={(e) => setCampDate(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Time of Day</Form.Label>
                    <Form.Control
                    placeholder="Enter Camp Times"
                    value={campTimes}
                    onChange={(e) => setCampTimes(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Camp Location</Form.Label>
                    <Form.Control
                    placeholder="Enter Camp Location (Weldon/Gore)"
                    value={campLocation}
                    onChange={(e) => setCampLocation(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Button type="submit">Add Camp</Button>
            </Form>
        </div>
    )
}