
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { checkInEmployee, checkOutEmployee } from '@/_services/services_api'; // Import API functions
// import axios from 'axios'; // Ensure axios is installed

// export default function Dashboard() {
//     const [isCheckedIn, setIsCheckedIn] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());
//     const [selectedWeek, setSelectedWeek] = useState(0);
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [checkInTime, setCheckInTime] = useState(null);
//     const [checkOutTime, setCheckOutTime] = useState(null);
//     const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in seconds
//     const [intervalId, setIntervalId] = useState(null);

//     const [isNextWeekAvailable, setIsNextWeekAvailable] = useState(true); // Track if next week's data is available

//     useEffect(() => {
//         const interval = setInterval(() => setCurrentTime(new Date()), 1000);
//         return () => clearInterval(interval);
//     }, []);

//     // Function to calculate start and end date for the current, next, and previous weeks
//     const getWeekDates = (weekOffset = 0) => {
//         const currentDate = new Date();
//         const currentDay = currentDate.getDay();
//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(currentDate.getDate() - currentDay + (weekOffset * 7)); // Adjust for the start of the desired week (0 = current week)

//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (7 days after start)

//         const startDate = startOfWeek.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
//         const endDate = endOfWeek.toISOString().split('T')[0];     // Format as 'YYYY-MM-DD'

//         return { startDate, endDate };
//     };

//     // Fetch attendance data from API
//     const fetchAttendanceData = async (startDate, endDate) => {
//         try {
//             // Retrieve the auth token from localStorage
//             const authToken = localStorage.getItem('auth-token');

//             // If authToken exists, include it in the request headers
//             const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

//             // Construct the URL with startDate and endDate as query parameters
//             const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${startDate}&endDate=${endDate}`;

//             // Send the GET request with the constructed URL
//             const response = await axios.get(url, { headers: headers });

//             // Set the attendance data from the response
//             setAttendanceData(response.data.attendances);

//             // Check if the next week's data is available (check based on response length or specific criteria)
//             const nextWeekStartDate = new Date(endDate);
//             nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1); // Start date of next week
//             const nextWeekEndDate = new Date(nextWeekStartDate);
//             nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 6); // End date of next week

//             const nextStartDate = nextWeekStartDate.toISOString().split('T')[0];
//             const nextEndDate = nextWeekEndDate.toISOString().split('T')[0];

//             // Call API to check if next week's data exists
//             const nextWeekResponse = await axios.get(
//                 `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${nextStartDate}&endDate=${nextEndDate}`,
//                 { headers }
//             );

//             setIsNextWeekAvailable(nextWeekResponse.data.attendances.length > 0); // Set availability of next week's data

//         } catch (error) {
//             console.error("Error fetching attendance data:", error);
//         }
//     };

//     useEffect(() => {
//         const { startDate, endDate } = getWeekDates(0); // Get current week's start and end dates
//         fetchAttendanceData(startDate, endDate);
//     }, []);

//     const handleCheckInOut = async () => {
//         if (isCheckedIn) {
//             // Check-Out
//             clearInterval(intervalId);
//             const endTime = new Date();
//             setCheckOutTime(endTime);
//             setIsCheckedIn(false);

//             // Get auth token from localStorage
//             const authToken = localStorage.getItem('auth-token');

//             if (authToken) {
//                 // Call check-out API
//                 try {
//                     const response = await checkOutEmployee(
//                         { checkOutTime: endTime },
//                         {
//                             headers: { Authorization: `Bearer ${authToken}` }
//                         }
//                     );
//                     console.log('Check-out successful:', response);
//                 } catch (error) {
//                     console.error('Check-out failed:', error);
//                 }
//             }
//         } else {
//             // Check-In
//             const startTime = new Date();
//             setCheckInTime(startTime);
//             setIsCheckedIn(true);

//             // Start/resume the stopwatch
//             const id = setInterval(() => {
//                 setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
//             }, 1000);
//             setIntervalId(id);

//             // Get auth token from localStorage
//             const authToken = localStorage.getItem('auth-token');

//             if (authToken) {
//                 // Call check-in API
//                 try {
//                     const response = await checkInEmployee(
//                         { checkInTime: startTime },
//                         {
//                             headers: { Authorization: `Bearer ${authToken}` }
//                         }
//                     );
//                     console.log('Check-in successful:', response);
//                 } catch (error) {
//                     console.error('Check-in failed:', error);
//                 }
//             }
//         }
//     };

