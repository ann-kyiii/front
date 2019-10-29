import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

type BookInfo = {
  isbn: number;
  title: string;
  sumbnail: string;
  author: string[];
  publisher: string;
  contents: string;
  tag: string[];
  borrower: string[];
};

// 類似度でソートされた物が返却されるので配列
export type BookLists = BookInfo[];

export const fetchTotalBookNum = actionCreator.async<
  void,
  number, // payload: { result: number }
  { statusCode: number }
>("FETCH_TOTAL_BOOK_NUM");

export const fetchBookLists = actionCreator.async<
  { page: number }, // payload, payload: { params }
  BookLists, // payload: { result: { BookLists } }
  { statusCode: number } // payload: { error: { statusCode: number } }
>("FETCH_BOOK_LISTS");
