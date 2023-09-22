export interface BaseDTO {
  status: boolean;
  access: object;
  data: object;
  message: string;
}

export interface loginDTO extends BaseDTO {
  token: string
}

export interface BookDTO {
  book: any;
  message: string;
  status: boolean;
  title: string;
  author: string;
  isbn: number;
}