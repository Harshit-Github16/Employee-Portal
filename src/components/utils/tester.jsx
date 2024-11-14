
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
     
  
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper 
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
    const [projects, setProjects] = useState([
        { name: "Project Alpha", hours: '', confirmed: false },
        { name: "Project Beta", hours: '', confirmed: false },
        { name: "Project Gamma", hours: '', confirmed: false },
    ]);
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
    const fetchAttendanceData = async (startDate, endDate) => {
        try {
            const authToken = localStorage.getItem('auth-token');
            const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
            const url = `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${startDate}&endDate=${endDate}`;
            const response = await axios.get(url, { headers });

            setAttendanceData(response.data.attendances);

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
            console.error("Error fetching attendance data:", error);
        }
    };

    useEffect(() => {
        const { startDate, endDate } = getWeekDates(0);
        fetchAttendanceData(startDate, endDate);
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
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
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
    };
    const handleProjectChange = (index, field, value) => {
        setProjects((prevProjects) => 
            prevProjects.map((project, i) =>
                i === index ? { ...project, [field]: value } : project
            )
        );
    };
   const getDayProgressBars = (attendances) => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysOfWeek.map((day, index) => {
        const attendance = attendances.find((attendance) => getDayName(attendance.date) === day);
        const workedTimeInMinutes = attendance ? percentageOf10Hours(attendance.totalDuration) : 0;
        return (
            <div key={index} className="flex items-center mb-2 py-2 px-4 bg-[#fff] rounded-lg space-x-4">
                <span className="text-gray-800 w-[5%] font-semibold">{day}</span>
                <span className="text-gray-500 ">9:00 AM</span>
    
                {/* Tooltip Wrapper */}
                <Tooltip title={attendance ? attendance.totalDuration : "00:00:00"} arrow>
                    <div className=" w-[70%] h-2 bg-gray-200 rounded-full relative">
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

    

    return (
        <div className="p-5 w-full mx-auto">
            <div className="flex items-center justify-between mb-6">
                <input
                    type="text"
                    placeholder="Add notes for check-in"
                    className="border p-2 rounded-lg w-1/2"
                />
                <span className="text-gray-500"> <span className='mb-2 text-md font-semibold  '>  Employee Working Time : </span> {formatTime(elapsedTime)}</span>
                <button
                    onClick={handleCheckInOut}
                    className={`px-4 py-2 rounded-lg ${isCheckedIn ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                    {isCheckedIn ? 'Check-Out' : 'Check-In'} {new Date(currentTime).toLocaleTimeString()}
                </button>
                <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="lg" fullWidth>
    <DialogTitle className="text-center text-2xl font-semibold text-gray-800 border-b border-gray-200 py-4">
        Check-Out Confirmation
    </DialogTitle>
    <DialogContent className="py-4">
        <Typography className="text-gray-700 text-center mb-6" variant="h6">
            Current Date: {new Date().toLocaleDateString()}
        </Typography>

        <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
            <Table className="min-w-full">
                <TableHead>
                    <TableRow className="bg-gray-100">
                        <TableCell align="center" className="font-semibold text-gray-600 px-4 py-2">Confirm</TableCell>
                        <TableCell align="center" className="font-semibold text-gray-600 px-4 py-2">Project Name</TableCell>
                        <TableCell align="center" className="font-semibold text-gray-600 px-4 py-2">Working Hours</TableCell>
                      
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project, index) => (
                        <TableRow key={index} className="border-t border-gray-200">
                            <TableCell align="center" className="px-4 py-2">
                                <Checkbox
                                    checked={project.confirmed}
                                    onChange={(e) => handleProjectChange(index, 'confirmed', e.target.checked)}
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell align="center" className="text-blue-600 font-semibold px-4 py-2">
                                {project.name}
                            </TableCell>
                            <TableCell align="center" className="">
                                <TextField
                                    type="number"
                                    placeholder="Hours"
                                    value={project.hours}
                                    onChange={(e) => handleProjectChange(index, 'hours', e.target.value)}
                                    className="bg-white rounded-md w-50  text-center border border-gray-300"
                                    
                                />
                            </TableCell>
                          
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </DialogContent>
    <DialogActions className="py-4 px-6">
        <Button
            onClick={handleCloseModal}
            variant="outlined"
            color="secondary"
            className="mr-4 py-2 px-6 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out"
        >
            Cancel
        </Button>
        <Button
            onClick={confirmCheckOut}
            variant="contained"
            color="primary"
            disabled={projects.some((project) => !project.hours || !project.confirmed)}
            className="py-2 px-6 bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out"
        >
            Confirm Check-Out
        </Button>
    </DialogActions>
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
        </div>
    );
}






