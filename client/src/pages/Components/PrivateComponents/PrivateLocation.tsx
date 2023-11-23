import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Components.css';
import useMediaQueries from "media-queries-in-react";
import { ColourScheme } from '../../../globalVar';

type PrivateLocationProps = {
  showTimetable: () => void;
  step1: (location:string) => void;
}

function PrivateLocation({showTimetable, step1}:PrivateLocationProps) {
  const [selectedOption, setSelectedOption] = useState('Choose location');

  const handleOptionSelect = (eventKey: string | null) => {
    showTimetable();
    if (eventKey) {
      setSelectedOption(eventKey);
      step1(eventKey);
    }
  };

  const mediaQueries = useMediaQueries({ 
    mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
});

  return (
    <div>
      <div className="">
        <h1><span className="" style={{color:ColourScheme.defaultColour, marginLeft:mediaQueries.mobile?"20px":"80px", fontFamily:"Rubik", fontWeight:"bold", fontSize:mediaQueries.mobile?"30px":"50px"}}>Book Session</span></h1>
      </div>
      <div className="d-flex justify-content-between align-items-center private-location-box" style={{margin:mediaQueries.mobile?"20px":"50px", padding:mediaQueries.mobile?"20px":"30px"}}>
        <h1 className="mr-auto"><span className="step1" style={{fontSize:mediaQueries.mobile?"20px":'40px'}}>Step 1: Choose Location</span></h1>
        <div className="" style={{marginRight:mediaQueries.mobile?"":"200px"}}>
          <DropdownButton
            as={ButtonGroup}
            size={mediaQueries.mobile?"sm":"lg"}
            title={selectedOption}
            onSelect={handleOptionSelect}
            variant="secondary"
            style = {{width:mediaQueries.mobile?"20%":'40px'}}
          >
            <Dropdown.Item eventKey="Northern Beaches">Northern Beaches</Dropdown.Item>
            <Dropdown.Item eventKey="North Shore">North Shore</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>    
    </div>
  );
  
}

export default PrivateLocation;


