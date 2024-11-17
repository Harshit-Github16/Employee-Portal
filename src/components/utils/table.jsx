// // components/UserTable.js

// import React, {useState} from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,  Typography, Button,Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { deleteUser } from '@/_services/services_api';
// import moment from 'moment';
// import { styled } from '@mui/material/styles';
// import { Visibility, Edit, Delete, Pause } from '@mui/icons-material';
// export const UserTable = ({ data }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Department</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data?.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.id}</TableCell>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{user.department}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export const PrrojectTable = ({ data }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Start Date</TableCell>
//             <TableCell>End Date</TableCell>
//             <TableCell>Assigned To</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data?.map((project) => (
//             <TableRow key={project.id}>
//               <TableCell>{project.name}</TableCell>
//               <TableCell>{moment(project.startDate).format("DD-MM-YYYY")}</TableCell>
//               <TableCell>{moment(project.endDate).format("DD-MM-YYYY")}</TableCell>
//               <TableCell>{project.assignedTo}</TableCell>
//               <TableCell>{project.status}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export const LeaveTable = ({ data }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Start Date</TableCell>
//             <TableCell>End Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data?.map((leave) => (
//             <TableRow key={leave.id}>
//               <TableCell>{leave.name}</TableCell>
//               <TableCell>{moment(leave.startDate).format("DD-MM-YYYY")}</TableCell>
//               <TableCell>{moment(leave.endDate).format("DD-MM-YYYY")}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };


// export const EmployeeTable = ({ data }) => {
//   const handleDelete = (user) => {
//     deleteUser(user._id);
//   };

//   const handleUpdate = (id) => {
//     console.log(`Update user with id: ${id}`);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <input type="checkbox" />
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Name</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Position</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Email</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Company Name</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Mobile Number</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Secondary Number</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Probation</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">DOB</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Address</Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" className="text-sm">Actions</Typography>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data?.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>
//                 <input type="checkbox" />
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">{`${user.firstName} ${user.lastName}`}</Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">{user.Role}</Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">{user.email}</Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">{user.companyName}</Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">{user.mobileNumber}</Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">{user.emergencyNumber}</Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">{user.probationMonths}</Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">
//                   {moment(user.dateOfBirth).format("DD-MM-YYYY")}
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body2" className="text-sm">{user.address}</Typography>
//               </TableCell>
//               <TableCell>
//                 <IconButton onClick={() => handleUpdate(user.id)} color="primary">
//                   <FontAwesomeIcon icon={faEdit} />
//                 </IconButton>
//                 <IconButton onClick={() => handleDelete(user)} color="error">
//                   <FontAwesomeIcon icon={faTrash} />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };



// const options = [
//   { value: "1", label: "Yet to start" },
//   { value: "2", label: "Planning" },
//   { value: "3", label: "Running" },
//   { value: "4", label: "Completed" },
//   { value: "5", label: "Hold" }
// ];

// export const ProjectListTable = ({ projectData, onViewDetails, onDeleteProject,handleStatusChange, value }) => (

//   <TableContainer component={Paper} className="w-full shadow-lg p-4">
//     {/* { console.log("projectData projectData",  projectData, onViewDetails, onDeleteProject,handleStatusChange, value)} */}
//     <Table sx={{ borderCollapse: 'collapse', width: '100%' }}>
//       <TableHead>
//         <TableRow>
//           {['Project Name', 'Type', 'Client Name', 'Contact Person', 'Start Date', 'Assigned To', 'Contact No.','Change status', 'Actions'].map((header) => (
//             <TableCell align="right" key={header}>
//               <Typography variant="body2" className="text-sm">{header}</Typography>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {projectData.map((project, index) => (
//           <TableRow key={index} sx={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
//             <TableCell>{project.projectName}</TableCell>
//             <TableCell align="right">{project.projectType}</TableCell>
//             <TableCell align="right">{project.clientName}</TableCell>
//             <TableCell align="right">{project.contactPerson}</TableCell>
//             <TableCell align="right">{moment(project.resources[0].startDate).format("DD-MM-YYYY")}</TableCell>
//             <TableCell align="right">{project.resources[0].assignedTo}</TableCell>
//             <TableCell align="right">{project.contactNumber}</TableCell>
//             {/* <TableCell align="right">{project.interested ? 'Interested' : 'Not Interested'}</TableCell> */}
//             <TableCell align="right">
//             <FormControl variant="outlined" size="small" fullWidth>
//       <InputLabel id="view-label">View</InputLabel>
//       <Select
//   labelId="view-label"
//   value={value}
//   onChange={(event) => handleStatusChange(event, project)}
//   label={options.find(option => option.value === value)?.label || ''}
// >
//   {options.map((option) => (
//     <MenuItem key={option.value} value={option.value}>
//       {option.label}
//     </MenuItem>
//   ))}
// </Select><Select
//   labelId="view-label"
//   value={value}
//   onChange={(event) => handleStatusChange(event, project)}
//   label={options.find(option => option.value === value)?.label || ''}
// >
//   {options.map((option) => (
//     <MenuItem key={option.value} value={option.value}>
//       {option.label}
//     </MenuItem>
//   ))}
// </Select>
//     </FormControl>
//             </TableCell>
//             <TableCell align="right" sx={{ border: '1px solid #ddd', width: '120px' }}>
//               <div className="flex justify-around">
//                 <IconButton color="primary" size="small" onClick={() => onViewDetails(project)}>
//                   <Visibility />
//                 </IconButton>

