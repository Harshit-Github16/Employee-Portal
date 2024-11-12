// 'use client'

// import React, { useState, useEffect } from 'react'
// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Switch,
//   TextField,
//   Typography
// } from '@mui/material'
// import { createProject, getAllProjects } from '@/_services/services_api'

// export default function ProjectForm() {
//   const [selectedProject, setSelectedProject] = useState('')
//   const [projectslist, setProjectList] = useState([]) // State to hold fetched projects
//   const [isInterested, setIsInterested] = useState(false)
//   const [formData, setFormData] = useState({
//     projectName: '',
//     projectType: 'web', // Set default to the first item
//     source: '',
//     interested: true,
//     representative: '',
//     clientName: '',
//     projectDetails: '',
//     contactPerson: '',
//     contactNumber: '',
//     firstTalkDate: '',
//     sendEmail: false,
//     resultFirstTalk: '',
//     resources: [{ assignedTo: '', numberOfResources: '', startDate: '', expectedEndDate: '', remarks: '' }],
//     agreements: {
//       msa: { checked: false, dateTime: '' },
//       dsa: { checked: false, dateTime: '' },
//       nonSolicitation: { checked: false, dateTime: '' },
//     }
//   })

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await getAllProjects();
//         setProjectList(response.data); // Assuming response is an array of projects
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     }
//     fetchProjects();
//   }, [])

