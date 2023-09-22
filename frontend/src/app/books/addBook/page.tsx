'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ACCESS_TOKEN, getToken } from "@/services/Cookie.service";
import { booksServices as books } from '@/services/Books.service';
import { BookProps } from '@/types';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);
    const booksServices = books()
    const access = getToken(ACCESS_TOKEN)
    const defaultTheme = createTheme();
    const router = useRouter();

    const handleSubmit = async(e: any) => {
      e.preventDefault();
      setDisableBtn(true);
  
      const form: BookProps = {
        title: title,
        author: author,
        isbn: +isbn,
      }
  
      const res = await booksServices.createBook(form, access);
      console.log('res', res)
      try {
        if (res.status) {
            router.push('/books')
        } else {
            setDisableBtn(false);
            setErrorMessage(res.message)
        }
        
      } catch (error) {
        throw new Error('An error occurred');
      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ImportContactsIcon />
          </Avatar>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Book Title"
                  name="title"
                  autoComplete="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="author"
                  label="Author"
                  name="author"
                  autoComplete="author"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="isbn"
                  label="ISBN"
                  name="isbn"
                  autoComplete="isbn"
                  type='number'
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </Grid>
            </Grid>
            <Typography component="h3" variant="h5" style={{ color: "red" }}>
              {errorMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disableBtn}
            >
              Add New Book
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddBook;
