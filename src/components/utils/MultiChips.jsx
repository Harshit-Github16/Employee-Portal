import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {getAllEmployee} from '@/_services/services_api';
 
 
const animatedComponents = makeAnimated();
 
export default function MultipleSelectChipy({assignTo}){
  const [employee,setEmployee] = useState([]);
  useEffect(()=>{
    const fetchEmployeeData = async ()=>{
      try{
        const data = await getAllEmployee();
        data.data.map((obj,index)=>{
            const {_id,firstName,lastName} = obj;
            setEmployee(prev=>[...prev , {
              "value":_id,
              "label":`${firstName} ${lastName}`,
            }]);
        });
        // setEmployee(data.data);
        console.log(employee);
      }catch(err){
        console.error("Error fetching projects:",err);
      }
    }
    fetchEmployeeData();
  },[])
  // const employee = [
  //   { value: '123', label: 'juber' },
  //   { value: '343', label: 'manohar' },
  //   { value: '543', label: 'ganesh' },
  //   { value: '010', label: 'john' },
  // ]
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'transparent',
      color: 'black', // You can also customize the text color
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };
 
  const handleSelectOptions = async (selectedOptions)=>{
    assignTo(selectedOptions);
  }
  return (
    <Select
    closeMenuOnSelect={false}
    components={animatedComponents}
    // defaultValue={[options[4], options[5]]}
    isMulti
    options={employee}
    onChange={handleSelectOptions}
    styles={customStyles}
  />
  );
}