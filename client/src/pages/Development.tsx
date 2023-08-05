import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import AcademyItem from "./Components/AcademyItem";

type AcademyType = {
    name:string,
    time:String,
    start:String,
    Location:String,
    dates: String[],
}

function Development(){
    const [ academy, setAcademy ] = useState<AcademyType[]>([])
    const text = 
    "Preparation sessions run by ex-Swans Academy players who utilise drills and skills used previously in Academy tryouts. All kids will be given a graded in a range of skills replicating the high-pressure environment and process of the academy. ";

    useEffect(() => {
        async function fetchAcad() {
          const response = await fetch("http://localhost:3000/academy");
          const newAcad = await response.json();
          setAcademy(newAcad);
        }
        fetchAcad();
      }, [])

    return (
        <>
            <NavBar />
            <Header title="Academy Preparation" description={text}/>
            <div className="d-flex mt-5">
                {academy.map((val,indx) => (
                    <>
                    <AcademyItem name={val.name} Location={val.Location} start={val.start} time={val.time} dates={val.dates}/>
                    </>
                ) )}
            </div>
        </>
    )
}

export default Development;