//                 {/* <IconButton color="secondary" size="small"><Edit /></IconButton> */}
//                 <IconButton color="error" size="small" onClick={() => onDeleteProject(project)}><Delete /></IconButton>
//                 {/* <IconButton color="default" size="small"><Pause /></IconButton> */}
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );




// components/UserTable.js
'use client'
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteUser } from '@/_services/services_api';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { Visibility, Edit, Delete, Pause } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export const UserTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const PrrojectTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{moment(project.startDate).format("DD-MM-YYYY")}</TableCell>
              <TableCell>{moment(project.endDate).format("DD-MM-YYYY")}</TableCell>
              <TableCell>{project.assignedTo}</TableCell>
              <TableCell>{project.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const LeaveTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.name}</TableCell>
              <TableCell>{moment(leave.startDate).format("DD-MM-YYYY")}</TableCell>
              <TableCell>{moment(leave.endDate).format("DD-MM-YYYY")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export const EmployeeTable = ({ data }) => {
  const handleDelete = (user) => {
    deleteUser(user._id);
  };

  const handleUpdate = (id) => {
    console.log(`Update user with id: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <input type="checkbox" />
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Position</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Email</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Company Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Mobile Number</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Secondary Number</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Probation</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">DOB</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Address</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" className="text-sm">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">{`${user.firstName} ${user.lastName}`}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">{user.Role}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">{user.email}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">{user.companyName}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">{user.mobileNumber}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">{user.emergencyNumber}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">{user.probationMonths}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">
                  {moment(user.dateOfBirth).format("DD-MM-YYYY")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-sm">{user.address}</Typography>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleUpdate(user.id)} color="primary">
                  <FontAwesomeIcon icon={faEdit} />
                </IconButton>
                <IconButton onClick={() => handleDelete(user)} color="error">
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



const options = {
  1: "Initial",
  2: "Planning",
  3: "Running",
  4: "Completed",
  5: "Hold Not Complete",
};

export const ProjectListTable = ({ projectData, onViewDetails, onDeleteProject, handleStatusChange, value }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevents render until mounted on client side

  return (
    <TableContainer component={Paper} className="w-full shadow-lg p-4">
      <Table sx={{ borderCollapse: 'collapse', width: '100%' }}>
        <TableHead>
          <TableRow>
            {['Project Name', 'Type', 'Client Name', 'Contact Person', 'Start Date', 'Assigned To', 'Contact No.', 'Change status', 'Actions'].map((header) => (
              <TableCell align="right" key={header}>
                <Typography variant="body2" className="text-sm">{header}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {projectData.map((project, index) => (
            <TableRow key={project._id} sx={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell onClick={() => router.push(`/projectTracker?projectName=${(project._id)}`)}>
                {project.projectName}
              </TableCell>
              <TableCell align="right">{project.projectType}</TableCell>
              <TableCell align="right">{project.clientName}</TableCell>
              <TableCell align="right">{project.contactPerson}</TableCell>
              <TableCell align="right">
                {project.resources[0].startDate
                  ? moment(project.resources[0].startDate).format("DD-MM-YYYY")
                  : 'N/A'
                }
              </TableCell>
              <TableCell align="right">
                {project.resources[0].assignedTo.map((item) => {
                  if (typeof (item) === 'string') {
                    return '---';
                  } else return item.label + ' , ';
                })}
              </TableCell>
              <TableCell align="right">{project.contactNumber}</TableCell>
              <TableCell align="right">
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="view-label">view</InputLabel>
                  {/* {console.log("ssss",project.projectStatus)} */}
                  <Select
                    labelId="view-label"
                    // value={project.projectStatus}
                    onChange={(event) => handleStatusChange(event, project)}
                    label={options[project.projectStatus]}
                  >
                    <MenuItem value={1}>Initial</MenuItem>
                    <MenuItem value={2}>Planning</MenuItem>
                    <MenuItem value={3}>Running</MenuItem>
                    <MenuItem value={4}>Completed</MenuItem>
                    <MenuItem value={5}>Hold Not Complete</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="right" sx={{ border: '1px solid #ddd', width: '120px' }}>
                <div className="flex justify-around">
                  <IconButton color="primary" size="small" onClick={() => onViewDetails(project)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={() => onDeleteProject(project)}>
                    <Delete />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};