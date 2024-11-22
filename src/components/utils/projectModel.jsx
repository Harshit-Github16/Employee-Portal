"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useForm, FormProvider, Controller } from "react-hook-form"
import { getAllProjects } from "@/_services/services_api"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Box,
    Grid,
    Typography,
} from "@mui/material"

const MultiStepFormModal = React.memo(({ isOpen, onClose, projectId, projectName }) => {
    const [step, setStep] = useState(1)
    const [projectList, setProjectList] = useState([])
    const [selectedProject, setSelectedProject] = useState(null) // to track selected project
    const methods = useForm()
    const { control, handleSubmit, getValues, setValue } = methods

    const fetchProjects = async () => {
        try {
            const response = await getAllProjects()
            setProjectList(response.data)
            console.log("Projects fetched:", response.data)
        } catch (error) {
            console.error("Error fetching projects:", error)
        }
    }

    // Call fetchProjects when the modal opens
    useEffect(() => {
        if (isOpen) {
            fetchProjects()
            // If projectId is passed, pre-select the project
            if (projectId) {
                const project = projectList.find((project) => project._id === projectId)
                if (project) {
                    setSelectedProject(project)
                    // Pre-fill project-related fields when a project is selected
                    setValue("existingProject", project._id)
                    setValue("projectName", project.projectName)
                    setValue("clientName", project.clientName || "")
                    setValue("contactPerson", project.contactPerson || "")
                    setValue("source", project.source || "")
                    setValue("representative", project.representative || "")
                    setValue("contactNumber", project.contactNumber || "")
                    setValue("firstTalkDate", project.firstTalkDate || "")
                    setValue("projectDetails", project.projectDetails || "")
                    setValue("sendEmail", project.sendEmail || false)
                    setValue("sendWhatsAppToClient", project.sendWhatsAppToClient || false)
                }
            }
        }
    }, [isOpen, projectId, projectList, setValue])

    // Function to handle project selection and auto-fill fields
    const handleProjectChange = (projectId) => {
        const selected = projectList.find((project) => project._id === projectId)
        setSelectedProject(selected)
        // Pre-fill project-related fields when a project is selected
        if (selected) {
            setValue("projectName", selected.projectName)
            setValue("clientName", selected.clientName || "")
            setValue("contactPerson", selected.contactPerson || "")
            setValue("source", selected.source || "")
            setValue("representative", selected.representative || "")
            setValue("contactNumber", selected.contactNumber || "")
            setValue("firstTalkDate", selected.firstTalkDate || "")
            setValue("projectDetails", selected.projectDetails || "")
            setValue("sendEmail", selected.sendEmail || false)
            setValue("sendWhatsAppToClient", selected.sendWhatsAppToClient || false)
        }
    }

    const onSubmit = useCallback((data) => {
        if (step < 4) {
            setStep(step + 1)
        } else {
            console.log(data)
            onClose()
        }
    }, [step, onClose])

    const renderStep = useCallback(() => {
        switch (step) {
            case 1:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>Talk Step</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="existing-project-label">Select Existing Project</InputLabel>
                                    <Controller
                                        name="existingProject"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                labelId="existing-project-label"
                                                label="Select Existing Project"
                                                {...field}
                                                disabled={true} // Disable the Select input
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    handleProjectChange(e.target.value) // Populate data when project is selected
                                                }}
                                            >
                                                {projectList.map((project) => (
                                                    <MenuItem key={project._id} value={project._id}>
                                                        {project.projectName} {/* Display project name */}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            {/* Other fields */}
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="projectName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Project Name *" fullWidth disabled />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="clientName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Client Name" fullWidth disabled />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="contactPerson"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Contact Person Name" fullWidth disabled />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="source"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Source of Project Name" fullWidth disabled />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="representative"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Representative Name" fullWidth disabled />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="contactNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Contact Person Number" type="number" fullWidth disabled />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="firstTalkDate"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Date of 1st Task *"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            value={field.value ? field.value.split('T')[0] : ''} // Format date to YYYY-MM-DD
                                            disabled // Disable the Date input
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="projectDetails"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Project Details"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            disabled // Disable the Textarea input
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="sendEmail"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={field.value} disabled />} // Disable the Checkbox
                                            label="Send Email to Client"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="sendWhatsAppToClient"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={field.value} disabled />} // Disable the Checkbox
                                            label="Send WhatsApp to Client"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )
            case 2:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>Project Creation - Follow-up Actions</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Controller
                                            name="msa"
                                            control={control}
                                            render={({ field }) => <Checkbox {...field} />}
                                        />
                                    }
                                    label="MSA *"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Controller
                                            name="dsa"
                                            control={control}
                                            render={({ field }) => <Checkbox {...field} />}
                                        />
                                    }
                                    label="DSA *"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Controller
                                            name="nonSolicitation"
                                            control={control}
                                            render={({ field }) => <Checkbox {...field} />}
                                        />
                                    }
                                    label="NON-SOLICITATION *"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="projectList"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Project List" multiline rows={4} fullWidth />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="date1"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Date 1" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="date2"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Date 2" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="date3"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Date 3" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>Resource Planning</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="poc-label">POC</InputLabel>
                                    <Controller
                                        name="poc"
                                        control={control}
                                        render={({ field }) => (
                                            <Select labelId="poc-label" label="POC" {...field}>
                                                <MenuItem value="poc1">POC 1</MenuItem>
                                                <MenuItem value="poc2">POC 2</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="numberOfResources"
                                    control={control}
                                    render={({ field }) => <TextField {...field} label="Number of Resources" type="number" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="expectedStartDate"
                                    control={control}
                                    render={({ field }) => <TextField {...field} label="Expected Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="expectedEndDate"
                                    control={control}
                                    render={({ field }) => <TextField {...field} label="Expected End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 4:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>Completed</Typography>
                        <Box sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1 }}>
                            <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(getValues(), null, 2)}</pre>
                        </Box>
                    </Box>
                );
            default:
                return null
        }
    }, [step, getValues, projectList])

    return (

        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Multi-Step Form</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <div className="mb-4 flex space-x-4">
                        {[1, 2, 3, 4].map((stepIndex) => (
                            <Button
                                key={stepIndex}
                                className={`px-4 py-2 ${step === stepIndex ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                                onClick={() => setStep(stepIndex)}
                            >
                                Step {stepIndex}
                            </Button>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {renderStep()}
                        <Box className="flex justify-between mt-4">
                            {step > 1 && (
                                <Button variant="outlined" onClick={() => setStep(step - 1)}>Previous</Button>
                            )}
                            <Button type="submit" variant="contained" className="ml-auto">
                                {step === 4 ? "Submit" : "Next"}
                            </Button>
                        </Box>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
})

export default MultiStepFormModal
