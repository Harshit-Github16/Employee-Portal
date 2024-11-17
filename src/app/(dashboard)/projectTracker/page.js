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

//   const handleSubmit1 = (e) => {
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
//     handleSubmit1();
//   }

//   return (
//     <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
//       <CardHeader title="Project Creation Form" />
//       <CardContent>
//         <form onSubmit={handleSubmit1}>
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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Link } from "@mui/icons-material";
export default function ProjectForm() {
  const router = useRouter();
  console.log("router.query", router.query)
  const { projectName } = router.query || {};
  const [selectedProject, setSelectedProject] = useState("");
  const [projectslist, setProjectList] = useState([]); // State to hold fetched projects
  const [isInterested, setIsInterested] = useState(0);
  const [chipValue, setChipValue] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "", // Set default to the first item
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
        assignedTo2: [],
        numberOfResources: "",
        startDate: "",
        remarks: "",
        expectedEndDate: "",
        assignedTo: [],
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

    // You can now use projectName, e.g., to set the initial project name in the form.
    if (projectName) {
      setFormData((prev) => ({
        ...prev,
        projectName: projectName,  // Set the form's projectName from the URL parameter
      }));
    }
    setSelectedProject(projectName);
  }, [projectName]);
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

  // setSelectedProject(newprojectName);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjectList(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();

    const url = new URL(window.location.href);
    const newprojectName = url.searchParams.get("projectName");

    if (newprojectName !== undefined) {
      setSelectedProject(newprojectName);
    }
  }, []);

  useEffect(() => {
    if (selectedProject && projectslist.length > 0) {
      handleProjectSelect(selectedProject);
    }
  }, [projectslist, selectedProject]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectSelect = (project) => {
    const selectedValue = projectslist.filter((item) => item._id === project);

    const convertDate = (inputDate) => {
      console.log("inputDate", inputDate);
      const date = new Date(inputDate);

      // Extract date components
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();

      // Format as YYYY-MM-DD for the date input
      const formattedDate = `${year}-${month}-${day}`;
      console.log("formattedDate", formattedDate);
      return formattedDate;
    };

    if (selectedValue.length === 1) {
      const projectData = selectedValue[0];
      const firstTalk = convertDate(projectData.firstTalkDate);
      console.log("projectData", firstTalk);

      setSelectedProject(projectData.projectName);
      setFormData({
        ...formData,
        projectName: projectData.projectName,
        projectType: projectData.projectType,
        source: projectData.source,
        representative: projectData.representative,
        clientName: projectData.clientName,
        projectDetails: projectData.projectDetails,
        contactPerson: projectData.contactPerson,
        contactNumber: projectData.contactNumber,
        firstTalkDate: firstTalk,  // Now in YYYY-MM-DD format
        sendEmail: projectData.sendEmail,
      });
    }
  };


  const handleResourceChange = (index, field, value) => {
    console.log("rohit check ", field, value);
    const newResources = [...formData.resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setFormData((prev) => ({ ...prev, resources: newResources }));
  };
  console.log("formdata", formData)
  const handleAgreementChange = (agreement, field, value) => {
    setFormData((prev) => ({
      ...prev,
      agreements: {
        ...prev.agreements,
        [agreement]: { ...prev.agreements[agreement], [field]: value },
      },
    }));
  };

  const handleSubmit1 = async (e) => {
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
    handleSubmit1();
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }
  const Checkfield = () => {
    if (formData.projectName == "") {


    }
  }
  const [checked, setChecked] = useState(false);  // Manage checked state
  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <ToastContainer
        position="top-right" // Positions the toasts at the top-right corner
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false} Project Creation Form
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CardHeader title="Project Creation Form" />
      <CardContent>
        <Grid container justifyContent="flex-start" spacing={2} sx={{ mb: 3 }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => setIsInterested(0)}>
              1st Talk
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => setIsInterested(1)}>
              Project Creation
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={() => setIsInterested(2)}>
              Resources Planning
            </Button>
          </Grid>
          <Grid item>
            {/* <Button variant="contained" color="error" onClick={()=>setIsInterested(0)}>
        Button 4
      </Button> */}
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit1}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputLabel id="select-project-label">
                Select Existing Project
              </InputLabel>assignedTo
              <Select
                labelId="select-project-label"
                fullWidth
                value={selectedProject || "none"} // Show "none" if no project is selected
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "none") {
                    // Reset selectedProject to "none" and clear form fields if desired
                    setSelectedProject("none");
                    setFormData({
                      projectName: "",
                      projectType: "", // Set default to the first item
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
                          assignedTo2: [],
                          numberOfResources: "",
                          startDate: "",
                          remarks: "",
                          expectedEndDate: "",
                          assignedTo: [],

                        },
                      ],
                      agreements: {
                        msa: { checked: false, dateTime: "" },
                        dsa: { checked: false, dateTime: "" },
                        nonSolicitation: { checked: false, dateTime: "" },
                      },
                    });
                  } else {
                    const selected = projectslist.find((project) => project.projectName === value);
                    if (selected) {
                      setSelectedProject(selected.projectName);
                      handleProjectSelect(selected._id);
                    }
                  }
                }}
                disabled={isInterested === 1 || isInterested === 2} // Disable when isInterested is 1 or 2
              >
                {/* "None" option */}
                <MenuItem value="none">None</MenuItem>

                {/* Existing options from projectslist */}
                {projectslist.map((project) => (
                  <MenuItem key={project.id} value={project.projectName}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {isInterested === 0 ? (
              // When `isInterested` is 0, show the first part (e.g., a message or a simplified form)
              // <Typography variant="h6" sx={{ mt: 4, fontSize: "1.1rem", fontWeight: 'bold' }}>
              //   Please complete the required fields to proceed.
              // </Typography>
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Project Name"
                    value={formData.projectName}
                    onChange={(e) => handleChange("projectName", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <InputLabel id="project-type-label">Project Type</InputLabel> */}
                  <Select
                    labelId="project-type-label"
                    fullWidth
                    value={formData.projectType}
                    className="h-[40px]"
                    onChange={(e) => handleChange("projectType", e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <em>Select Project Type</em>
                    </MenuItem>
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
                    onChange={(e) => handleChange("representative", e.target.value)}
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
                    onChange={(e) => handleChange("contactPerson", e.target.value)}
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
                    onChange={(e) => handleChange("firstTalkDate", e.target.value)}
                    required
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
                    onChange={(e) => handleChange("projectDetails", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.sendEmail}
                        onChange={(e) => handleChange("sendEmail", e.target.checked)}
                        required
                      />
                    }
                    label="Send Email to Client"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.sendWhatsApp || false}
                        onChange={(e) => handleChange("sendWhatsApp", e.target.checked)}
                        required
                      />
                    }
                    label="Send Message on WhatsApp to Client"
                  />
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      onClick={(e) => {
                        setIsInterested(
                          formData.projectName === '' ||
                            formData.firstTalkDate === '' ||
                            !formData.sendWhatsApp ||
                            !formData.sendEmail
                            ? 0
                            : 1
                        );
                      }}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) :
              isInterested === 1 ? (
                // When `isInterested` is 1, show the form to fill in details
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mt: 4, fontSize: "1.1rem", fontWeight: 'bold' }}>
                      Follow-up Actions
                    </Typography>
                    {Object.entries(formData.agreements).map(
                      ([agreement, { checked, dateTime }]) => (
                        <Grid container key={agreement} alignItems="center" spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checked}
                                  onChange={(e) =>
                                    handleAgreementChange(agreement, "checked", e.target.checked)
                                  }
                                />
                              }
                              label={agreement.toUpperCase()}
                              sx={{ fontWeight: 'bold' }}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={8}>
                            <TextField
                              fullWidth
                              size="small"
                              type="datetime-local"
                              value={dateTime}
                              onChange={(e) =>
                                handleAgreementChange(agreement, "dateTime", e.target.value)
                              }
                              InputLabelProps={{ shrink: true }}
                              sx={{ width: "100%" }}
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
                      label="Project List"
                      value={formData.resultFirstTalk}
                      onChange={(e) => handleChange("resultFirstTalk", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
                    <Grid item>
                      {/* <Button variant="contained" color="primary" type="submit">
          Back
        </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={() => setIsInterested(0)}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item>
                      {/* <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        onClick={() =>
                          setIsInterested(2)
                        }
                      >
                        Next
                      </Button> */}
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        onClick={() => {
                          // Check if the checkbox is checked
                          console.log("Checkbox checked:", checked);  // Debugging line
                          if (checked) {
                            setIsInterested(2); // Call the method if checked
                            console.log("Method executed successfully!");  // Debugging line
                          } else {
                            alert("Please agree to the terms before proceeding.");
                          }
                        }}
                      >
                        Next
                      </Button>

                    </Grid>
                  </Grid>
                </>
              )
                : isInterested === 2 ? (
                  // When `isInterested` is 2, show follow-up actions or another part of the form
                  <>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                        Resources Planning
                      </Typography>
                      {formData.resources.map((resource, index) => (
                        <Grid container key={index} spacing={2} sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 1, bgcolor: 'grey.50' }}>
                          {Object.entries(resource).map(([field, value]) => {
                            if(field == "assignedTo2"){
                              return (
                                <Grid item xs={12} sm={6} key={field}>
                                  <MultipleSelectChip assignTo={setChipValue} isMultiChips={false}/>
                                </Grid>
                              );
                            }
                            else if (field == "assignedTo") {
                              return (
                                <Grid item xs={12} sm={6} key={field}>
                                  <MultipleSelectChip assignTo={setChipValue} isMultiChips={true}/>
                                </Grid>
                              );
                            } else {
                              return (
                                <Grid item xs={12} sm={6} key={field}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label={field.replace(/([A-Z])/g, " $1").toLowerCase()}
                                    value={value}
                                    onChange={(e) =>
                                      handleResourceChange(index, field, e.target.value)
                                    }
                                    slotProps={{
                                      inputLabel: { shrink: true, sx: { zIndex: 1 } },
                                    }}
                                    type={field.includes("Date") ? "date" : "text"}
                                    sx={{
                                      '& .MuiInputBase-root': {
                                        bgcolor: 'white',
                                        borderRadius: 1,
                                      },
                                      '& .MuiInputLabel-root': {
                                        color: 'text.secondary',
                                      }
                                    }}
                                  />
                                </Grid>
                                
                              );
                            }
                          })}
                        </Grid>
                      ))}
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        rows={4}
                        label="Project List"
                        value={formData.resultFirstTalk}
                        onChange={(e) => handleChange("resultFirstTalk", e.target.value)}
                        sx={{
                          '& .MuiInputBase-root': {
                            bgcolor: 'white',
                            borderRadius: 1,
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="button"
                          onClick={() => setIsInterested(1)}
                          sx={{
                            bgcolor: 'primary.600',
                            '&:hover': { bgcolor: 'grey.800' },
                            mr: 1,
                            px: 4,
                          }}
                        >
                          Back
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="success"
                          type="submit"
                          onClick={() => router.push('/dashboard')}
                          sx={{
                            bgcolor: 'sucess.main',
                            '&:hover': { bgcolor: 'primary.dark' },
                            px: 4,
                          }}
                        >

                          Save


                        </Button>
                      </Grid>
                    </Grid>
                  </>

                ) : null}
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}