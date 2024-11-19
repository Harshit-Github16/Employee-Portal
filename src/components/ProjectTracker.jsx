// import React, { useEffect, useState } from 'react';
// import {

//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import { Add } from '@mui/icons-material';
// import { getAllProjects, deleteProject ,updateProjectStatus} from '@/_services/services_api';
// import { ProjectListTable } from '@/components/utils/table';
// import ProjectDetailsModal from '@/components/utils/ProjectDetailsModal'; 
// import { useRouter } from 'next/navigation'; 
// import * as XLSX from 'xlsx';
// import toast from 'react-hot-toast';

// const MyTable = () => {
//   const [projectList, setProjectList] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [currentProjectStatus, setcurrentProjectStatus] = useState('');

//   useEffect(() => {
//     const fetchProjects = async () => {
//       setLoading(true);
//       try {
//         const response = await getAllProjects();
//         setProjectList(response.data);
//         setFilteredProjects(response.data);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);
  
//   const router = useRouter(); 

//   const handleAddProject = () => {
//     router.push('/projectTracker'); 
//   };

//   const handleDownload = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredProjects);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
//     XLSX.writeFile(workbook, "project_data.xlsx");
//   };

//   const handleFilterChange = (event) => {
//     const value = event.target.value;
//     setStatusFilter(value);

//     if (value) {
//       const filtered = projectList.filter(project => project.projectStatus === value);
//       setFilteredProjects(filtered);
//     } else {
//       setFilteredProjects(projectList);
//     }
//   };

//   const handleViewDetails = (project) => {
//     setSelectedProject(project);
//     setModalOpen(true);
//   };

//   const handleDeleteProject = async (project) => {
//     try {
//       const response = await deleteProject(project._id);
//       if (response.success) {
//         toast.success(response.message);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error('An error occurred while deleting the project');
//     }
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedProject(null);
//   };
//   const handleStatusChange = (event, project) => {
//     const newStatus = event.target.value;
//     console.log(`Changing status of project ${project._id} to ${newStatus}`);
//     const payload = {
//       id: project._id,
//       projectStatus: newStatus
//     };
//     updateProjectStatus(payload);
//   };
  

//   return (
//     <div className='px-4'>
//       {!loading ? (
//         <div>
//           <div className='flex items-center justify-between'>
//             <FormControl variant="outlined" style={{ minWidth: 120 }}>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 value={statusFilter}
//                 onChange={handleFilterChange}
//                 className='py-0 '
//                 label="Status"
//               >
//                      <MenuItem value="">All</MenuItem>
//              <MenuItem value="1">Yet to start</MenuItem>
// <MenuItem value="2">Planning</MenuItem>
// <MenuItem value="3">Running</MenuItem>
// <MenuItem value="4">Completed</MenuItem>
// <MenuItem value="5">Hold</MenuItem>
//               </Select>
//             </FormControl>

//             <div className=''>
//               <Button 
//                 variant="contained" 
//                 color="primary" 
//                 size="small"
//                 onClick={handleAddProject}
//                 startIcon={<Add />}
              
//               >
//                 Add New Project
//               </Button>
              
//               <Button 
//                 variant="contained" 
//                 color="primary" 
//                 size="small"
//                 onClick={handleDownload}
//               className='ms-2'
//               >
//                 Download Excel
//               </Button>
//             </div>
//           </div>
//           {console.log("filteredProjects",filteredProjects)}
//           {filteredProjects.length > 0 ? (
//             <ProjectListTable 
//               projectData={filteredProjects} 
//               onViewDetails={handleViewDetails} 
//               onDeleteProject={handleDeleteProject} 
//               handleStatusChange={handleStatusChange} 
//               value={currentProjectStatus}
//               project={selectedProject}
//             />
//           ) : (
//             <div className='w-full' style={{ textAlign: 'center', marginTop: '20px' }}>
//               <Typography variant="body1" color="textSecondary">
//                 No data available
//               </Typography>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className='w-100 h-100  justify-center flex m-auto h-100vh items-center'>
//           <CircularProgress />

