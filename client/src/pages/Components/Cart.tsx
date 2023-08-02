import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/cartContext";
import {CartItem} from "./CartItem";
import storeItems from "../data/items.json"

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

    async function handleCheckoutButton(){
        closeCart();
        fetch('http://localhost:3000/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems.filter(item => item.quantity !== null).map(item => ({
                  id: item.id,
                  quantity: item.quantity,
                  details: item.details
                }))
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }) .then(({ url }) => {
            window.location = url;
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
                <Button variant="secondary" className="w-100" onClick={() => handleCheckoutButton()}>
                    Checkout
                </Button>

            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    );
}