import React from "react";
import HomeTitle from "../molecules/HomeTitle";
import BookSearcher from "../organisms/BookSearcher";
import TagSelector from "../organisms/TagSelector";
import { AppProps } from "../../App";

export const Home = ({ history }: AppProps) => (
  <>
    <HomeTitle>LTB</HomeTitle>
    <BookSearcher history={history} />
    <TagSelector />
  </>
);

export default Home;
