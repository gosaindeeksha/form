// src/App.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};
const theme = createTheme({
    components: {
      // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
      MuiDataGrid: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-cell': {
            color: 'white', 
            backgroundColor:'black',
            // Change text color for cells
          },
          '& .MuiDataGrid-columnHeader': {
            color: 'white',
            backgroundColor:'black',
             // Change text color for column headers
          },
          '& .MuiDataGrid-footer': {
            color: 'white', // Change text color for footer
            
          },
          '& .MuiTablePagination-caption, & .MuiTablePagination-select, & .MuiTablePagination-root': {
            color: 'white', // Change text color for pagination text and select
          },
          '& .MuiButton-text': {
            color: 'white !important', // Change button text color
          },
          
          },
        },
      },
    },
  });
const Apitable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID',flex: 1  },
    { field: 'userId', headerName: 'User ID',flex: 1  },
   
    { field: 'title', headerName: 'Title',flex: 7  },
    { field: 'body', headerName: 'Body', flex: 9 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div >
        <h1>API Data Table</h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={posts} columns={columns}  />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Apitable;