//     const handleWeekChange = (direction) => {
//         const newWeek = selectedWeek + direction;
//         setSelectedWeek(newWeek);

//         const { startDate, endDate } = getWeekDates(newWeek);
//         fetchAttendanceData(startDate, endDate);
//     };

//     useEffect(() => {
//         // Clear the interval when component unmounts to prevent memory leaks
//         return () => clearInterval(intervalId);
//     }, [intervalId]);

//     const formatTime = (seconds) => {
//         const hrs = Math.floor(seconds / 3600);
//         const mins = Math.floor((seconds % 3600) / 60);
//         const secs = seconds % 60;
//         return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     const percentageOf10Hours = (timeString) => {
//         const [hours, minutes, seconds] = timeString.split(':').map(Number);
//         const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
//         const tenHoursInSeconds = 9 * 60 * 60; // 36,000 seconds
//         const percentage = (totalSeconds / tenHoursInSeconds) * 100;
//         return percentage;
//     };

//     const getDayName = (dateString) => {
//         const date = new Date(dateString);
//         const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//         const dayIndex = date.getDay();
//         return daysOfWeek[dayIndex];
//     };

//     const getDayProgressBars = (attendances) => {
//         const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//         return daysOfWeek.map((day, index) => {
//             const attendance = attendances.find((attendance) => getDayName(attendance.date) === day);

//             const workedTimeInMinutes = attendance ? percentageOf10Hours(attendance.totalDuration) : 0;

//             return (
//                 <div key={index} className="flex justify-between items-center mb-2">
//                     <span className='me-2'>{day}</span>
//                     <div className="w-full h-2 bg-gray-200 rounded-full relative">
//                         <div
//                             className="h-full rounded-full"
//                             style={{
//                                 width: `${workedTimeInMinutes}%`,
//                                 backgroundColor: workedTimeInMinutes > 0 ? '#4caf50' : '#ddd'
//                             }}
//                         >
//                         </div>
//                     </div>
//                     {attendance ? <span className="ml-2">{attendance.totalDuration}</span> : <span>00:00:00</span>}
//                 </div>
//             );
//         });
//     };

//     return (
//         <div className="p-5 w-full mx-auto">
//             <div className="flex items-center justify-between mb-6">
//                 <input
//                     type="text"
//                     placeholder="Add notes for check-in"
//                     className="border p-2 rounded-lg w-1/2"
//                 />
//                 <span className="text-gray-500">General [09AM - 06PM]</span>
//                 <button
//                     onClick={handleCheckInOut}
//                     className={`px-4 py-2 rounded-lg ${isCheckedIn ? 'bg-red-500' : 'bg-green-500'} text-white`}
//                 >
//                     {isCheckedIn ? 'Check-Out' : 'Check-In'} {new Date(currentTime).toLocaleTimeString()}
//                 </button>
//             </div>

//             <div className="text-center text-xl font-semibold mb-6">
//                 Timer: {formatTime(elapsedTime)}
//             </div>

//             <div className="flex justify-between mb-4">
//                 <button
//                     onClick={() => handleWeekChange(-1)}
//                     className="px-4 py-2 rounded-lg bg-gray-300 text-black"
//                 >
//                     Prev Week
//                 </button>
//                 <button
//                     onClick={() => handleWeekChange(1)}
//                     className={`px-4 py-2 rounded-lg bg-gray-300 text-black ${!isNextWeekAvailable ? 'cursor-not-allowed opacity-50' : ''}`}
//                     disabled={!isNextWeekAvailable}
//                 >
//                     Next Week
//                 </button>
//             </div>

//             <div className="mb-6">
//                 {attendanceData.length > 0 && attendanceData[0].dateRange ? (
//                     <h3 className="text-xl font-semibold mb-2">
//                         Week: {attendanceData[0].dateRange.startDate} to {attendanceData[0].dateRange.endDate}
//                     </h3>
//                 ) : ("")}

//                 {attendanceData.length > 0 && getDayProgressBars(attendanceData)}
//             </div>
//         </div>
//     );
// }


'use client';
import React, { useState, useEffect } from 'react';
import { checkInEmployee, checkOutEmployee } from '@/_services/services_api';
import Tooltip from '@mui/material/Tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  AlertTitle









} from "@mui/material";
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useRouter } from "next/navigation";


// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"


