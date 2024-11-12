'use client'
import React, { useEffect, useState } from 'react';
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
  const employeeName = userDetails.first_name;

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

  const projects = [
    { id: 1, name: 'Project A', startDate: '2023-01-01', endDate: '2023-12-31', assignedTo: 'John Doe', status: 'In Progress' },
    { id: 2, name: 'Project B', startDate: '2023-06-01', endDate: '2023-11-30', assignedTo: 'Jane Smith', status: 'Completed' },
  ];

  const leaves = [
    { id: 1, name: 'Alice Johnson', startDate: '2023-10-20', endDate: '2023-10-25' },
    { id: 2, name: 'Bob Brown', startDate: '2023-10-28', endDate: '2023-10-30' },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Welcome Card */}
      <Card sx={{ 
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
</Card>


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
            <CardContent>
              <List>
                {importantUpdates[updateFilter].map((update, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <DotIcon sx={{ color: getPriorityColor(update.priority) }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={update.message}
                      secondary={`Priority: ${update.priority.charAt(0).toUpperCase() + update.priority.slice(1)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card>
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
          </Card>
        </Grid>
      </Grid>

  <Grid>
  {/* <TimerComponent/> */}
  <Tester/>
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
        <Grid item xs={12} md={4}>
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