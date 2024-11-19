"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DialogActions, DialogContent, Dialog,DialogTitle,Button, TextField, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

export default function AttendancePage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [attendances, setAttendances] = useState([])
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')

  useEffect(() => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 6)
    setStartDate(formatDate(start))
    setEndDate(formatDate(end))
    fetchData(formatDate(start), formatDate(end))
    fetchEmployees()
  }, [])

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const fetchData = async (start, end, employeeId = '') => {
    try {
      const authToken = localStorage.getItem('auth-token')
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {}
      const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${start}&endDate=${end}&userId=${employeeId}`
      const response = await axios.get(url, { headers })
      setAttendances(response.data.attendances || [])
    } catch (error) {
      console.error(error)
    }
  }

  const fetchEmployees = async () => {
    try {
      const authToken = localStorage.getItem('auth-token')
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {}
      const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/getEmployee`
      const response = await axios.get(url, { headers })
      setEmployees(response.data.data || [])
    } catch (error) {
      console.error('Error fetching employee data:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(startDate, endDate, selectedEmployee)


  }

  const [open, setOpen] = useState(false)
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
      status: 'both',
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
        status: 'both',
      })
    }
  
    // Function to handle closing the dialog
    const handleClose = () => {
  
      setOpen(false)
    }

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
  

  return (
    <Container maxWidth="lg" className="bg-white p-8 rounded-lg shadow-lg">
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-700 mb-6">
        Employee Attendance
      </Typography>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <FormControl className="w-25">
          <InputLabel>Select Employee</InputLabel>
          <Select
          className=''
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            label="Select Employee"
            required
          >
            {employees.map(employee => (
              <MenuItem key={employee._id} value={employee._id}>
                {employee.firstName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
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
        
        <Button type="submit" variant="contained" color="primary" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          View
        </Button>
      </form>

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
                  <TableCell className="p-4 border-b">{attendance.date}</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>

         {/* Dialog Box */}
         <Dialog open={open} className='w-50 mx-auto' onClose={handleClose}>
        <DialogTitle>Regularise Attendance</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
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
          <TextField
            label="Login Time"
            type="text"
            value={attendances1.loginTime}
            onChange={handleLoginTimeChange}
            fullWidth
            margin="normal"
            disabled={attendances1.status === 'out'}
          />
          <TextField
            label="Logout Time"
            type="text"
            value={attendances1.logoutTime}
            onChange={handleLogoutTimeChange}
            fullWidth
            margin="normal"
            disabled={attendances1.status === 'in'}
          />

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