export default function Dashboard() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isNextWeekAvailable, setIsNextWeekAvailable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [inputHours, setInputHours] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  // const [projects, setProjects] = useState([
  //     { name: "Project Alpha", hours: '', confirmed: false },
  //     { name: "Project Beta", hours: '', confirmed: false },
  //     { name: "Project Gamma", hours: '', confirmed: false },
  // ]);
  const [isConfirmed, setIsConfirmed] = useState(false);


  // useEffect(() => {
  //     const interval = setInterval(() => setCurrentTime(new Date()), 1000);
  //     return () => clearInterval(interval);
  // }, []);

  // // Load saved check-in status and time on component mount
  // useEffect(() => {
  //     const savedCheckInTime = localStorage.getItem('checkInTime');
  //     const savedElapsedTime = parseInt(localStorage.getItem('elapsedTime'), 10);

  //     if (savedCheckInTime) {
  //         setCheckInTime(new Date(savedCheckInTime));
  //         setIsCheckedIn(true);
  //         startTimer(savedElapsedTime || 0);
  //     }
  // }, []);

  // Start Timer
  // const startTimer = (initialElapsedTime = 0) => {
  //     setElapsedTime(initialElapsedTime);
  //     const id = setInterval(() => {
  //         setElapsedTime((prevElapsedTime) => {
  //             const updatedTime = prevElapsedTime + 1;
  //             localStorage.setItem('elapsedTime', updatedTime); // Update elapsed time in localStorage
  //             return updatedTime;
  //         });
  //     }, 1000);
  //     setIntervalId(id);
  // };

  // // Stop Timer
  // const stopTimer = () => {
  //     clearInterval(intervalId);
  //     setIntervalId(null);
  // };

  // Helper functions for managing time and storage
  const startTimer = (initialElapsedTime = 0) => {
    setElapsedTime(initialElapsedTime);
    const id = setInterval(() => {
      setElapsedTime((prevElapsedTime) => {
        const updatedTime = prevElapsedTime + 1;
        localStorage.setItem('elapsedTime', updatedTime); // Save elapsed time to localStorage
        return updatedTime;
      });
    }, 1000);
    setIntervalId(id);
  };
  console.log("")
  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  // Load saved state on component mount
  const router =useRouter()
  useEffect(() => {
    const savedCheckInTime = localStorage.getItem('checkInTime');
    const savedCheckOutTime = localStorage.getItem('checkOutTime');
    const savedElapsedTime = parseInt(localStorage.getItem('elapsedTime'), 10) || 0;

    // Resume timer if there was a saved check-in time and no check-out time
    if (savedCheckInTime && !savedCheckOutTime) {
      setIsCheckedIn(true);
      const currentElapsed = Math.floor((new Date() - new Date(savedCheckInTime)) / 1000) + savedElapsedTime;
      startTimer(currentElapsed);
    } else if (savedCheckOutTime) {
      // If there's a check-out time, stop the timer and display the last saved time
      setElapsedTime(savedElapsedTime);
    }
  }, []);

  useEffect(() => {
    // Update current time every second
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);


  // Get week dates
  const getWeekDates = (weekOffset = 0) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay + (weekOffset * 7));

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startDate = startOfWeek.toISOString().split('T')[0];
    const endDate = endOfWeek.toISOString().split('T')[0];

    return { startDate, endDate };
  };

  // Fetch attendance data
//   const fetchAttendanceData = async (startDate, endDate) => {
//     try {
//       const authToken = localStorage.getItem('auth-token');
//       const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
//       const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${startDate}&endDate=${endDate}`;
//       const response = await axios.get(url, { headers });
// console.log("response.data.attendances", response.data.attendances)
//       setAttendanceData(response.data.attendances);

//       const nextWeekStartDate = new Date(endDate);
//       nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1);
//       const nextWeekEndDate = new Date(nextWeekStartDate);
//       nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 6);

//       const nextStartDate = nextWeekStartDate.toISOString().split('T')[0];
//       const nextEndDate = nextWeekEndDate.toISOString().split('T')[0];

//       const nextWeekResponse = await axios.get(
//         `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${nextStartDate}&endDate=${nextEndDate}`,
//         { headers }
//       );
//       setIsNextWeekAvailable(nextWeekResponse.data.attendances.length > 0);

//     } catch (error) {
//       console.error(error);
//     }
//   };