//   const handleChange = (name, value) => {
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleProjectSelect = (project) => {
    
//     setSelectedProject(project.projectName);
//     setFormData({
//       ...formData,
//       projectName: project.projectName,
//       projectType: project.projectType,
//       source: project.source,
//       representative: project.representative,
//       clientName: project.clientName,
//       projectDetails: project.projectDetails,
//       contactPerson: project.contactPerson,
//       contactNumber: project.contactNumber,
//       firstTalkDate: project.firstTalkDate,
//       sendEmail: project.sendEmail,
//       // Reset other fields if necessary
//     });
//   }

//   const handleResourceChange = (index, field, value) => {
//     const newResources = [...formData.resources]
//     newResources[index] = { ...newResources[index], [field]: value }
//     setFormData(prev => ({ ...prev, resources: newResources }))
//   }

//   const handleAgreementChange = (agreement, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       agreements: {
//         ...prev.agreements,
//         [agreement]: { ...prev.agreements[agreement], [field]: value }
//       }
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.projectName) {
//       alert("Project Name is required");
//       return;
//     }

//     console.log("Creating project with data:", formData)
//     createProject(formData);
//   }

//   const handleHold = () => {
//     setFormData(prev => ({ ...prev, interested: false }));
//     handleSubmit();
//   }

//   return (
//     <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
//       <CardHeader title="Project Creation Form" />
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={1}>
//             <Grid item xs={12}>
//               <InputLabel id="select-project-label">Select Existing Project</InputLabel>
//               <Select
//                 labelId="select-project-label"
//                 fullWidth
//                 value={selectedProject}
//                 onChange={(e) => {
//                   const selected = projectslist.find(project => project.projectName === e.target.value);
//                   if (selected) {
//                     handleProjectSelect(selected);
//                   }
//                 }}
//               >
//                 {projectslist.map((project) => (
//                   <MenuItem key={project.id} value={project.projectName}>
//                     {project.projectName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//             {!isInterested ? (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Project Name"
//                     value={formData.projectName}
//                     onChange={(e) => handleChange('projectName', e.target.value)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <InputLabel id="project-type-label">Project Type</InputLabel>
//                   <Select
//                     labelId="project-type-label"
//                     fullWidth
//                     value={formData.projectType}
//                     onChange={(e) => handleChange('projectType', e.target.value)}
//                   >
//                     <MenuItem value="web">Web</MenuItem>
//                     <MenuItem value="mobile">Mobile</MenuItem>
//                     <MenuItem value="hybrid">Hybrid</MenuItem>
//                     <MenuItem value="marketing">Marketing</MenuItem>
//                     <MenuItem value="other">Other</MenuItem>
//                   </Select>
//                 </Grid>
//                 {/* Rest of the form remains unchanged */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Source of Project"
//                     value={formData.source}
//                     onChange={(e) => handleChange('source', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Representative Name"
//                     value={formData.representative}
//                     onChange={(e) => handleChange('representative', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Client Name"
//                     value={formData.clientName}
//                     onChange={(e) => handleChange('clientName', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Contact Person Name"
//                     value={formData.contactPerson}
//                     onChange={(e) => handleChange('contactPerson', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     type="text"
//                     size="small"
//                     label="Contact Person Phone Number"
//                     value={formData.contactNumber}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (/^[\d\s\-()]*$/.test(value)) {
//                         handleChange('contactNumber', value);
//                       }
//                     }}
//                     inputProps={{ inputMode: 'numeric', pattern: '[0-9\s\-\(\)]*' }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     label="Date of 1st Talk"
//                     type="date"
//                     value={formData.firstTalkDate}
//                     onChange={(e) => handleChange('firstTalkDate', e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     multiline
//                     rows={4}
//                     label="Project Details"
//                     value={formData.projectDetails}
//                     onChange={(e) => handleChange('projectDetails', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <FormControlLabel
//                     control={
//                       <Switch
//                         checked={formData.sendEmail}
//                         onChange={(e) => handleChange('sendEmail', e.target.checked)}
//                       />
//                     }
//                     label="Send email and message on WhatsApp to client"
//                   />
//                 </Grid>
//                 <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
//                   <Grid item>
//                     <Button variant="contained" color="primary" type="submit">Submit</Button>
//                   </Grid>
//                   <Grid item>
//                     <Button variant="outlined" onClick={handleHold} type="button">Hold</Button>
//                   </Grid>
//                   <Grid item>
//                     <Button variant="contained" color="success" onClick={() => setIsInterested(true)}>Next</Button>
//                   </Grid>
//                 </Grid>
//               </>
//             ) : (
//               <>
//                 {/* Follow-up Actions and Resources Planning remain unchanged */}
//                 <Grid item xs={12}>
//                   <Typography variant="h6" sx={{ mt: 4, fontSize: '1.1rem' }}>Follow-up Actions</Typography>
//                   {Object.entries(formData.agreements).map(([agreement, { checked, dateTime }]) => (
//                     <Grid container key={agreement} alignItems="center" spacing={2}>
//                       <Grid item>
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={checked}
//                               onChange={(e) => handleAgreementChange(agreement, 'checked', e.target.checked)}
//                             />
//                           }
//                           label={agreement.toUpperCase()}
//                         />
//                       </Grid>
//                       <Grid item xs>
//                         <TextField
//                           fullWidth
//                           size="small"
//                           type="datetime-local"
//                           value={dateTime}
//                           onChange={(e) => handleAgreementChange(agreement, 'dateTime', e.target.value)}
//                           InputLabelProps={{ shrink: true }}
//                         />
//                       </Grid>
//                     </Grid>
//                   ))}
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     multiline
//                     rows={4}
//                     label="Results of the 1st Talk"
//                     value={formData.resultFirstTalk}
//                     onChange={(e) => handleChange('resultFirstTalk', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="h6">Resources Planning</Typography>
//                   {formData.resources.map((resource, index) => (
//                     <Grid container key={index} spacing={2}>
//                       {Object.entries(resource).map(([field, value]) => (
//                         <Grid item xs={12} sm={6} key={field}>
//                           <TextField
//                             fullWidth
//                             size="small"
//                             label={field.replace(/([A-Z])/g, ' $1').toLowerCase()}
//                             value={value}
//                             onChange={(e) => handleResourceChange(index, field, e.target.value)}
//                             type={field.includes('Date') ? 'date' : 'text'}
//                             InputLabelProps={{ shrink: true }}
//                           />
//                         </Grid>
//                       ))}
//                     </Grid>
//                   ))}
//                 </Grid>
//                 <Grid item xs={12} container justifyContent="flex-end">
//                   <Button variant="contained" color="success" type="submit">Submit</Button>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }





"use client";
 
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  FormControl,
  OutlinedInput,
  InputLabelProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createProject, getAllProjects } from "@/_services/services_api";
