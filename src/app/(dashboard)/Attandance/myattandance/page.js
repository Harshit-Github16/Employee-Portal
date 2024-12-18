"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Dialog, Accordion, AccordionSummary, Grid, Box, AccordionDetails, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
// import { Typography, Grid, Box } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
export default function AttendancePage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [attendances, setAttendances] = useState([])
  const [Totalattendances, setTotalAttendances] = useState([])
  const [Totalabsent, setTotalAbent] = useState([])


  const [open, setOpen] = useState(false)

  useEffect(() => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 6)
    setStartDate(formatDate(start))
    setEndDate(formatDate(end))
    fetchData(formatDate(start), formatDate(end))
    fetchweeksummray(formatDate(start), formatDate(end))
  }, [])

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const fetchData = async (start, end) => {
    try {
      const authToken = localStorage.getItem('auth-token')
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {}
      const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${start}&endDate=${end}`
      const response = await axios.get(url, { headers })

      setAttendances(response.data.attendances || [])
    } catch (error) {
      console.error(error)
    }
  }

  const fetchweeksummray = async (start, end) => {
    try {
      const authToken = localStorage.getItem('auth-token')
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {}
      const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/weekSummary?startDate=${start}&endDate=${end}`
      const response = await axios.get(url, { headers })
      console.log("response", response.data.weeklySummary)

      // setTotalAttendances(response.data.weeklySummary.map((res)=>{
      //   if(res.attendance==true){
      //      return res.attendance
      //   }
      // }) || [])
      setTotalAttendances(response.data.weeklySummary.reduce((count, res) => {
        if (res.attendance === true) {
          count++;
        }
        return count;
      }, 0));


      setTotalAbent(response.data.weeklySummary.reduce((count, res) => {
        if (res.isAbsent === true) {
          count++;
        }
        return count;
      }, 0));
    } catch (error) {
      console.error(error)
    }
  }

  console.log(Totalattendances)
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(startDate, endDate)

  }



  const totalWorkingHours = attendances.reduce((total, attendance) => {
    const totalDuration = attendance.totalDuration;
    function convertToSeconds(duration) {
      const [hours, minutes, seconds] = duration.split(":").map(Number);
      return (hours * 3600) + (minutes * 60) + seconds;
    }
    let totalDurationInSeconds = convertToSeconds(totalDuration);
    return total + totalDurationInSeconds;

  }, 0);


  function convertSecondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600); // Get the full hours
    const minutes = Math.floor((seconds % 3600) / 60); // Get the remaining minutes
    const remainingSeconds = seconds % 60; // Get the remaining seconds

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  const tester = convertSecondsToHMS(totalWorkingHours)

  // Function to format the time as HH:MM (12-hour format)
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // const suffix = hours >= 12 ? 'PM' : 'AM';
    const suffix = hours >= 12 ? '' : '';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${suffix}`;
  }



  // const [open, setOpen] = useState(false);
  const [attendances1, setAttendances1] = useState([
    {
      date: '',
      loginTime: '',
      logoutTime: '',
      status: '',
    },
    // Example data, you can add more rows dynamically
  ]);

  // Function to handle opening the dialog
  const handleClickOpen = (checkIn, checkout) => {
    setOpen(true)
    console.log(checkIn, checkout)
    setAttendances1({
      date: '2024-11-10',
      loginTime: checkIn,
      logoutTime: checkout,
      status: 'in',
    })
  }

  // Function to handle closing the dialog
  const handleClose = () => {

    setOpen(false)
  }

  // const handleClickOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const handleApply = (newAttendance) => {
  //   setAttendances1([
  //     ...attendances1,
  //     {
  //       date: new Date().toLocaleDateString(),
  //       loginTime: newAttendance.loginTime,
  //       logoutTime: newAttendance.logoutTime,
  //       status: newAttendance.status,
  //     },
  //   ]);
  // };


  // Handle changes in the input fields
  const handleLoginTimeChange = (e) => {
    setAttendances1({ ...attendances1, loginTime: e.target.value });
  };

  const handleLogoutTimeChange = (e) => {
    setAttendances1({ ...attendances1, logoutTime: e.target.value });
  };

  const handleStatusChange = (e) => {
    setAttendances1({ ...attendances1, status: e.target.value });
  };

  // Handle form submission (when "Apply" is clicked)
  const handleFormSubmit = () => {
    handleSubmit(attendances1); // Pass the updated attendance data to the parent
    handleClose(); // Close the dialog after submitting
  };


  const [open1, setOpen1] = React.useState(1);

  const handleOpen = (value) => setOpen1(open1 === value ? 0 : value);

  return (
    <Container maxWidth="lg" className="bg-white p-8 rounded-lg shadow-lg">
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-700 mb-6">
        Employee Attendance
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          className="w-full md:w-auto"
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          className="w-full md:w-auto"
        />
        <Button type="submit" variant="contained" color="primary" className="bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          View
        </Button>
      </form>
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between">
          <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Total Present: {Totalattendances}</Typography>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Total Absent: {Totalabsent}</Typography>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Total Work: 25/75 Hours</Typography>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Total Week: 7</Typography>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Total Public: 3</Typography>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Holiday: 2</Typography>
          </div>
        </div>
      </div>

      <TableContainer component={Paper} className="shadow-lg rounded-lg">
        <Table>
          <TableHead className="bg-blue-500">
            <TableRow>
              <TableCell className="text-white font-semibold">Date</TableCell>
              <TableCell className="text-white font-semibold">First Login time</TableCell>
              <TableCell className="text-white font-semibold">Logout time</TableCell>
              <TableCell className="text-white font-semibold">Working Hour</TableCell>
              <TableCell className="text-white font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.length > 0 ? (
              attendances.map((attendance) => (

                <TableRow key={attendance.date} className="hover:bg-gray-100">
                  <TableCell className=" border-b w-[30%]">
                    <Accordion className=''>
                      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography >{attendance.date}   </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          {attendance.sessions.map((session, index) => (
                            <Grid item xs={12} key={index}>
                              <Box
                                sx={{
                                  border: '1px solid #ddd',
                                  borderRadius: '8px',
                                  padding: '16px',
                                  marginBottom: '8px',
                                  backgroundColor: '#f9f9f9',
                                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }}
                              >
                                {/* <Typography variant="body1" fontWeight="bold">Session {index + 1}</Typography> */}
                                <Box display="flex" justifyContent="space-between" mt={1}>
                                  <Typography variant="body2">
                                    <strong>Check-In:</strong> {formatTime(session.checkIn)}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Check-Out:</strong> {formatTime(session.checkOut)}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion> </TableCell>
                  <TableCell className="p-4 border-b">{formatTime(attendance.sessions[0].checkIn)}</TableCell>
                  <TableCell className="p-4 border-b">{formatTime(attendance.sessions[attendance.sessions.length - 1].checkOut)}</TableCell>
                  <TableCell className="p-4 border-b">{attendance.totalDuration}</TableCell>
                  <TableCell className="p-4 border-b">
                    <Button variant="outlined"
                      onClick={() => handleClickOpen(
                        formatTime(attendance.sessions[0].checkIn),
                        formatTime(attendance.sessions[attendance.sessions.length - 1].checkOut)
                      )} >Regularise</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4 text-gray-500">
                  No attendance records found for this date range.
                </TableCell>
              </TableRow>
            )}
            {/* Add a row for total working hours at the bottom */}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold p-4">
                <Typography variant="h6" className="text-gray-700">Total Working Hours</Typography>
              </TableCell>
              <TableCell className="p-4">
                <Typography
                  variant="h6"
                  className="text-blue-600 font-semibold text-center"
                  component="span"  // Use 'span' to avoid adding extra block spacing
                >
                  {tester} Hours
                </Typography>
              </TableCell>
              <TableCell className="p-4"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Box */}
      <Dialog open={open} className='w-50 mx-auto' onClose={handleClose}>
        <DialogTitle>Regularise Attendance</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
          <TextField
            label="Login Time"
            type="text"
            value={attendances1.loginTime}
            onChange={handleLoginTimeChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Logout Time"
            type="text"
            value={attendances1.logoutTime}
            onChange={handleLogoutTimeChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={attendances1.status}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="in">In</MenuItem>
              <MenuItem value="out">Out</MenuItem>
              <MenuItem value="both">Both</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
