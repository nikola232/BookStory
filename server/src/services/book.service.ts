import { CreateBookDto } from '@/dtos/books.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { DB } from 'databases';
import { BookInterface } from '@interfaces/book.interface';

class BookService {
  public async findAllBooks(): Promise<BookInterface[]> {
    const books: BookInterface[] = await DB.Books.findAll();
    return books;
  }

  public async findBookById(bookId: string): Promise<BookInterface> {
    if (isEmpty(bookId)) throw new HttpException(400, 'BookId is empty');

    const findBook: BookInterface = await DB.Books.findOne({ where: { isbn: +bookId } });
    if (!findBook) throw new HttpException(409, "Book doesn't exist");

    return findBook;
  }

  public async createBook(bookData: CreateBookDto): Promise<BookInterface> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const findBook: BookInterface = await DB.Books.findOne({ where: { isbn: +bookData.isbn } });
    if (findBook) throw new HttpException(409, `This Book isbn: ${bookData.isbn} already exists`);

    const createBookData: BookInterface = await DB.Books.create({ ...bookData });

    return createBookData;
  }

  public async updateBook(bookData: any): Promise<BookInterface> {
    if (isEmpty(bookData)) throw new HttpException(400, 'bookData is empty');

    const updatedBook: any = await DB.Books.update(bookData, { where :{ isbn: bookData.isbn } });
    if (isEmpty(updatedBook)) throw new HttpException(409, "Book doesn't exist");

    return updatedBook;
  }

  public async deleteBook(deleteBookId: string): Promise<BookInterface> {
    if (isEmpty(deleteBookId)) throw new HttpException(400, 'BookId is empty');

    const deletedBook: any = await DB.Books.destroy({where :{ isbn: +deleteBookId }, force: false });
    if (isEmpty(deletedBook)) throw new HttpException(409, "Book doesn't exist");

    return deletedBook;
  }
}

export default BookService;