import MultipleSelectChip from "../../../components/utils/MultiChips";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProjectForm() {
  const [selectedProject, setSelectedProject] = useState("");
  const [projectslist, setProjectList] = useState([]); // State to hold fetched projects
  const [isInterested, setIsInterested] = useState(false);
  const [chipValue, setChipValue] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "web", // Set default to the first item
    source: "",
    interested: true,
    representative: "",
    clientName: "",
    projectDetails: "",
    contactPerson: "",
    contactNumber: "",
    firstTalkDate: "",
    sendEmail: false,
    resultFirstTalk: "",
    resources: [
      {
        assignedTo: [],
        numberOfResources: "",
        startDate: "",
        expectedEndDate: "",
        remarks: "",
      },
    ],
    agreements: {
      msa: { checked: false, dateTime: "" },
      dsa: { checked: false, dateTime: "" },
      nonSolicitation: { checked: false, dateTime: "" },
    },
  });
  const theme = useTheme();
 
  useEffect(() => {
    setFormData((prev) => {
      const newResources = [...prev.resources];
      newResources[0] = {
        ...newResources[0],
        assignedTo: chipValue,
      };
      return { ...prev, resources: newResources };
    });
    console.log(chipValue);
  }, [chipValue]);
 
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjectList(response.data); // Assuming response is an array of projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);
 
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleProjectSelect = (project) => {
    setSelectedProject(project.projectName);
    setFormData({
      ...formData,
      projectName: project.projectName,
      projectType: project.projectType,
      source: project.source,
      representative: project.representative,
      clientName: project.clientName,
      projectDetails: project.projectDetails,
      contactPerson: project.contactPerson,
      contactNumber: project.contactNumber,
      firstTalkDate: project.firstTalkDate,
      sendEmail: project.sendEmail,
      // Reset other fields if necessary
    });
  };
 
  const handleResourceChange = (index, field, value) => {
    console.log("rohit check ", field, value);
    const newResources = [...formData.resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setFormData((prev) => ({ ...prev, resources: newResources }));
  };
 
  const handleAgreementChange = (agreement, field, value) => {
    setFormData((prev) => ({
      ...prev,
      agreements: {
        ...prev.agreements,
        [agreement]: { ...prev.agreements[agreement], [field]: value },
      },
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.projectName) {
      alert("Project Name is required");
      return;
    }
 
    console.log("Creating project with data:", formData);
 
    try {
      const response = await createProject(formData);
      console.log("API response:", response);
      toast.success(response.message);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(response.message);
    }
  };
 
  const handleHold = () => {
    setFormData((prev) => ({ ...prev, interested: false }));
    handleSubmit();
  };
 
  function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }
 
  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <ToastContainer
        position="top-right" // Positions the toasts at the top-right corner
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CardHeader title="Project Creation Form" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputLabel id="select-project-label">
                Select Existing Project
              </InputLabel>
              <Select
                labelId="select-project-label"
                fullWidth
                value={selectedProject}
                onChange={(e) => {
                  const selected = projectslist.find(
                    (project) => project.projectName === e.target.value
                  );
                  if (selected) {
                    handleProjectSelect(selected);
                  }
                }}
              >
                {projectslist.map((project) => (
                  <MenuItem key={project.id} value={project.projectName}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {!isInterested ? (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Project Name"
                    value={formData.projectName}
                    onChange={(e) =>
                      handleChange("projectName", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="project-type-label">Project Type</InputLabel>
                  <Select
                    labelId="project-type-label"
                    fullWidth
                    value={formData.projectType}
                    onChange={(e) =>
                      handleChange("projectType", e.target.value)
                    }
                  >
                    <MenuItem value="web">Web</MenuItem>
                    <MenuItem value="mobile">Mobile</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                    <MenuItem value="marketing">Marketing</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </Grid>
                {/* Rest of the form remains unchanged */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Source of Project"
                    value={formData.source}
                    onChange={(e) => handleChange("source", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Representative Name"
                    value={formData.representative}
                    onChange={(e) =>
                      handleChange("representative", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Client Name"
                    value={formData.clientName}
                    onChange={(e) => handleChange("clientName", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Contact Person Name"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleChange("contactPerson", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    label="Contact Person Phone Number"
                    value={formData.contactNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[\d\s\-()]*$/.test(value)) {
                        handleChange("contactNumber", value);
                      }
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9s-()]*" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Date of 1st Talk"
                    type="date"
                    value={formData.firstTalkDate}
                    onChange={(e) =>
                      handleChange("firstTalkDate", e.target.value)
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    label="Project Details"
                    value={formData.projectDetails}
                    onChange={(e) =>
                      handleChange("projectDetails", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.sendEmail}
                        onChange={(e) =>
                          handleChange("sendEmail", e.target.checked)
                        }
                      />
                    }
                    label="Send Email to Client"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.sendWhatsApp || false} // Assuming a new state field for WhatsApp messaging
                        onChange={(e) =>
                          handleChange("sendWhatsApp", e.target.checked)
                        }
                      />
                    }
                    label="Send Message on WhatsApp to Client"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                      Close
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={handleHold}
                      type="button"
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => setIsInterested(true)}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                {/* Follow-up Actions and Resources Planning remain unchanged */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 4, fontSize: "1.1rem" }}>
                    Follow-up Actions
                  </Typography>
                  {Object.entries(formData.agreements).map(
                    ([agreement, { checked, dateTime }]) => (
                      <Grid
                        container
                        key={agreement}
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={(e) =>
                                  handleAgreementChange(
                                    agreement,
                                    "checked",
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={agreement.toUpperCase()}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            fullWidth
                            size="small"
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) =>
                              handleAgreementChange(
                                agreement,
                                "dateTime",
                                e.target.value
                              )
                            }
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                    )
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    label="Results of the 1st Talk"
                    value={formData.resultFirstTalk}
                    onChange={(e) =>
                      handleChange("resultFirstTalk", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Resources Planning</Typography>
                  {/* resources: [{ assignedTo: [], numberOfResources: '', startDate: '', expectedEndDate: '', remarks: '' }], */}
                  {formData.resources.map((resource, index) => (
                    <Grid container key={index} spacing={2}>
                      {Object.entries(resource).map(([field, value]) => {
                        if (field != "assignedTo") {
                          return (
                            <Grid item xs={12} sm={6} key={field}>
                              <TextField
                                fullWidth
                                size="small"
                                label={field
                                  .replace(/([A-Z])/g, " $1")
                                  .toLowerCase()}
                                value={value}
                                onChange={(e) =>
                                  handleResourceChange(
                                    index,
                                    field,
                                    e.target.value
                                  )
                                }
                                slotProps={{
                                  inputLabel: {
                                    shrink: true,
                                    sx: {
                                      zIndex: 1, // Set the desired z-index value
                                    },
                                  },
                                }}
                                type={field.includes("Date") ? "date" : "text"}
                              />
                            </Grid>
                          );
                        }
                        // Else condition handling for 'assignedTo'
                        else {
                          return (
                            <Grid item xs={12} sm={6} key={field}>
                              <MultipleSelectChip assignTo={setChipValue} />
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  ))}
                </Grid>
                {/* <Grid item xs={12} container justifyContent="flex-end">
                <Button variant="contained" color="success" type="submit" >
                    Back
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    Submit
                  </Button>
                </Grid> */}
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    className="bg-primary me-2"
 
                  
                    type="button" // Changing type to 'button' for "Back" to prevent unintended form submission
 
                    onClick={() => setIsInterested(false)}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    Submit
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}