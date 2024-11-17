import { useState, useEffect, useRef } from 'react';
import { TextField, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { checkInEmployee, checkOutEmployee } from '@/_services/services_api';

export default function ProgressBar() {
  // Get end date of the week (Sunday)
  const getEndOfWeek = (date) => {
    const endDate = new Date(date);
    const day = endDate.getDay();
    const diff = (day === 0 ? 6 : 7 - day); // If Sunday, diff = 6; otherwise, to next Sunday
    endDate.setDate(endDate.getDate() + diff);
    return endDate;
  };

  // Get start date of the week (Monday)
  const getStartOfWeek = (date) => {
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = day === 0 ? -6 : 1 - day; // If Sunday, move to previous Monday
    startDate.setDate(startDate.getDate() + diff);
    return startDate;
  };

  const [isWorking, setIsWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [attandancedata, Setattandancedata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date()); // Current start date of the week
  const [endDate, setEndDate] = useState(getEndOfWeek(new Date())); // End date of the week
  const timerRef = useRef(null); // Reference to keep track of the timer

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const fetchAttendanceData = async (startDate, endDate) => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const response = await fetch(
        `https://1pqbgqn7-4000.inc1.devtunnels.ms/Employee/totalDuration?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`,
        {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${authToken}` },
        }
      );

      const data = await response.json();
      const attendances = data.attendances[0].sessions;
      const updatedAttendance = attendances.map((record) => ({
        ...record,
        checkOut: `${timeToPercentage(record.checkOut)}%`,
      }));
      Setattandancedata(updatedAttendance);
    } catch (error) {
      console.error(error);
    }
  };

  const timeToPercentage = (timeStr) => {
    const time = new Date(timeStr);
    const minutesFromMidnight = time.getHours() * 60 + time.getMinutes();
    return ((minutesFromMidnight / 1440) * 100).toFixed(2);
  };

  useEffect(() => {
    fetchAttendanceData(startDate, endDate); // Fetch data whenever the week range changes
  }, [startDate, endDate]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTotalTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const toggleCheckInOut = async () => {
    const authToken = localStorage.getItem('auth-token');

    if (isWorking) {
      stopTimer();
      const end = new Date();
      const elapsedSeconds = Math.floor((end - startTime) / 1000);
      setTotalTime((prevTime) => prevTime + elapsedSeconds);
      setIsWorking(false);
      setShowModal(true);
    } else {
      const start = new Date();
      setStartTime(start);
      setIsWorking(true);
      startTimer();
      try {
        const response = await checkInEmployee(
          { startTime: start.toISOString() },
          {
            headers: { Authorization: `Bearer ${authToken}` }
          }
        );
        console.log('Check-In Successful:', response);
      } catch (error) {
        console.error('Check-In Failed:', error);
      }
    }
  };

  const handleCheckOutSubmit = async () => {
    const authToken = localStorage.getItem('auth-token');
    stopTimer();
    setIsWorking(false);
    try {
      const response = await checkOutEmployee(
        { elapsedTime: totalTime },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      console.log('Check-Out Successful:', response);
      setShowModal(false);
    } catch (error) {
      console.error('Check-Out Failed:', error);
    }
  };

  const navigateWeek = (direction) => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + direction * 7);
    const newEndDate = getEndOfWeek(newStartDate);
    setStartDate(getStartOfWeek(newStartDate));
    setEndDate(newEndDate);
  };

  return (
    <div className="container mx-auto p-6 space-y-6 shadow-lg rounded-lg bg-white">
      <div className="flex justify-center">
        <button
          onClick={toggleCheckInOut}
          className={`px-6 py-3 rounded-full text-white shadow-md ${isWorking ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isWorking ? 'Check Out' : 'Check In'}
        </button>
      </div>

      <div className="mt-4 p-4 rounded-lg shadow-md bg-white">
        <p className="text-center text-lg font-semibold">
          Total Time Worked: {formatTime(totalTime)}
        </p>
      </div>

      {/* Week Range Display */}
      <div className="flex justify-between mt-6 shadow-md p-4 rounded-lg bg-white">
        <button onClick={() => navigateWeek(-1)} className="text-gray-700 p-2 shadow-sm">← Prev Week</button>
        <span className="text-lg font-semibold">
          {`${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
        </span>
        <button onClick={() => navigateWeek(1)} className="text-gray-700 p-2 shadow-sm">Next Week →</button>
      </div>

      {/* Progress Bar and Week Data Display */}
      <div className="flex justify-center space-x-6 mt-6">
  <div className="w-full">
    {days.map((day, index) => {
      // Check if there's data for the current day
      const currentDayData = attandancedata.find(
        (attendance) => new Date(attendance.checkIn).getDay() === (index + 1) % 7
      );

      const workedTime = currentDayData ? currentDayData.duration : 0;
      const progress = currentDayData ? parseFloat(currentDayData.checkOut) : 0;
      const progressBarColor = currentDayData ? 'bg-yellow-500' : 'bg-gray-500'; // Grey if no data

      return (
        <Tooltip key={index} title={`${workedTime ? formatTime(workedTime) : 'No data'}`} arrow>
          <div className="flex items-center mb-4 shadow-sm">
            <span className="w-20 text-gray-700">{day}</span>
            <div className="flex-grow h-2 bg-green-300 rounded-full overflow-hidden shadow-inner"> {/* Changed height here */}
              <div
                className={`h-2 ${progressBarColor}`}  
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </Tooltip>
      );
    })}
  </div>
</div>

      {/* Check-Out Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Confirm Check-Out</DialogTitle>  
        <DialogContent>
          <DialogContentText>Please fill in the details before confirming your check-out.</DialogContentText>
          <TextField autoFocus margin="dense" label="Project Name" type="text" fullWidth variant="outlined" />
          <TextField margin="dense" label="Working Hours" type="number" fullWidth variant="outlined" />
          <TextField margin="dense" label="Task Update" type="text" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="secondary">Cancel</Button>
          <Button onClick={handleCheckOutSubmit} color="primary">Confirm Check-Out</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
