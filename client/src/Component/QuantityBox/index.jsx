import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const QuantityBox = (props) => {
  const [inputVal, setInputVal] = useState(1);

  const minus = () => {
    // Use the functional update form of setState
    setInputVal(prevVal => (prevVal > 1 ? prevVal - 1 : prevVal));
    props.quantity(inputVal);
  };

  const plus = () => {
    setInputVal(prevVal => prevVal + 1);
  };

  useEffect(()=>{
    props.quantity(inputVal);
    //selectedItem(props.item,inputVal);

  },[inputVal]);



  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}><FaMinus /></Button>
      <input type="text" value={inputVal} readOnly />
      <Button onClick={plus}><FaPlus /></Button>
    </div>
  );
};

export default QuantityBox;