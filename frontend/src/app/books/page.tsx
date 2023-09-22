'use client'

import { booksServices as books } from '@/services/Books.service';
import { BookProps } from '@/types';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ACCESS_TOKEN, getToken } from "@/services/Cookie.service";
import { sortBooks } from "@/shared/helpers";


const Books = () => {
  const booksServices = books();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentBooks, setCurrentBooks] = useState<BookProps[]>([]);
  const [allBooks, setBooks] = useState<BookProps[]>([]);
  const access = getToken(ACCESS_TOKEN)
  const router = useRouter();

  const booksPerPage: number = 8;
  const totalPages = Math.ceil(allBooks.length / booksPerPage);
  const filterOptions = ['Title', 'Author', 'ISBN'];
  
  const editBook = (id: number) => {
    router.push(`/books/editBook/${id}`);
  }

  const deleteBook = async (id: number) => {
    try {
      const data: any = await booksServices.deleteBook(id, access);
      if (data.status) {
        window.location.reload();
      }
    } catch (error) {
      throw new Error('An error occurred');
    }
  }

  const handlePageChange = async (event: any, newPage: number) => {  
    // Update the current page
    setCurrentPage(newPage);

    const startIndex = (newPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    // Slice the books array to get the books for the current page
    const currentBooks = allBooks.slice(startIndex, endIndex);
    setCurrentBooks(currentBooks);
  };

  const filterBooks = async (event: any) => {
      const selectedValue = event.target.value.toLowerCase();
      const sortedBooks = await sortBooks(currentBooks, selectedValue);
      setCurrentBooks(sortedBooks);
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data: any = await booksServices.getBooks(access);
          // Calculate the index range for the current page
        const startIndex = (currentPage - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        // Slice the books array to get the books for the current page
        const currentBooks = data.books.slice(startIndex, endIndex);

        setBooks(data.books);
        setCurrentBooks(currentBooks)
      } catch (error) {
        throw new Error('An error occurred');
      }
    };

    fetchBooks();
  }, []);

  return (
    <Box m={4}>
      <FormControl style={{ margin: '20px 0', minWidth: '120px' }}>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Filter"
          onChange={filterBooks}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {currentBooks ? currentBooks.map((book) => (
          book && <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
                  alt="Book"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Isbn: {book.isbn}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => editBook(book.isbn)}>
                  Edit
                </Button>
                <Button size="small" color="primary" onClick={() => deleteBook(book.isbn)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )) : 
        <Typography variant="body2" color="text.secondary">
          No Book Found
        </Typography>
        }
      </Grid>
      <Pagination page={currentPage} count={totalPages} onChange={handlePageChange}/>
    </Box>
  )
}

export default Books;