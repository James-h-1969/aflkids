import { Button, Offcanvas, Stack, Form } from "react-bootstrap";
import { useCart } from "../context/cartContext";
import {CartItem} from "./CartItem";
import storeItems from "../data/items.json"
import { useState } from "react";
import { backendLink } from "../../globalVar";

type CartProps = {
    isOpen: boolean;
}

type details = {
    childName: string,
    childAge: string,
    childComments: string,
    childClub: string,
    purchaseName: string
}

interface CartItem {
    id: number;
    quantity: number;
    details?: details
}

export function Cart({isOpen}:CartProps){
    const { closeCart, cartItems } = useCart();
    const [ emailAddress, setEmailAdress ] = useState("");
    const [ customerName, setCustomerName ] = useState("");

    async function handleCheckoutButton(){
        closeCart();
        fetch(`${backendLink}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems.filter(item => item.quantity !== null).map(item => ({
                  id: item.id,
                  quantity: item.quantity,
                  details: item.details
                })),
                customerName: customerName,   // Include customer name in the request
                customerEmail: emailAddress,   // Include customer email in the request
            }),
        
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }) .then(({ url }) => {
            window.parent.postMessage(url, "https://www.aflkids.com.au/") // so wix changes its url\
            window.location.assign(url); // changes the current url to work
        }).catch(e => {
            console.error(e.error);
        })
    }

    return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                Cart 
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map((item) => (
                    <CartItem key={item.id}{...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {" $"}
                    {cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(i => i.id === cartItem.id)
                        return total + (item?.priceNum || 0)  * cartItem.quantity;
                    }, 0).toFixed(2)}
                </div>
                <Form>
                    <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Control
                            placeholder="Enter Parent Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            />
                    </Form.Group>
                    <Form.Group className="d-flex mb-3" controlId="formBasicPassword">
                            <Form.Control
                            placeholder="Enter Email Address"
                            value={emailAddress}
                            onChange={(e) => setEmailAdress(e.target.value)}
                            />
                    </Form.Group>
                    
                </Form>
                <Button disabled={!(customerName.length > 0 && emailAddress.length > 0)}variant="secondary" className="w-100" onClick={() => handleCheckoutButton()}>
                    Checkout
                </Button>

            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    );
}