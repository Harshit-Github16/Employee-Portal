// import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import {getAllEmployee} from '@/_services/services_api';
 
 
// const animatedComponents = makeAnimated();
 
// export default function MultipleSelectChipy({assignTo , isMultiChips}){
//   const [employee,setEmployee] = useState([]);
//   useEffect(()=>{
//     const fetchEmployeeData = async ()=>{
//       try{
//         const data = await getAllEmployee();
//         data.data.map((obj,index)=>{
//             const {_id,firstName,lastName} = obj;
//             setEmployee(prev=>[...prev , {
//               "value":_id,
//               "label":`${firstName} ${lastName}`,
//             }]);
//         });
//         // setEmployee(data.data);
//         console.log(employee);
//       }catch(err){
//         console.error("Error fetching projects:",err);
//       }
//     }
//     fetchEmployeeData();
//   },[])
//   // const employee = [
//   //   { value: '123', label: 'juber' },
//   //   { value: '343', label: 'manohar' },
//   //   { value: '543', label: 'ganesh' },
//   //   { value: '010', label: 'john' },
//   // ]
//   const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected ? 'white' : 'transparent',
//       color: 'black', // You can also customize the text color
//     }),
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: 'white',
//     }),
//   };
 
//   const handleSelectOptions = async (selectedOptions)=>{
//     assignTo(selectedOptions);
//   }
//   return (   
//     isMultiChips == true
//     ? 
//     (<Select
//     closeMenuOnSelect={false}
//     components={animatedComponents}
//     // defaultValue={[options[4], options[5]]}
//     placeholder='assigned To'
//     isMulti
//     options={employee}
//     onChange={handleSelectOptions}
//     styles={customStyles}
//   /> )
//   : 
//   (<Select
//   closeMenuOnSelect={true}
//   components={animatedComponents}
//   // defaultValue={[options[4], options[5]]}
//   placeholder='POC'
//   options={employee}
//   onChange={handleSelectOptions}
//   styles={customStyles}
// />)

// );
// }


import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllEmployee } from '@/_services/services_api';
import { Select as MuiSelect, MenuItem, InputLabel, FormControl } from '@mui/material'; // Import Material-UI components

const animatedComponents = makeAnimated();

export default function MultipleSelectChipy({ assignTo, isMultiChips }) {
  const [employee, setEmployee] = useState([]);
  const [POC , setPOC] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await getAllEmployee();
        data.data.forEach((obj) => {
          const { _id, firstName, lastName } = obj;
          setEmployee((prev) => [
            ...prev,
            {
              value: _id,
              label: `${firstName} ${lastName}`,
            },
          ]);
        });
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployeeData();
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'transparent',
      color: 'black', // Customize text color
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };

  const handleSelectOptions = async (selectedOptions) => {
    assignTo(selectedOptions);
  };

  // Conditional rendering of Select component
  return isMultiChips ? (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      placeholder="Assigned To"
      isMulti
      options={employee}
      onChange={handleSelectOptions}
      styles={customStyles}
    />
  ) : (
   
<FormControl fullWidth size="small">
  <InputLabel id="select-label">POC</InputLabel>
  <MuiSelect
    labelId="select-label"
    value={POC}
    onChange={(e) =>{
      setPOC(e.target.value)
    }}
    displayEmpty
    renderValue={(selected) => selected?.label || 'POC'}
    sx={{
      '& .MuiInputBase-root': {
        bgcolor: 'white',
        borderRadius: 1,
      },
      '& .MuiInputLabel-root': {
        color: 'text.secondary',
      },
    }}
  >
    {employee.map((emp) => (
      <MenuItem key={emp.value} value={emp}>
        {emp.label}
      </MenuItem>
    ))}
  </MuiSelect>
</FormControl>
);
}
