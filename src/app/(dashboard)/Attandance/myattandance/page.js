"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Dialog, Accordion, CardContent, Card, AccordionSummary, Grid, Box, AccordionDetails, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
// import { Typography, Grid, Box } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
export default function AttendancePage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [attendances, setAttendances] = useState([])
  const [Totalattendances, setTotalAttendances] = useState([])
  const [Totalabsent, setTotalAbent] = useState([])
  const [TotalHoliday, setTotalHoliday] = useState([])
  const [TotalWeekend, setTotalWeekend] = useState([])




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

      setTotalHoliday(response.data.weeklySummary.reduce((count, res) => {
        if (res.isHoliday === true) {
          count++;
        }
        return count;
      }, 0));

      setTotalWeekend(response.data.weeklySummary.reduce((count, res) => {
        if (res.isWeekend === true) {
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
      if (!duration) {
        duration = "00:00:00";
      }
      const [hours, minutes, seconds] = duration.split(":").map(Number);
      return (hours * 3600) + (minutes * 60) + seconds;
    }
    let totalDurationInSeconds = convertToSeconds(totalDuration);
    return total + totalDurationInSeconds;

  }, 0);


  function convertSecondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600); 
    const minutes = Math.floor((seconds % 3600) / 60); 
    const remainingSeconds = seconds % 60; 

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  const tester = convertSecondsToHMS(totalWorkingHours)
  // Convert 9:30 hours to seconds
  const nineThirtyInSeconds = (9 * 3600) + (30 * 60);
  // Multiply totalWorkingHours by 9:30 (in seconds)
  const multipliedTimeInSeconds = totalWorkingHours * nineThirtyInSeconds;
  // Convert the result back to HH:MM:SS format
  const resultTime = convertSecondsToHMS(multipliedTimeInSeconds);
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

 
  const [attendances1, setAttendances1] = useState([
    {
      date: '',
      loginTime: '',
      logoutTime: '',
      status: '',
    },
  ]);

 
  const handleClickOpen = (date, checkIn, checkout) => {
    setOpen(true)
    console.log(checkIn, checkout)
    setAttendances1({
      date: date,
      loginTime: checkIn,
      logoutTime: checkout,
      status: 'in',
    })
  }


  const handleClose = () => {
    setOpen(false)
  }
  const handleLoginTimeChange = (e) => {
    setAttendances1({ ...attendances1, loginTime: e.target.value });
  };

  const handleLogoutTimeChange = (e) => {
    setAttendances1({ ...attendances1, logoutTime: e.target.value });
  };

  const handleStatusChange = (e) => {
    setAttendances1({ ...attendances1, status: e.target.value });
  };


  const handleFormSubmit = () => {
    handleSubmitRequest();
    handleSubmit(attendances1);
    handleClose();
  };
  const handleSubmitRequest = async () => {
    try {
      const formatTimeToHHMMSS = (time) => {
        const sanitizedTime = time.replace(/\s+/g, '');
        const [hours, minutes] = sanitizedTime.split(':');
        const seconds = "00";
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds}`;
      };

      const formattedCheckIn = formatTimeToHHMMSS(attendances1.loginTime);
      const formattedCheckOut = formatTimeToHHMMSS(attendances1.logoutTime);
      const authToken = localStorage.getItem('auth-token');
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const data = {
        date: attendances1.date,
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
      };
      // Send the POST request to the API
      const response = await axios.post('https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/requestChange', data, { headers });
      if (response.status === 201) {
        handleClose();
      } else {
        console.error('Request failed:', response.data);
      }
    } catch (error) {
      console.error('Error occurred during API request:', error);
    }
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
            <Typography variant="body1">Total Work:   {tester}/75 Hours</Typography>
          </div>
          {console.log("tester", tester)}
          {/* <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Total Week: 7</Typography>
          </div> */}
          <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Total Public:{TotalHoliday}</Typography>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            <Typography variant="body1">Holiday:{TotalWeekend}</Typography>
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
                        attendance.date,
                        formatTime(attendance.sessions[0].checkIn),
                        formatTime(attendance.sessions[attendance.sessions.length - 1].checkOut)
                      )} >Regularise</Button>

                    {/* Dialog Box */}
                    <Dialog open={open} onClose={handleClose} BackdropProps={{
                      style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      },
                    }} maxWidth="md" className=" mx-auto">
                      <DialogContent>
                        <Grid container spacing={6}>
                          {/* Left side: Form Fields */}
                          <Grid item xs={12} md={6} className="px-4">
                            <Card className="p-6 ms-4 shadow-lg rounded-lg border border-gray-200">
                              <DialogTitle className="text-xl font-semibold mb-4">Regularise Attendance</DialogTitle>
                              <div className="space-y-4">
                                {/* Status Dropdown */}

                                <InputLabel></InputLabel>
                                <FormControl fullWidth margin="normal">

                                  <InputLabel>Status</InputLabel>
                                  <Select
                                    value={attendances1.status}
                                    onChange={handleStatusChange}
                                    label="Status"
                                    className="bg-white border border-gray-300 rounded-md shadow-sm"
                                  >
                                    <MenuItem value="in">In</MenuItem>
                                    <MenuItem value="out">Out</MenuItem>
                                    <MenuItem value="both">Both</MenuItem>
                                  </Select>
                                </FormControl>

                                {/* Login Time */}
                                <TextField
                                  label="Login Time"
                                  type="text"
                                  value={attendances1.loginTime}
                                  onChange={handleLoginTimeChange}
                                  fullWidth
                                  margin="normal"
                                  disabled={attendances1.status === 'out'}
                                  className="bg-white border border-gray-300 rounded-md shadow-sm"
                                />

                                {/* Logout Time */}
                                <TextField
                                  label="Logout Time"
                                  type="text"
                                  value={attendances1.logoutTime}
                                  onChange={handleLogoutTimeChange}
                                  fullWidth
                                  margin="normal"
                                  disabled={attendances1.status === 'in'}
                                  className="bg-white border border-gray-300 rounded-md shadow-sm"
                                />

                                {/* Dialog Actions */}
                                <DialogActions className="justify-center mt-6">
                                  <Button onClick={handleClose} color="secondary" className="py-2 px-6 rounded-md bg-gray-300 hover:bg-gray-400 text-sm">
                                    Cancel
                                  </Button>
                                  <Button onClick={handleFormSubmit} color="primary" className="py-2 px-6 rounded-md bg-blue-500 hover:bg-blue-600 text-sm text-white">
                                    Apply
                                  </Button>
                                </DialogActions>
                              </div>
                            </Card>
                          </Grid>

                          {/* Right side: Sessions List */}
                          <Grid item xs={12} md={6} className="px-4">
                            <Typography variant="h6" className="text-lg font-semibold mb-4">
                              Sessions
                            </Typography>
                            <Card variant="outlined" className="max-h-[380px] overflow-y-auto shadow-md border border-gray-200 rounded-lg  ">
                              <CardContent className="p-4">
                                {attendance.sessions.map((session, index) => (
                                  <Box key={index} className="mb-4 p-3 border border-gray-200 rounded-md">
                                    <Typography variant="body2" className="text-sm text-gray-700 d-flex justify-between">
                                      {/* <strong>Session {index + 1}:</strong>  */}
                                      <span> Check-In: {formatTime(session.checkIn)} </span> <span >  Check-Out: {formatTime(session.checkOut)} </span>
                                    </Typography>
                                  </Box>
                                ))}
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>



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


    </Container>
  )
}
