import HomeTitle from "../molecules/HomeTitle";
import BookSearcher from "../organisms/BookSearcher";
import TagSelector from "../organisms/TagSelector";

export const Home = () => (
  <>
    <HomeTitle>LTB</HomeTitle>
    <BookSearcher />
    <TagSelector />
  </>
);

export default Home;
