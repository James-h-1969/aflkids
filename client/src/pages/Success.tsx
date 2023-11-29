import { useEffect } from "react";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
// import { useCart } from "./context/cartContext";

export default function Success(){
    // const { cartItems, removeFromCart } = useCart();

    useEffect(() => {
        //update DB
        // cartItems.forEach((item) => {
        //     removeFromCart(item.id);
        // })
    }, []);

    return(
        <>
        <NavBar />
        <Header title="Success" description="Your payment was a success. Thanks for booking with AFLKids."/>
        </>
    )
}