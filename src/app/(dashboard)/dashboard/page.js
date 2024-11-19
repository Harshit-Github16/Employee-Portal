'use client'
import React, { useEffect, useState } from 'react';
import { Cake, Gift, PartyPopper } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import Tester from '@/components/utils/tester';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import TimerComponent from '@/components/checkIn';
import {
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Work as WorkIcon,
  Event as EventIcon,
  Campaign as CampaignIcon,
  FiberManualRecord as DotIcon
} from '@mui/icons-material';
import { changePassword } from '@/_services/services_api';
const EmployeeDashboard = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const [updateFilter, setUpdateFilter] = useState('all');
  const employeeName = userDetails.firstName
  console.log("userDetails", userDetails)
  useEffect(() => {
    if (userDetails.isFirstLogin) {
      setShowPasswordModal(true);
    }
  }, [userDetails.isFirstLogin]);

  useEffect(() => {
    const passwordLengthValid = newPassword.length >= 8;
    const passwordsMatch = newPassword === confirmPassword;
    const containsNumber = /\d/.test(newPassword);
    setIsPasswordValid(passwordLengthValid && passwordsMatch && containsNumber);
  }, [newPassword, confirmPassword]);

  const handleChangePassword = (e) => {
    e.preventDefault();
    const payload = {
      email: userDetails.email,
      newPassword,
      confirmPassword,
    };
    changePassword(payload);
    setShowPasswordModal(false);
  };
  // Attendance Data for Pie Chart
  const attendanceData = [
    { name: 'Present', value: 85, color: '#4caf50' },
    { name: 'Late', value: 10, color: '#ff9800' },
    { name: 'Absent', value: 5, color: '#f44336' }
  ];

  // Important Updates Data
  const importantUpdates = {
    all: [
      { message: "Company-wide meeting scheduled for next week", priority: "high" },
      { message: "New HR policy updates", priority: "medium" }
    ],
    employee: [
      { message: "Submit timesheet by Friday", priority: "high" },
      { message: "Training session tomorrow at 2 PM", priority: "medium" }
    ],
    admin: [
      { message: "System maintenance scheduled", priority: "high" },
      { message: "Review pending approvals", priority: "medium" }
    ],
    manager: [
      { message: "Performance reviews due next week", priority: "high" },
      { message: "Team budget reports pending", priority: "medium" }
    ]
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      default:
        return '#4caf50';
    }
  };
  const employees = [
    { id: 1, name: 'John Doe', department: 'Engineering', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', department: 'Sales', email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', department: 'HR', email: 'bob@example.com' },
  ];

  const notices = [
    'Team meeting on Friday at 3 PM.',
    'Project deadline extended by one week.',
  ];
  const marqueeStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: 'scroll-text 10s linear infinite', // Adjust speed with 10s
  };

  // Keyframes for scrolling effect
  const scrollTextAnimation = `
    @keyframes scroll-text {
      0% {
        transform: translateX(100%); /* Start from right */
      }
      100% {
        transform: translateX(-100%); /* End at left */
      }
    }
  `;

  const projects = [
    { id: 1, name: 'Project A', startDate: '2023-01-01', endDate: '2023-12-31', assignedTo: 'John Doe', status: 'In Progress' },
    { id: 2, name: 'Project B', startDate: '2023-06-01', endDate: '2023-11-30', assignedTo: 'Jane Smith', status: 'Completed' },
  ];

  const leaves = [
    { id: 1, name: 'Alice Johnson', startDate: '2023-10-20', endDate: '2023-10-25' },
    { id: 2, name: 'Bob Brown', startDate: '2023-10-28', endDate: '2023-10-30' },
  ];
  const birthdayPerson = "Vijay"
  return (


    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>


      {/* Welcome Card */}
      {/* <Card  className='w-100' sx={{ 
      
  mb: 3, 
  background: 'linear-gradient(135deg, #4caf50 30%, #81c784 90%)', // Green gradient
  color: 'white',
  boxShadow: 3, // Add some shadow for depth
  borderRadius: 2, // Rounded corners
}}>


  
  <CardContent>
    <Typography variant="h5" gutterBottom>
      Welcome {employeeName}! 👋
    </Typography>
    <Typography variant="subtitle1">
      Here's what's happening in your workplace today:
    </Typography>
  </CardContent>
</Card> */}

      <div className="p-6 space-y-6 md:space-y-0 md:flex md:gap-6">

        <Card className='d-flex p-5 w-100 justify-between' sx={{
          mb: 3,
          background: 'linear-gradient(135deg, #4caf50 30%, #81c784 90%)', // Green gradient
          color: 'white',
          boxShadow: 3, // Add some shadow for depth
          borderRadius: 2, // Rounded corners
        }}>
          {/* Welcome Card */}
          <Card className='h-[100%]'
            sx={{
              mb: 3,
              background: 'linear-gradient(135deg, #ff7e5f 30%, #feb47b 90%)', // Purple to Blue gradient
              color: 'white',
              boxShadow: 3,
              borderRadius: 2,
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Welcome {employeeName}! 👋
              </Typography>
              <Typography variant="subtitle1">
                Here's what's happening in your workplace today:
              </Typography>
            </CardContent>
          </Card>

          {/* Birthday Card */}
          <Card className="w-full md:w-1/2 overflow-hidden">
            <CardContent className="p-6 relative bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <div className="absolute top-0 right-0 p-4">
                <Cake className="w-12 h-12 text-yellow-300" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                🎉 Happy Birthday, {birthdayPerson}! 🎂
              </h2>
              <p className="text-lg mb-4">
                Wishing you a fantastic day filled with joy and laughter!
              </p>
              <div className="flex items-center  mt-4">
                <Gift className="w-6 h-6 text-red mb-4 me-3" />
                <p className="text-sm">
                  Don't forget to grab your birthday treat from the break room!
                </p>
              </div>
              <div className="absolute bottom-0 right-0 p-4">
                <PartyPopper className="w-12 h-12 text-yellow-300" />
              </div>
            </CardContent>
          </Card>
        </Card>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordModal} onClose={() => setShowPasswordModal(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Please enter your new password. It should be at least 8 characters long and contain at least one number.
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            variant="outlined"
            margin="dense"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            variant="outlined"
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordModal(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} disabled={!isPasswordValid} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>


      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Important Updates */}
        <Grid item xs={12} md={8}>
          <Card>
            <Tester />
          </Card>
          {/* <Tester/> */}
        </Grid>

        {/* Attendance Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card>
            {/* CardHeader for Important Updates */}
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CampaignIcon sx={{ color: '#d32f2f' }} />
                  <Typography variant="h6">Important Updates</Typography>
                  <FormControl size="small" sx={{ ml: 'auto', minWidth: 120 }}>
                    <InputLabel>View As</InputLabel>
                    <Select
                      value={updateFilter}
                      label="View As"
                      onChange={(e) => setUpdateFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Updates</MenuItem>
                      <MenuItem value="employee">Employee</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              }
              sx={{ bgcolor: '#ffebee' }}
            />

            {/* CardContent for Important Updates */}
            <CardContent>
              <List sx={{ padding: 0 }}>
                {/* Vertical Scrolling Animation */}
                <style>{`
      @keyframes scroll-text {
        0% {
          transform: translateY(100%); /* Start from bottom */
        }
        100% {
          transform: translateY(-100%); /* End at top */
        }
      }
      .marquee-vertical {
        display: inline-block;
        animation: scroll-text 8s linear infinite; /* Adjust speed with 8s */
      }
    `}</style>
                <Box sx={{ height: 200, overflow: 'hidden' }}> {/* Reduced height to 200px */}
                  <div className="marquee-vertical">
                    {importantUpdates[updateFilter].map((update, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }} className="flex items-center space-x-3">
                        <ListItemIcon>
                          <DotIcon sx={{ color: getPriorityColor(update.priority) }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <span className="text-left font-medium text-sm"> {/* Text alignment and font styles */}
                              {update.message}
                            </span>
                          }
                          secondary={
                            <span className="text-xs text-gray-500"> {/* Smaller secondary text */}
                              Priority: {update.priority.charAt(0).toUpperCase() + update.priority.slice(1)}
                            </span>
                          }
                        />
                      </ListItem>
                    ))}
                  </div>
                </Box>
              </List>
            </CardContent>

            <div className='h-[249px]'>
              {/* CardHeader for Notices */}
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <NotificationsIcon sx={{ color: '#ffa726' }} />
                    <Typography variant="h6">Notices</Typography>
                  </Box>
                }
                sx={{ bgcolor: '#fff3e0' }}
              />

              {/* CardContent for Notices */}
              <CardContent sx={{ maxHeight: 250, overflow: 'auto' }}> {/* Reduced height for Notices */}
                <div className='marquee-vertical'>
                  <List sx={{ padding: 0 }}>
                    {notices.map((notice, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <DotIcon sx={{ color: '#ffa726', fontSize: 12 }} />
                        </ListItemIcon>
                        <ListItemText primary={notice} />
                      </ListItem>
                    ))}
                  </List>
                </div>

              </CardContent>
            </div>
          </Card>
        </Grid>



      </Grid>

      <Grid>
        {/* <TimerComponent/> */}
        {/* <Tester/> */}
      </Grid>

      <Grid container spacing={3}>
        {/* Employee List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon sx={{ color: '#5c6bc0' }} />
                  <Typography variant="h6">Employee List</Typography>
                </Box>
              }
              sx={{ bgcolor: '#e8eaf6' }}
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Notices */}
        {/* <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsIcon sx={{ color: '#ffa726' }} />
                  <Typography variant="h6">Notices</Typography>
                </Box>
              }
              sx={{ bgcolor: '#fff3e0' }}
            />
            <CardContent>
              <List>
                {notices.map((notice, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <DotIcon sx={{ color: '#ffa726', fontSize: 12 }} />
                    </ListItemIcon>
                    <ListItemText primary={notice} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={12} md={4}>
          <Card className=''>
            <div className='h-[375px]'>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon sx={{ color: '#1976d2' }} />
                    <Typography variant="h6">Employee Attendance</Typography>
                  </Box>
                }
                sx={{ bgcolor: '#e3f2fd' }}
              />
              <CardContent>
                <Box sx={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </div>
          </Card>
        </Grid>

        {/* Projects */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkIcon sx={{ color: '#2e7d32' }} />
                  <Typography variant="h6">Active Projects</Typography>
                </Box>
              }
              sx={{ bgcolor: '#e8f5e9' }}
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.startDate}</TableCell>
                        <TableCell>{project.endDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={project.status}
                            color={project.status === 'Completed' ? 'success' : 'primary'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Leaves */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EventIcon sx={{ color: '#d32f2f' }} />
                  <Typography variant="h6">Upcoming Leaves</Typography>
                </Box>
              }
              sx={{ bgcolor: '#ffebee' }}
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>{leave.name}</TableCell>
                        <TableCell>{leave.startDate}</TableCell>
                        <TableCell>{leave.endDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;