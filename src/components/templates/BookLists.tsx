import React from "react";
import { AppProps } from "../../App";
import Header from "../organisms/Header";
import BookSearcher from "../organisms/BookSearcher";
import ResultLists from "../organisms/ResultLists";

export const BookLists = ({ history }: AppProps) => (
  <>
    <Header history={history} backLink="/" />
    <BookSearcher history={history} className={["SearchBoxHeadingWrapper"]} />
    <ResultLists history={history} />
  </>
);

export default BookLists;
