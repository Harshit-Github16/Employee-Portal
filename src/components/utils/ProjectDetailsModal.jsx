// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Stepper, Step, StepLabel } from '@mui/material';
// import moment from 'moment';
// import {
//   Home as HomeIcon,
//   Schedule as ScheduleIcon,
//   PlayArrow as PlayArrowIcon,
//   CheckCircle as CheckCircleIcon,
// } from '@mui/icons-material';
// const ProjectDetailsModal = ({ open, onClose, project }) => {


//   const renderAgreement = (agreement) => (
//     <Grid container spacing={1} key={agreement.name}>
//       <Grid item xs={6}>
//         <Typography variant="body1">{agreement.name}:</Typography>
//       </Grid>
//       <Grid item xs={6}>
//         <Typography variant="body1">{agreement.checked ? '✔️' : '❌'}</Typography>
//       </Grid>
//       {agreement.checked && (
//         <Grid item xs={12}>
//           <Typography variant="body2">Date: {moment(agreement.dateTime).format("DD-MM-YYYY")}</Typography>
//         </Grid>
//       )}
//     </Grid>
//   );

//   const agreements = [
//     { name: 'MSA', checked: project?.agreements.msa.checked, dateTime: project?.agreements.msa.dateTime },
//     { name: 'DSA', checked: project?.agreements.dsa.checked, dateTime: project?.agreements.dsa.dateTime },
//     { name: 'Non-Solicitation', checked: project?.agreements.nonSolicitation.checked, dateTime: project?.agreements.nonSolicitation.dateTime },
//   ];
// const activeStep = project?.projectStatus=="0"?  project?.projectStatus+1: project?.projectStatus

// const steps = [
//   { label: 'Initial', icon: <HomeIcon /> },
//   { label: 'Planning', icon: <ScheduleIcon /> },
//   { label: 'Running', icon: <PlayArrowIcon /> },
//   { label: 'Completed', icon: <CheckCircleIcon /> },
// ];
//   return (
//     { name: 'MSA', checked: project?.agreements.msa.checked, dateTime: project?.agreements.msa.dateTime },
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>Project Details</DialogTitle>
//       <DialogContent>
//         {project ? (

//           <>
//             <div className='my-5'>  
//             <Stepper activeStep={activeStep}>
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel
//               className={`flex items-center ${
//                 index < activeStep ? 'text-green-500' : 'text-gray-400'
//               } ${index === activeStep ? 'text-green-700 font-bold' : ''}`}
//               StepIconComponent={() => (
//                 <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
//                   index < activeStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
//                 }`}>
//                   {step.icon}
//                 </span>
//               )}
//             >
//               {step.label}
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//             </div> 
//           <div>
//             <Typography variant="h6">{project.projectName}</Typography>
//             <Typography variant="body1">Type: {project.projectType}</Typography>
//             <Typography variant="body1">Source: {project.source}</Typography>
//             <Typography variant="body1">Representative: {project.representative}</Typography>
//             <Typography variant="body1">Client: {project.clientName}</Typography>
//             <Typography variant="body1">Project Details: {project.projectDetails}</Typography>
//             <Typography variant="body1">Contact: {project.contactPerson}</Typography>
//             <Typography variant="body1">Contact No: {project.contactNumber}</Typography>
//             <Typography variant="body1">First Talk Date: {moment(project.firstTalkDate).format("DD-MM-YYYY")}</Typography>
//             <Typography variant="body1">Result of First Talk: {project.resultFirstTalk}</Typography>
//             <Typography variant="body1">Send Email: {project.sendEmail ? 'Yes' : 'No'}</Typography>
//             <Typography variant="body1">Interested: {project.interested ? 'Yes' : 'No'}</Typography>

//             <Typography variant="h6" style={{ marginTop: '16px' }}>Agreements:</Typography>
//             {agreements.map(agreement => renderAgreement(agreement))}

//             <Typography variant="h6" style={{ marginTop: '16px' }}>Resource Details:</Typography>
//             {project.resources.map((resource, index) => (
//               <div key={index} style={{ marginBottom: '8px' }}>
//                 <Typography variant="body1">Assigned To: {resource.assignedTo}</Typography>
//                 <Typography variant="body1">Number of Resources: {resource.numberOfResources}</Typography>
//                 <Typography variant="body1">Start Date: {moment(resource.startDate).format("DD-MM-YYYY")}</Typography>
//                 <Typography variant="body1">Expected End Date: {moment(resource.expectedEndDate).format("DD-MM-YYYY")}</Typography>
//                 <Typography variant="body1">Remarks: {resource.remarks}</Typography>
//               </div>
//             ))}
//           </div>  
//           </>
       
//         ) : (
//           <Typography variant="body1" color="textSecondary">No project selected.</Typography>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ProjectDetailsModal;




