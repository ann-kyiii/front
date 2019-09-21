import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

type KeywordTag = {
  id: number;
  keyword: string;
  isSelected: boolean;
};

export type KeywordTags = KeywordTag[];

export const resetKeywordTag = actionCreator("RESET_keywordTag");
export const changeKeywordTag = actionCreator<number>("CHANGE_keywordTag");
