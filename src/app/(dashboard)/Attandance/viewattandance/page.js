"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

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
      console.error('Error fetching data:', error)
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

  return (
    <Container maxWidth="lg" className="bg-white p-8 rounded-lg shadow-lg">
      <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-700 mb-6">
        Employee Attendance
      </Typography>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <FormControl className="w-full md:w-auto">
          <InputLabel>Select Employee</InputLabel>
          <Select
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
          Submit
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
                  <TableCell className="p-4 border-b">{attendance.sessions[0].checkIn}</TableCell>
                  <TableCell className="p-4 border-b">{attendance.sessions[attendance.sessions.length-1].checkOut}</TableCell>
                  <TableCell className="p-4 border-b">{attendance.totalDuration}</TableCell>
                  <TableCell className="p-4 border-b"><button className='btn btn-primary btn-sm text-xs'>Regularise</button></TableCell>
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
    </Container>
  )
}
