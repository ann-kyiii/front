import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

type BookInfo = {
  id: number;
  bookName: string;
  genre: string;
  subGenre: string;
  ISBN: string;
  find: number;
  sum: number;
  author: string;
  publisher: string;
  pubdate: string;
  exist: string;
  locateAt4F?: boolean;
  withDisc: string;
  other: string;
  borrower: string[];
  location: string;
};

// 類似度でソートされた物が返却されるので配列
export type BookLists = BookInfo[];
export type SavedBooks = {};

export const fetchBookLists = actionCreator.async<
  void,
  SavedBooks, // payload: { result: { BookLists } }
  { statusCode: number } // payload: { error: { statusCode: number } }
>("FETCH_BOOK_LISTS");

export default fetchBookLists;
