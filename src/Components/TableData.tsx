// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Typography, Box } from '@mui/material';

// const TableData: React.FC = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userDetails = localStorage.getItem('userDetails');
//     if (!userDetails) {
//       alert('You must enter your details before accessing this page.');
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <Container>
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Welcome to the Second Page
//         </Typography>
//         <Typography variant="body1">
//           You have successfully submitted your details.
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default TableData;

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import Department from './Department';

const Table = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (!userDetails) {
          alert('You must enter your details before accessing this page.');
          navigate('/');
        }
      }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("HIIIII")
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  console.log(rows);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'userId', headerName: 'User ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 400 },
    { field: 'body', headerName: 'Body', width: 800 },
  ];

  return (
    <>
    <Box sx={{ height: '97vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    
    <Department/>
    </>
  );
};

export default Table;
