import { BookProps } from "@/types";

export const sortBooks = (currentBooks: Array<BookProps>, selectedValue: string) => {
    return [...currentBooks].sort((a, b) => {
        if (selectedValue === 'title') {
          return a.title.localeCompare(b.title);
        } else if (selectedValue === 'author') {
          return a.author.localeCompare(b.author);
        } else if (selectedValue === 'isbn') {
          return a.isbn - b.isbn;
        } else {
          return 0; // No sorting (default)
        }
      });
  }