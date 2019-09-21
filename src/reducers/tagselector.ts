import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  resetKeywordTag,
  changeKeywordTag,
  KeywordTags
} from "../actions/tagselector";

const keywords: string[] = [
  "深層学習",
  "機械学習",
  "進化計算",
  "強化学習",
  "プログラミング",
  "教養",
  "経済学",
  "統計学",
  "就職活動"
];

const initialState: KeywordTags = keywords.map((tag, index) => ({
  id: index,
  keyword: tag,
  isSelected: false
}));

export const tagSelectorReducer = reducerWithInitialState(initialState)
  .case(resetKeywordTag, () => initialState)
  .case(changeKeywordTag, (state, id) =>
    state.map(keywordTag =>
      keywordTag.id === id
        ? { ...keywordTag, isSelected: !keywordTag.isSelected }
        : keywordTag
    )
  );

export default tagSelectorReducer;
