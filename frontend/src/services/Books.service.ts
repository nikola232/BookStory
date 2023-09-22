import { BookProps } from "@/types";
import APIService from "./API.service"
import { BookDTO } from "@/types/dtos.types";

export const booksServices = () => {
    return {
        getBooks: async(access: string) => {
            try {
                const headers = {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${access}`,
                }
                const data: BookDTO = await APIService.makeGetCall('books', true, headers);
                return data;
            } catch (error) {
                throw error;
            }
        },

        getBookById: async(id: number, access: string) => {
            try {
                const headers = {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${access}`,
                }
                const data: BookDTO = await APIService.makeGetCall(`book/${id}`, true, headers);
                return data;
            } catch (error) {
                throw error;
            }
        },

        createBook: async(book:BookProps, access: string) => {
            try {
                const headers = {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${access}`,
                }

                const data: BookDTO = await APIService.makePostCall(
                    'books',
                    true,
                    book,
                    headers
                )
                return data;
            } catch (error) {
                throw error;
            }            
        },

        editBook: async(id: number, book:BookProps, access: string) => {
            try {
                const headers = {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${access}`,
                }

                const data: BookDTO = await APIService.makePutCall(
                    `book/${id}`,
                    true,
                    book,
                    headers
                )
                return data;
            } catch (error) {
                throw error;
            }
        },

        deleteBook: async(id: number, access: string) => {
            try {
                const headers = {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${access}`,
                }
                return await APIService.makeDeleteCall(`book/${id}`, true, headers);
            } catch (error) {
                throw error;
            }
        }
    }
}