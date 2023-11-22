import { useState, useEffect } from "react"
import { Parent } from "../../types/parentType"
import { Button } from "react-bootstrap";
import "../manager.css"
import { backendLink } from "../../globalVar";


export default function ParentSection(){
    const [parentsSections, setParentsSection] = useState<Array<Parent[]>>([]);
    const [parentsIndex, setParentsIndex] = useState(0);
    const [showingParents, setShowingParents] = useState(false);


    useEffect(() => {
        async function fetchParents() {
          const response = await fetch(`${backendLink}/Parents`);
          const parents = await response.json();
          let parent_sections = []
          let current_parent_Section = []
          for (let i = 0; i < parents.length; i++){
            current_parent_Section.push(parents[i]);
            if (i % 10 == 0 && i != 0){
                parent_sections.push(current_parent_Section);
                current_parent_Section = [];
            }
          }
          if (current_parent_Section.length > 0){ // gets the remainding parents
            parent_sections.push(current_parent_Section);
          }
          setParentsSection(parent_sections);
        }
        fetchParents();
      }, [])

    function updateIndex(change:number){ 
        if (parentsIndex + change < 0 || parentsIndex + change >= parentsSections.length){
            return
        }
        let newIndex = parentsIndex + change;
        setParentsIndex(newIndex);
    }

    
    
    return(
        <div className="mb-5">
            <Button className="ms-3" onClick={() => setShowingParents(!showingParents)} style={{backgroundColor:"#46768E", border:"transparent"}}>{!showingParents ? "View Parents":"Hide Parents"}</Button>
            {showingParents?
            <>
            <div className="d-flex gap-2 ms-3 mt-3">
                <div onClick={() => updateIndex(-1)} className="need_hover rounded-circle" style={{width:"40px", height:"40px", backgroundColor:"#46768E", color:"white", textAlign:"center"}}>{"<"}</div>
                <div onClick={() => updateIndex(1)} className="need_hover rounded-circle" style={{width:"40px", height:"40px", backgroundColor:"#46768E", color:"white", textAlign:"center"}}>{">"}</div>
                <div>{parentsIndex+1}/{parentsSections.length}</div>
            </div>
            <div className="mb-1 ms-3">
                <div className="d-flex mt-3 p-1" style={{fontWeight:"bold"}}>
                    <div>Name</div>
                    <div style={{position:"absolute", left: "40vh"}}>Email</div>
                    <div style={{position:"absolute", left: "80vh", paddingRight:"70vh"}}>Phone Number</div>
                </div>
                {parentsSections[parentsIndex].map((value: Parent) => (
                    <div className="d-flex mt-3 p-1">
                        <div>{value.parentname}</div>
                        <div style={{position:"absolute", left: "40vh"}}>{value.email}</div>
                        <div style={{position:"absolute", left: "80vh"}}>{value.phone}</div>
                    </div>
                ))
                }
            </div></>:<></>
            }
        </div>
    )
}