//         </div>
//       )}

//       <ProjectDetailsModal
//         open={modalOpen}
//         onClose={handleCloseModal}
//         project={selectedProject}
//       />
//     </div>
//   );
// };

// export default MyTable;




import React, { useEffect, useState } from 'react';
import {
 
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { getAllProjects, deleteProject ,updateProjectStatus} from '@/_services/services_api';
import { ProjectListTable } from '@/components/utils/table';
import ProjectDetailsModal from '@/components/utils/ProjectDetailsModal';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
 
const MyTable = () => {
  const [projectList, setProjectList] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentProjectStatus, setcurrentProjectStatus] = useState('');
 
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await getAllProjects();
        setProjectList(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProjects();
  }, []);
  
  const router = useRouter();
 
  const handleAddProject = () => {
    router.push('/projectTracker');
  };
 
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredProjects);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
    XLSX.writeFile(workbook, "project_data.xlsx");
  };
 
  const handleFilterChange = (event) => {Toaster
    const value = event.target.value;
    setStatusFilter(value);
console.log("projectList",projectList, value)
    if (value) {
      const filtered = projectList.filter(project => project.projectStatus == value);
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projectList);
    }
  };
 
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
 
  const handleDeleteProject = async (project) => {
    try {
      const response = await deleteProject(project._id);
      console.log("responseresponse",response);
      if (response.status == 1) {
        const updatedProjects = projectList.filter(item => item._id !== project._id);
        setProjectList(updatedProjects);
        setFilteredProjects(updatedProjects);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred while deleting the project');
    }
  };
 
  const handleCloseModal = () => {  
    setModalOpen(false);
    setSelectedProject(null);
  };
 
  const handleStatusChange = (event, project) => {
    const options = {
      1: "Initial",
      2: "Planning",
      3: "Running",
      4: "Completed",
      5: "Hold Not Complete",
    };
    const newStatus = event.target.value;
    toast.success(`Status changed to ${options[newStatus]}`);
    // console.log(`Changing status of project ${project._id} to ${newStatus}`);
    const payload={
      "id":project._id,
      "projectStatus":newStatus
  }
  updateProjectStatus(payload)
  };
 
  return (
    <div className='px-4'>
      {!loading ? (
        <div>
          <div className='flex items-center justify-between'>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleFilterChange}
                className='py-0 '
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="1">Yet to start</MenuItem>
                <MenuItem value="2">Planning</MenuItem>
                <MenuItem value="3">Running</MenuItem>
                <MenuItem value="4">Completed</MenuItem>
                <MenuItem value="5">Not completed </MenuItem>
              </Select>
            </FormControl>
 
            <div className=''>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleAddProject}
                startIcon={<Add />}
              
              >
                Add New Project
              </Button>
              
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleDownload}
              className='ms-2'
              >
                Download Excel
              </Button>
            </div>
          </div>
          {/* {console.log("filteredProjectsfilteredProjects",filteredProjects)} */}
          {filteredProjects?.length > 0 ? (
            <ProjectListTable
              projectData={filteredProjects}
              onViewDetails={handleViewDetails}
              onDeleteProject={handleDeleteProject}
              handleStatusChange={handleStatusChange}
              value={currentProjectStatus}
              project={selectedProject}
            />
          ) : (
            <div className='w-full' style={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography variant="body1" color="textSecondary">
                No data available
                {/* <div className="flex items-center space-x-2 text-sm text-gray-600">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
  <span className="font-medium border">
     
    Date: 02/04/2024
  </span>
</div> */}
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <div className='w-100 h-100  justify-center flex m-auto h-100vh items-center'>
          <CircularProgress />
 
        </div>
      )}
 
      <ProjectDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
};
 
export default MyTable;
 