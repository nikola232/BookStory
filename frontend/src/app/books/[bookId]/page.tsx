'use client'

import { booksServices as books } from '@/services/Books.service';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, getToken } from "@/services/Cookie.service";
import { BookProps } from '@/types';
import { useRouter } from 'next/navigation'

const Book = ({ params }: any) => {
  const booksServices = books();
  const [book, setBook] = useState<BookProps>();
  const access = getToken(ACCESS_TOKEN)
  const router = useRouter();
  

  const editBook = (id: number) => {
    router.push(`/editBook/${id}`);
  }

    const deleteBook = async (id: number) => {
    try {
      const data: any = await booksServices.deleteBook(id, access);
      if (data.status) {
        router.push(`/books`);
      }
    } catch (error) {
      throw new Error('An error occurred');
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await booksServices.getBookById(+params.bookId, access);
        
        if (data.status) {
          setBook(data.book); 
        }
      } catch (error) {
        throw new Error('An error occurred');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {book ? <Card sx={{ maxWidth: 345 }}>
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
            <Typography gutterBottom variant="h5" component="div">
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
      </Card> : 'There is no book with this ID'}
    </div>
  )
}

export default Book;