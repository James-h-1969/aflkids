import { useCart } from "../../context/cartContext";
import { Card, Button } from "react-bootstrap";
import useMediaQueries from "media-queries-in-react";

type PlanItemProps = {
    name: string,
    price: string,
    image: string,
    desc: string[],
    id: number
}

export default function PlanItem({name, price, image, desc, id}:PlanItemProps){
    const { addToCart } = useCart();

    const mediaQueries = useMediaQueries({ 
        mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
    });

    function handleAddingCart(id:number){
        let NAME = name;
        if (id == 17){
            NAME = "Test 50 cent purchase"
        }
        const Customdetails = {
            childName: "",
            childAge: "",
            childComments: "",
            childClub: "",
            purchaseName: [NAME]
        }
        addToCart(id, 1, Customdetails);
        location.reload();
    }
  
    return(
        <Card style={{height:mediaQueries.mobile?"300px":'300px', width:mediaQueries.mobile?"200px":"300px", marginBottom:"50px"}}>   
            <Card.Img variant="top" src={image} style={{height:mediaQueries.mobile?"400px":'300px', width:mediaQueries.mobile?"":"300px", objectFit:"cover", overflow:"hidden"}}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{price}</span>
                </Card.Title>
                <Button className="mt-3" onClick={() => handleAddingCart(id)}>
                    Add to cart
                </Button>
            </Card.Body>
            {/* <Button onClick={() => handleAddingCart(17)}>
                Test 50c purchase
            </Button> */}
        </Card>
    )
}