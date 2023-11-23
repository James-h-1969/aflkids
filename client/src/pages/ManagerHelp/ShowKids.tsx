import { Button } from "react-bootstrap"
import { Kids, Child } from "../../types/kidsType"
import { useState } from "react"
import "../manager.css"
import { ColourScheme } from "../../globalVar";

export default function ShowKids({kids}:Kids){
    const [showKids, setShowKids] = useState(false);


    function KidLine({ childName, childAge, childComments, childClub, day1, day2, parent }: Child){
        const [showingParent, setShowingParent] = useState(false);

        if (parent === undefined){
            return <></>
        }
        return(
                <div className="d-flex mt-3 p-1" style={{backgroundColor:"white", borderRadius:"10px"}}>
                    <div>{childName}</div>
                    <div style={{position:"absolute", left: "40vh"}}>{childAge}</div>
                    <div style={{position:"absolute", left: "50vh", paddingRight:"90vh"}}>{childComments}</div>
                    <div style={{position:"absolute", left: "110vh"}}>{childClub}</div>
                    <div className="need_hover" onClick={() => setShowingParent(!showingParent)} style={{position:"absolute", left: "160vh", backgroundColor:"grey", borderRadius:"5px", paddingLeft:"10px", paddingRight:"10px"}}>View Parent</div>
                    {day1 ? (
                        <div className="rounded-circle" style={{ position: "absolute", left: "130vh", backgroundColor: "grey", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            1
                        </div>
                    ) : (
                        <></>
                    )}
                    {day2 ? (
                        <div className="rounded-circle" style={{ position: "absolute", left: "135vh", backgroundColor: "grey", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            2
                        </div>
                    ) : (
                        <></>
                    )}
                    {showingParent ? 
                    <div className="">
                        <div className="d-flex flex-column align-items-center pt-2" style={{
                            position: "absolute",
                            right:"300px",
                            width: "300px",
                            height: "100px",
                            backgroundColor: "grey",
                            zIndex: "100",
                            borderRadius: "15px",
                            color: "white"
                        }}>
                            <div style={{ fontWeight: "bold" }}>{parent.parentname}</div>
                            <div>{parent.email}</div>
                            <div>{parent.phone}</div>
                            <div className="postion-relative">
                            <div
                            onClick={() => setShowingParent(false)}
                            className="need_hover rounded-circle bg-danger d-flex justify-content-center align-items-center"
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                color: "white",
                                position: "absolute",
                                top: "0",
                                right: "0",
                                zIndex: "101"
                            }}
                        >
                            X
                        </div>
                        </div>
                        </div>
                        

                        </div>
                    :<></>}
                </div>
        )
    }


    return(
        <>
            <Button onClick={() => setShowKids(!showKids)} style={{backgroundColor:ColourScheme.defaultColour, border:"transparent"}}>{ !showKids? <>Show Kids</>:<>Hide Kids</>}</Button>
        { !showKids? <></>:<div className="p-3">
            <div className="d-flex mt-3 p-1" style={{fontWeight:"bold"}}>
                <div>Name</div>
                <div style={{position:"absolute", left: "40vh"}}>Age</div>
                <div style={{position:"absolute", left: "50vh", paddingRight:"70vh"}}>Comments</div>
                <div style={{position:"absolute", left: "130vh"}}>Club</div>
                <div  style={{ position: "absolute", left: "160vh"}}>Days</div>
            </div>
    
            {kids.map((value: Child, index) => (
                <KidLine key={index} {...value} />
            ))}
        </div>
}
        </>
    )
}