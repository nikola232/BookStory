'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import { deleteCookie } from '@/services/Cookie.service';
import { useRouter } from 'next/navigation';
import { ACCESS_TOKEN, getToken } from "@/services/Cookie.service";
import { usePathname } from 'next/navigation';

export default function SearchAppBar() {
  const router = useRouter();
  const access = getToken(ACCESS_TOKEN);
  const pathname = usePathname();
  const addBookPath = pathname !== '/books/addBook';

  const handleLogout = () => {
    deleteCookie('access');
    deleteCookie('user_data');
    window.location.reload();
  };

  const handleButtonClick = () => {
    router.push('/books');
  };

  const handleAddNewBook = () => {
    router.push('/books/addBook');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            style={{ cursor:'pointer' }}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            onClick={handleButtonClick}
          >
            Book App
          </Typography>
          {access && <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>}
          {(access && addBookPath) && <Button
            onClick={handleAddNewBook}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add New Book
          </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}