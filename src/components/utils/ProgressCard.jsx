import React, { useState } from 'react';
 
const initialRemarksData = [
  {
    remarks: "Meeting with the team regarding project updates.",
    date: "2024-11-08",
    time: "10:00 AM"
  },
  {
    remarks: "Completed the initial draft of the new feature.",
    date: "2024-11-09",
    time: "02:30 PM"
  },
  {
    remarks: "Bug fixes and testing for the login module.",
    date: "2024-11-10",
    time: "04:15 PM"
  },
  {
    remarks: "Client call to discuss project timelines and feedback.",
    date: "2024-11-11",
    time: "09:45 AM"
  }
];
 
const RemarksList = ({heading}) => {
  const [remarksData, setRemarksData] = useState(initialRemarksData);
  const [newRemark, setNewRemark] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!newRemark || !newDate || !newTime) {
      alert('Please fill in all fields.');
      return;
    }
 
    const newEntry = {
      remarks: newRemark,
      date: newDate,
      time: newTime
    };
 
    setRemarksData([...remarksData, newEntry]);
 
    // Clear the input fields after submission
    setNewRemark('');
    setNewDate('');
    setNewTime('');
  };
 
  return (
    <div className="p-4">
      <h1 className="text-2 font-bold mb-4 text-center">{heading}</h1>
      <h2 className="text-2xl">Remarks</h2>
 
      {/* Add New Remark Form */}
      
 
      <div className="space-y-4">
        {remarksData.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md bg-green-100">
            <p className="text-lg font-semibold">{item.remarks}</p>
            <div className="text-sm text-gray-500 mt-2">
              <span>{item.date}</span> | <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-6"  >
        <textarea
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
          placeholder="Enter your remark"
          className="w-full p-2 border rounded-lg mb-2"
          rows="4"
        />
        <div className="flex space-x-4 mb-4">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-1/2 p-2 border rounded-lg"
          />
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-1/2 p-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
 
export default RemarksList;