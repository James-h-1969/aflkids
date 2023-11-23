import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { ColourScheme, backendLink } from "../../globalVar";


export default function ManagerLogin(){
    const [incorrect, setIncorrect] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordHidden, setPasswordHidden] = useState("");

    function handlePasswordChange(passwordNew:string) {
        if (passwordHidden.length < passwordNew.length || password.length == 0){
            let newS = password + passwordNew.charAt(passwordNew.length - 1);
            let newString = passwordHidden + "*";
            setPasswordHidden(newString);
            setPassword(newS);
        } else if (passwordHidden.length > passwordNew.length){
            let newString =  passwordHidden.slice(0, -1);
            let newS =  password.slice(0, -1);
            setPasswordHidden(newString);
            setPassword(newS);
        }
    }

    const handleSubmit = async (event?:React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const passBody = {
            name_: "manager",
            input_: password,
        }
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if required
            },
            body: JSON.stringify(passBody),
          };

        const response = await fetch(`${backendLink}/managercheckpassword`, requestOptions);
        if (response.ok){
            console.log("Correct Password");
            sessionStorage.setItem('isLoggedin', "True");
            location.reload();
            return
        }
        console.log("Incorrect Password :{")
        setIncorrect(true)
    }
    
    return(
        <>
            <Form className="d-flex justify-content-center gap-5 mb-1" onSubmit={handleSubmit}>
                <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ width: "60%", marginRight:"20px",fontWeight:"normal", fontFamily:"Rubik" }}>Manager Login</Form.Label>
                    <Form.Control
                    placeholder="Enter Password"
                    value={passwordHidden}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    style={{fontSize:"15px"}}
                    />
                </Form.Group>
                <Button type="submit" style={{fontWeight:"normal", fontFamily:"Rubik", backgroundColor:ColourScheme.defaultColour, border:"transparent", width:"300px"}}>Login</Button>
            </Form>    
            { incorrect ?
            <div className="d-flex justify-content-center mb-5 gap-5" style={{color:"red"}}>
                Incorrect Password.
            </div>:<></>
            }        
        
        </>

    )
}