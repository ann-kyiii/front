import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

type KeywordTag = {
  id: number;
  keyword: string;
  isSelected: boolean;
};

export type KeywordTags = KeywordTag[];

export const resetKeywordTag = actionCreator("RESET_KEYWORD_TAG");
export const changeKeywordTag = actionCreator<number>("CHANGE_KEYWORD_TAG");