import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Stepper,
  Step,
  StepLabel,
  ButtonGroup,
  Box,
} from "@mui/material";
import moment from "moment";
import {
  Home as HomeIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import ProgressCard from "../utils/ProgressCard";
 
const ProjectDetailsModal = ({ open, onClose, project }) => {
  const [progressStep , setProgressStep] = useState(1);
  const [activeBtn, setActiveBtn] = useState(0);
 
  const renderAgreement = (agreement) => (
    <Grid container spacing={1} key={agreement.name}>
      <Grid item xs={6}>
        <Typography variant="body1">{agreement.name}:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          {agreement.checked ? "✔️" : "❌"}
        </Typography>
      </Grid>
      {agreement.checked && (
        <Grid item xs={12}>
          <Typography variant="body2">
            Date: {moment(agreement.dateTime).format("DD-MM-YYYY")}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
 
  const agreements = [
    {
      name: "MSA",
      checked: project?.agreements.msa.checked,
      dateTime: project?.agreements.msa.dateTime,
    },
    {
      name: "DSA",
      checked: project?.agreements.dsa.checked,
      dateTime: project?.agreements.dsa.dateTime,
    },
    {
      name: "Non-Solicitation",
      checked: project?.agreements.nonSolicitation.checked,
      dateTime: project?.agreements.nonSolicitation.dateTime,
    },
  ];
 
  const activeStep =
    project?.projectStatus === "0"
      ? project?.projectStatus + 1
      : project?.projectStatus;
 
  const steps = [
    { label: "Initial", icon: <HomeIcon /> },
    { label: "Planning", icon: <ScheduleIcon /> },
    { label: "Running", icon: <PlayArrowIcon /> },
    { label: "Completed", icon: <CheckCircleIcon /> },
  ];
  
  function handleProgressBtn(index){
    setActiveBtn(index);
    setProgressStep(index + 1);
  }
 
let btnTextColor = null;
function getColor(index){
  if(activeBtn == index){
    btnTextColor = 'black';
    return 'white';
  }else{
   btnTextColor = 'white';
   return "rgb(53, 184, 55)";
  }
}
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Project Details</DialogTitle>
      <DialogContent>
        {project ? (
          <>
            <div className="my-5">
              <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      className={`flex items-center ${
                        index < activeStep ? "text-green-500" : "text-gray-400"
                      } ${
                        index === activeStep ? "text-green-700 font-bold" : ""
                      }`}
                      StepIconComponent={() => (
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            index < activeStep
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {step.icon}
                        </span>
                      )}
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <Box display="flex" justifyContent="center" mt={2}>
              <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                {
                  ['Initial','Planning','Running','Complete'].map((ele,ind)=>{
                      return(
                       <Button className="progressBtn" onClick={(e) => handleProgressBtn(ind)} style={{backgroundColor:getColor(ind),color:btnTextColor}} value={ind}>
                         {ele}
                       </Button>
                      )
                  })
                }
              </ButtonGroup>
            </Box>
            {progressStep == 1 ? (
              <div>
                <Typography variant="h6">{project.projectName}</Typography>
                <Typography variant="body1">
                  Type: {project.projectType}
                </Typography>
                <Typography variant="body1">
                  Source: {project.source}
                </Typography>
                <Typography variant="body1">
                  Representative: {project.representative}
                </Typography>
                <Typography variant="body1">
                  Client: {project.clientName}
                </Typography>
                <Typography variant="body1">
                  Project Details: {project.projectDetails}
                </Typography>
                <Typography variant="body1">
                  Contact: {project.contactPerson}
                </Typography>
                <Typography variant="body1">
                  Contact No: {project.contactNumber}
                </Typography>
                <Typography variant="body1">
                  First Talk Date:{" "}
                  {moment(project.firstTalkDate).format("DD-MM-YYYY")}
                </Typography>
                <Typography variant="body1">
                  Result of First Talk: {project.resultFirstTalk}
                </Typography>
                <Typography variant="body1">
                  Send Email: {project.sendEmail ? "Yes" : "No"}
                </Typography>
                <Typography variant="body1">
                  Interested: {project.interested ? "Yes" : "No"}
                </Typography>
 
                <Typography variant="h6" style={{ marginTop: "16px" }}>
                  Agreements:
                </Typography>
                {agreements.map((agreement) => renderAgreement(agreement))}
 
                <Typography variant="h6" style={{ marginTop: "16px" }}>
                  Resource Details:
                </Typography>
                {project.resources.map((resource, index) => (
                  <div key={index} style={{ marginBottom: "8px" }}>
                    <Typography variant="body1">
                      Assigned To: {resource.assignedTo}
                    </Typography>
                    <Typography variant="body1">
                      Number of Resources: {resource.numberOfResources}
                    </Typography>
                    <Typography variant="body1">
                      Start Date:{" "}
                      {moment(resource.startDate).format("DD-MM-YYYY")}
                    </Typography>
                    <Typography variant="body1">
                      Expected End Date:{" "}
                      {moment(resource.expectedEndDate).format("DD-MM-YYYY")}
                    </Typography>
                    <Typography variant="body1">
                      Remarks: {resource.remarks}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : progressStep == 2 ? (
              <ProgressCard heading='Plaining' />
            ) : progressStep == 3 ? (
              <ProgressCard heading='Running' />
            ) : progressStep == 4 ? (
              <ProgressCard heading='Complete' />
            ) : null}
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No project selected.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default ProjectDetailsModal;