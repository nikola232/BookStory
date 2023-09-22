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
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, getToken } from "@/services/Cookie.service";
import { booksServices as books } from '@/services/Books.service';
import { BookProps } from '@/types';
import { useParams, useRouter } from 'next/navigation';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);
    const booksServices = books()
    const access = getToken(ACCESS_TOKEN)
    const defaultTheme = createTheme();
    const params = useParams();
    const router = useRouter();
    const { bookId } = params;
    
    const handleSubmit = async(e: any) => {
      e.preventDefault();
      setDisableBtn(true);
  
      const form: BookProps = {
        title: title,
        author: author,
        isbn: +bookId,
      }
  
      const res = await booksServices.editBook(+bookId, form, access);
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

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const data = await booksServices.getBookById(+params.bookId, access);
          if (data.status) {
            setTitle(data.book.title)
            setAuthor(data.book.author)
          } else {
            router.push('/books');
          }
        } catch (error) {
          throw new Error('An error occurred');
        }
      };
  
      fetchBooks();
    }, []);

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
                  label={title ? '' : 'Book Title'}
                  name="title"
                  autoComplete="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="author"
                  label={author ? '' : 'Author'}
                  name="author"
                  autoComplete="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="isbn"
                  disabled
                  name="isbn"
                  autoComplete="isbn"
                  value={bookId}
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
              Edit Book
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditBook;