const fetchAttendanceData = async (startDate, endDate) => {
  try {
    const authToken = localStorage.getItem('auth-token');
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${startDate}&endDate=${endDate}`;
    const response = await axios.get(url, { headers });
    
    // Check if response contains attendance data
    if (response.data.attendances) {
      // Store the fetched attendance data in localStorage
      localStorage.setItem('attendanceData', JSON.stringify(response.data.attendances));
      
      // Set the state with fetched data
      setAttendanceData(response.data.attendances);
    }

    const nextWeekStartDate = new Date(endDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1);
    const nextWeekEndDate = new Date(nextWeekStartDate);
    nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 6);

    const nextStartDate = nextWeekStartDate.toISOString().split('T')[0];
    const nextEndDate = nextWeekEndDate.toISOString().split('T')[0];

    const nextWeekResponse = await axios.get(
      `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${nextStartDate}&endDate=${nextEndDate}`,
      { headers }
    );
    
    setIsNextWeekAvailable(nextWeekResponse.data.attendances.length > 0);

  } catch (error) {
    console.error(error);
  }
};

  // useEffect(() => {
  //   const { startDate, endDate } = getWeekDates(0);
  //   fetchAttendanceData(startDate, endDate);
  // }, []);

  useEffect(() => {
    // Check if attendance data exists in localStorage
    const savedAttendanceData = localStorage.getItem('attendanceData');
    if (savedAttendanceData) {
      // If data exists in localStorage, set it in state
      setAttendanceData(JSON.parse(savedAttendanceData));
    } else {
      // Otherwise, fetch fresh data
      const { startDate, endDate } = getWeekDates(0);
      fetchAttendanceData(startDate, endDate);
    }
  }, []);

  const handleCheckInOut = async () => {
    const authToken = localStorage.getItem('auth-token');
    if (isCheckedIn) {
      // Handle Check-Out
      stopTimer();
      setIsCheckedIn(false);
      setIsModalOpen(true);
      localStorage.setItem('checkOutTime', new Date().toISOString());
      if (authToken) {
        try {
          await checkOutEmployee(
            { checkOutTime: new Date() },
            { headers: { Authorization: `Bearer ${authToken}` } }
          );
        } catch (error) {
          console.error('Check-out failed:', error);
        }
      }
    } else {
      // Handle Check-In
      const startTime = new Date();
      setIsCheckedIn(true);
      localStorage.setItem('checkInTime', startTime.toISOString());
      localStorage.removeItem('checkOutTime'); // Clear any previous check-out time

      // If there was previous elapsed time (user checked out), resume from there
      const savedElapsedTime = parseInt(localStorage.getItem('elapsedTime'), 10) || 0;
      startTimer(savedElapsedTime);

      if (authToken) {
        try {
          await checkInEmployee(
            { checkInTime: startTime },
            { headers: { Authorization: `Bearer ${authToken}` } }
          );
        } catch (error) {
          console.error('Check-in failed:', error);
        }
      }
    }
  };

  const confirmCheckOut = async () => {
    if (projects.some((project) => !project.hours || !project.confirmed)) {
      alert("Please fill out all fields and confirm each project.");
      return;
    }
    setIsCheckedIn(false);
    setIsModalOpen(false);
    setInputDate(new Date().toISOString().split('T')[0]); // reset the date for the next check-out
    setInputHours('');
    setSelectedProject('');
    setIsConfirmed(false);
    setProjects(projects.map((project) => ({ ...project, hours: '', confirmed: false })));
    // Additional check-out logic goes here
  };
  // const confirmCheckOut = async () => {
  //     try {
  //         // Retrieve auth token from local storage
  //         const authToken = localStorage.getItem('auth-token');
  //         if (!authToken) {
  //             alert("Auth token is missing. Please log in again.");
  //             return;
  //         }

  //         // Make the API call for each project
  //         const promises = payload.map((data) =>
  //             axios.post('https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/createDetails', data, {
  //                 headers: {
  //                     'auth-token': authToken,
  //                     'Content-Type': 'application/json',
  //                 },
  //             })
  //             .then((response) => {
  //                 console.log("Response for project:", data.projectId, response.data);
  //             })
  //             .catch((error) => {
  //                 console.error("Error in API call for project:", data.projectId, error.response || error.message);
  //                 alert(`Failed to check out project ${data.projectId}. Please try again.`);
  //             })
  //         );

  //         // Wait for all API calls to complete
  //         await Promise.all(promises);

  //         // Close modal and show success message if needed
  //         handleCloseModal();
  //         alert("Check-out confirmed successfully!");
  //     } catch (error) {
  //         console.error("Error confirming check-out:", error);
  //         alert("Failed to confirm check-out. Please try again.");
  //     }
  // };

  const handleWeekChange = (direction) => {
    const newWeek = selectedWeek + direction;
    setSelectedWeek(newWeek);
    const { startDate, endDate } = getWeekDates(newWeek);
    fetchAttendanceData(startDate, endDate);
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const percentageOf10Hours = (timeString) => {
    console.log(timeString, 'timeString')
    const [hours, minutes, seconds] = timeString?.split(':').map(Number);
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const tenHoursInSeconds = 9 * 60 * 60;
    const percentage = (totalSeconds / tenHoursInSeconds) * 100;
    return percentage;
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    startTimer(elapsedTime);
    setIsCheckedIn(true);

  };
  // const handleProjectChange = (index, field, value) => {
  //   setProjects((prevProjects) =>
  //     prevProjects.map((project, i) =>
  //       i === index ? { ...project, [field]: value } : project
  //     )
  //   );
  //   const newData = [...getprojectdata]; // Copy the state to avoid mutation
  //   newData[index] = {
  //     ...newData[index],
  //     [field]: value // Update the specific field
  //   };
  //   setgetprojectdata(newData);
  // };

  // const handleCheckboxChange = (index, checked) => {
  //   const newData = [...getprojectdata];
  //   newData[index] = {
  //     ...newData[index],
  //     confirmed: checked, // Update the confirmed field
  //   };
  //   setgetprojectdata(newData); // Update the state
  // };
  const getDayProgressBars = (attendances) => {
    console.log("attendances1", attendances)
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysOfWeek.map((day, index) => {
      const attendance = attendances.find((attendance) => getDayName(attendance.date) === day);
      console.log("sd",attendance)
      const workedTimeInMinutes = attendance?.totalDuration ? percentageOf10Hours(attendance.totalDuration) : 0;
      console.log("workedTimeInMinutes", workedTimeInMinutes)
      return (
        <div key={index} className="flex items-center mb-2 py-2 px-4 bg-[#fff] rounded-lg space-x-4">
          <span className="text-g ray-800 w-[5%] font-semibold">{day}</span>
          <span className="text-gray-500 ">9:00 AM</span>

          {/* Tooltip Wrapper */}
          <Tooltip title={attendance ? attendance.totalDuration : "00:00:00"} arrow>
            <div className=" w-[50%] h-2 bg-gray-200 rounded-full relative">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${workedTimeInMinutes}%`,
                  backgroundColor: workedTimeInMinutes > 0 ? '#4caf50' : '#ddd'
                }}
              ></div>
            </div>
          </Tooltip>

          {/* Display Time */}
          <span className="text-gray-500">7:00 PM</span>
          {attendance ? <span className="ml-2 w-[5%] text-gray-700">{attendance.totalDuration}</span> : <span className="text-gray-500">00:00:00</span>}
        </div>
      );
    });
  };

  const [projectdata, setprojectdata] = useState([]);
  const [projectdata2, setprojectdata2] = useState([]);

  const getuserproject = async () => {
    try {
      const authToken = localStorage.getItem('auth-token');
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/admin/projectDetails/getUserProjects`;
      const response = await axios.get(url, { headers });
      setprojectdata(response.data.projects)
      setprojectdata2(response.data.projects)
      console.log("responsrespons:", response)

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getuserproject();
  }, [])

  // const [getprojectdata, setgetprojectdata] = useState(
  //   projectdata.map((project) => ({
  //     hour: '', // Initially empty
  //     update: '', // Initially empty
  //     confirmed: project._id, // Checkbox state
  //   }))
  // );
  // console.log("check:", getprojectdata)
  const handlecheckout = async (e) => {
    e.preventDefault();

    // Get the current date and time in ISO 8601 format (e.g., 2024-11-15T09:00:00Z)
    const currentDate = new Date().toISOString(); // This gives the current date and time in the required format

    // Prepare the projects array with the required format

    const projectsToSend = getprojectdata
      .filter((project) => project.confirmed) // Only include confirmed projects
      .map((project) => ({

        projectId: project.id, // The unique ID of the project
        Update: project.update || '', // The update entered for the project (e.g., "Checked in")
        time: project.hour || '', // The working hours entered for the project
      }));


    const dataToSend = {
      date: currentDate,  // Current date and time in ISO format
      projects: projectsToSend,  // Array of projects with projectId, Update, and time
    };
    const authToken = localStorage.getItem('auth-token');
    console.log('Auth Token:', authToken);
    try {
      // Make the POST request using axios
      const response = await axios.post(
        'https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/createDetails',
        dataToSend, // The body of the request
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken, // Add the auth token in headers
          },
        }
      );  

      // Handle the response from the API
      console.log(response.data); // This will log the data returned by the server
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };



  // Dummy project data

  // Dummy project data
  const dummyProjects = [
    { id: "6735f41e6acc344492a4b0bc", name: "Project A" },
    { id: "673600d2dca766ad6e3f3b67", name: "Project B" },
    { id: "673600e9dca766ad6e3f3b68", name: "Project C" },
  ];

  const CHECKOUT_TIME = 7; // 7 hours

  const StyledTableContainer = styled(TableContainer)({
    marginBottom: '1rem',
  });

  const StyledButton = styled(Button)({
    marginTop: '1rem',
    width: '100%',
  });
  // Dummy project data
  // const [projects, setProjects] = useState(dummyProjects.map(project => ({
  //   projectId: project.id,
  //   name: project.name,
  //   time: "",
  //   Update: ""
  // })));
  const [projects, setProjectdata] = useState([
    { projectId: 1, projectName: "Project A", time: "", update: "" },
    { projectId: 2, projectName: "Project B", time: "", update: "" },
    { projectId: 3, projectName: "Project C", time: "", update: "" },
  ]);
  // const tester=  projectdata2.map((project) => {
  //   return { projectId: project._id, projectName: project.projectName, time: "", update: "" }
  // })
  // console.log("tesre", tester)

//   const [tester, setTester] = useState([]);
//   useEffect(() => {
//   const newTester = projectdata2.map((project) => {
//     return { projectId: project._id, projectName: project.projectName, time: "", update: "" };
//   });
//   setTester(newTester);  // This can trigger another re-render if not handled carefully.
// }, [projectdata2]);

  // const [getprojectdata, setgetprojectdata] = useState();
  // useEffect(()=>{
  //    setgetprojectdata(tester)
  // },[])

  const [getprojectdata, setgetprojectdata] = useState([]); // Initialize as an empty array
  const [formData, setFormData] = useState();

useEffect(() => {
  if (projectdata2.length > 0) {
    const tester = projectdata2.map((project) => {
      return { projectId: project._id, projectName: project.projectName, time: "", Update: "" };
    });
    setgetprojectdata(tester); // Set the transformed data
  }
}, [projectdata2]); // This effect depends on projectdata2, so it will run when projectdata2 changes

useEffect(()=>{
  setFormData({
    date: new Date().toISOString().split('T')[0],
    projects: getprojectdata
  })
  console.log('sssssss',formData);
},[getprojectdata])

  // console.log("getprojectdata:", { date: new Date().toLocaleDateString(), projects: getprojectdata });

  // console.log("getprojectdata", getprojectdata)
  const [totalHours, setTotalHours] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [times, setTimes] = useState([{ time: "" }]);
  // const handleInputChange = (index, field, value) => {

  //   setProjects(prevProjects => {
  //     const updatedProjects = [...prevProjects];
  //     updatedProjects[index] = { ...updatedProjects[index], [field]: value };
  //     console.log("update", updatedProjects)
  //     return updatedProjects;
  //   });
  // };

  const handleInputChange = (index, field, value) => {
    setgetprojectdata((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      console.log("updatedData", updatedData)
      return updatedData;
    });
  };

  useEffect(() => {
    const total = getprojectdata.reduce((sum, project) => {
      const hours = parseFloat(project.time) || 0;
      return sum + hours;
    }, 0);
    console.log("total", total)
    setTotalHours(total);
  }, [getprojectdata]);

  const convertTimeToNumber = (formattedTime) => {
    const [hours, minutes, seconds] = formattedTime.split(":").map(Number); // Split and convert to numbers
    const totalSeconds = hours * 3600 + minutes * 60 + seconds; // Convert to total seconds
    const totalHours = totalSeconds / 3600; // Convert to hours
    return totalHours;
  };

  // Example
  // console.log("elapses", elapsedTime)
  const formattedTime = formatTime(elapsedTime) // hh:mm:ss
  const totalHours1 = convertTimeToNumber(formattedTime);
  const confirmCheckOut1 = async (e) => {
    e.preventDefault();
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
    setAlertMessage('');
    console.log("before submit", totalHours);
    if (totalHours <= totalHours1) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        projects: getprojectdata
      })
      // const submittedData = {
      //   date: formData.date,
      //   projects: projectdata.map(({ projectId, time, Update }) => ({
      //     projectId,
      //     time,
      //     Update
      //   }))
      // };
      console.log("formdata", formData)
      try {
        const authToken = localStorage.getItem('auth-token');
        const response = await axios.post(
          'https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/createDetails',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("API Response:", response.data);

        setShowSuccessAlert(true);
        setAlertMessage('Your time entries have been submitted successfully!');
        router.push('/dashboard')
      } catch (error) {
        console.error('API call failed:', error);
        setShowErrorAlert(true);
        setAlertMessage('Failed to submit time entries. Please try again.');
      }
    } else {
      setShowErrorAlert(true);
      setAlertMessage(`Total working hours exceed the checkout time of ${formatTime(elapsedTime)} hours. Please adjust your entries.`);
    }
  };
  return (
    <div className="p-5 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-500"> <span className='mb-2 text-md font-semibold  '>  Employee Working Time : </span> {formatTime(elapsedTime)}</span>
        <button
          onClick={handleCheckInOut}
          className={`px-4 py-2 rounded-lg ${isCheckedIn ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isCheckedIn ? 'Check-Out' : 'Check-In'} {new Date(currentTime).toLocaleTimeString()}
        </button>
        {isModalOpen}
        <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle className="text-center text-2xl font-semibold text-gray-800 border-b border-gray-200 py-4">
            Update
          </DialogTitle>
          {/* <form onSubmit={handlecheckout}> */}
          <DialogContent className="py-4">
            <Typography className="text-gray-700 text-center mb-6" variant="h6">
              Current Date: {new Date().toLocaleDateString()}
              {/* <br /> */}
              {/* CheckOut Time:  {formatTime(elapsedTime)} */}
            </Typography>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
              {showSuccessAlert && (
                <Alert severity="success" style={{ marginTop: '1rem' }}>
                  <AlertTitle>Success</AlertTitle>
                  {alertMessage}
                </Alert>
              )}

              {showErrorAlert && (
                <Alert severity="error" style={{ marginTop: '1rem' }}>
                  <AlertTitle>Error</AlertTitle>
                  {alertMessage}
                </Alert>
              )}
              <form onSubmit={confirmCheckOut1}>

                {/* <Table className='border'>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>
                        Checkout Time: {CHECKOUT_TIME} hours
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Project Name</TableCell>
                      <TableCell>Working Hours</TableCell>
                      <TableCell>Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projectdata.map((project, index) => (
                      <TableRow key={project.projectId}>
                        <TableCell>{project.projectName}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            inputProps={{ step: "0.01" }}
                            placeholder="Hours"
                            onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                            fullWidth
                          />

                        </TableCell>
                        <TableCell>
                          <TextField

                            placeholder="Enter your update here"
                            type='text'
                            onChange={(e) => handleInputChange(index, 'Update', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      Total Hours: {totalHours.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </Table> */}
                  <Typography className="text-gray-700 text-center mb-6">
                  <span className='w-100'>
                       CheckOut Time: {formatTime(elapsedTime)}
                       </span>
                        <span className='hidden'>  Checkout Time: {totalHours1}</span>
            </Typography>
                <Table className="border">
                  <TableHead>
                    {/* <TableRow className='w-100'>
                      <TableCell colSpan={3}>
                       <span className='w-100'>
                       CheckOut Time: 00:12:31
                       </span>
                        <span className='hidden'>  Checkout Time: {totalHours1}</span>
                      </TableCell>
                    </TableRow> */}
                    <TableRow>
                    <TableCell>Status</TableCell>

                      <TableCell>Project Name</TableCell>
                      <TableCell>Working Hours</TableCell>
                      <TableCell>Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getprojectdata.map((project, index) => (
              <TableRow key={project.projectId}>
              {/* Checkbox Column */}
              {/* <TableCell className="w-25" style={{ padding: '4px 8px' }}>
                <input
                  type="checkbox"
                  checked={project.isCompleted || false}  // Default to false if not defined
                  onChange={(e) => {
                    const updatedData = [...getprojectdata];
                    updatedData[index].isCompleted = e.target.checked;
                    setgetprojectdata(updatedData);
                  }}
                  style={{
                    transform: 'scale(1.2)', // Slightly smaller scale to reduce size
                    margin: '0', // Remove extra space around the checkbox
                  }}
                />
              </TableCell> */}
               <TableCell>
                <Checkbox
                   checked={project.isCompleted || false} 
                  onChange={(e) => {
                    const updatedData = [...getprojectdata];
                    updatedData[index].isCompleted = e.target.checked;
                    setgetprojectdata(updatedData);
                  }}
                  aria-label={`Mark as complete`}
                />
              </TableCell>
            
              {/* Project Name */}
              <TableCell style={{ padding: '6px 8px', fontSize: '14px', fontWeight: '500' }}>
                {project.projectName}
              </TableCell>
            
              {/* Hours Input */}
              <TableCell style={{ padding: '4px 8px' }}>
                <TextField
                  type="number"
                  inputProps={{ step: "0.01" }}
                  placeholder="Hours"
                  value={project.time || ''}  // Set value to reflect current state
                  onChange={(e) => {
                    const updatedData = [...getprojectdata];
                    updatedData[index].time = e.target.value;
                    setgetprojectdata(updatedData); // Update state with new value
                  }}
                  fullWidth
                  variant="outlined"
                  margin="dense"  // Use "dense" for tighter spacing
                  size="small"
                  style={{
                    padding: '6px',
                    backgroundColor: '#f7f7f7',
                    borderRadius: '6px',
                    marginTop: '0px', // Remove any margin from top of the field
                  }}
                />
              </TableCell>
            
              {/* Update Field */}
              <TableCell style={{ padding: '4px 8px' }}>
                <TextField
                  placeholder="Enter your update here"
                  type="text"
                  value={project.Update || ''} // Bind value to reflect the current state
                  onChange={(e) => {
                    const updatedData = [...getprojectdata];
                    updatedData[index].Update = e.target.value;
                    setgetprojectdata(updatedData); // Update state with new value
                  }}
                  fullWidth
                  variant="outlined"
                  margin="dense"  // Use "dense" for tighter spacing
                  size="small"
                  style={{
                    padding: '6px',
                    backgroundColor: '#f7f7f7',
                    borderRadius: '6px',
                  }}
                />
              </TableCell>
            </TableRow>
            
              
                    ))}

                    {/* Total Hours row moved inside TableBody */}
                    <TableRow>
            <TableCell colSpan={2}>
              <div className="space-y-2">
                <label htmlFor="other-update" className="font-medium text-sm">
                  Others:
                </label>
                <TextField
                  id="other-update"
                  placeholder="Enter your update here"
                  // value={otherUpdate}
                  onChange={(e) => setOtherUpdate(e.target.value)}
                  className="w-full"
                  rows={3}
                />
              </div>
            </TableCell>
            <TableCell colSpan={2} align='right' className="fs-[20px]">
              <div className="font-medium">Total Hours: {totalHours.toFixed(2)}</div>
            </TableCell>
          </TableRow>
                  </TableBody>
                </Table>


                {/* <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Confirm Check-Out
                </StyledButton> */}
              </form>



              {/* {formData.projects.length > 0 && (
                <Paper style={{ marginTop: '1rem', padding: '1rem' }}>
                  <h2 style={{ marginBottom: '0.5rem' }}>Submitted Data</h2>
                  <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </Paper>
              )} */}
            </div>

          </DialogContent>

          <DialogActions className=" w-50 mx-auto ">
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              color="secondary"
              className="mr-4 py-2 px-6 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out"
            >
              Cancel
            </Button>
            <Button
              type="submit" // Ensure this is a submit button
              variant="contained"
              color="primary"
              onClick={(e) => confirmCheckOut1(e)}
              className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Confirm Check-Out
            </Button>
          </DialogActions>
          {/* </form> */}

        </Dialog>



      </div>

      {/* <div className="text-center mb-6">
  <div className="text-xl font-semibold">
  <span className='mb-2 text-md font-semibold  '>  Employee Working Time : </span> {formatTime(elapsedTime)}
</div>
</div> */}


      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleWeekChange(-1)}
          disabled={selectedWeek <= -3}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg "
        >
          Previous Week
        </button>
        <button
          onClick={() => handleWeekChange(1)}
          disabled={!isNextWeekAvailable || selectedWeek >= 3}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg"
        >
          Next Week
        </button>
      </div>

      {getDayProgressBars(attendanceData)}
      {console.log("attendanceData1", attendanceData)}
    </div>
  );
}






