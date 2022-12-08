import React from "react";
import Header from "../organisms/Header";
import BookSearcher from "../organisms/BookSearcher";
import ResultLists from "../organisms/ResultLists";

export const BookLists = () => (
  <>
    <Header backLink="/" />
    <BookSearcher className={["SearchBoxHeadingWrapper"]} />
    <ResultLists />
  </>
);

export default BookLists;
