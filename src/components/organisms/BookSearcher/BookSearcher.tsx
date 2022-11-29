import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { isEmpty, get } from "lodash";
import StringBookSearcher from "../../molecules/StringBookSearcher";
import { AppProps } from "../../../App";
import { RootState } from "../../../reducers";

type BookSearchProps = AppProps & {
  className?: string[];
};

export const BookSearcher = (props: BookSearchProps) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [canEnter, setCanEnter] = useState<boolean>(false);
  const keywordTags = useSelector((state: RootState) => state.tagSelector);
  const path = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  );

  const handleToBookLists = () => {
    const keyWord: string = keywordTags
      .filter(tag => tag.isSelected)
      .map(tag => tag.keyword)
      .toString()
      .replace(/,/g, " ")
      .concat(" ", inputValue)
      .trim();
    sessionStorage.setItem("keyword", keyWord);
    // TODO: おそらくconnected-react-routerがreact-reduxのhooksに未対応
    // process.envについて
    // https://create-react-app.dev/docs/adding-custom-environment-variables/
    const keys: string = keyWord
      .split(/\s+/)
      .map(key => `key=${key}`)
      .join("&");
    const encode = encodeURI(`/book-lists?${keys}&page=1`);
    dispatch(push(encode));
    props.history.push(encode);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // tagが選択されている場合は、虫眼鏡ボタンを押す事で遷移できる
    const isAnythingSelected = keywordTags.filter(tag => tag.isSelected);
    if (!inputValue.trim() && isEmpty(isAnythingSelected)) {
      return;
    }
    handleToBookLists();
  };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setCanEnter(true);
    }
  }, []);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!canEnter) return;
    if (!inputValue.trim()) {
      setCanEnter(false);
      return;
    }
    setCanEnter(false);
    handleToBookLists();
  };

  useEffect(() => {
    if (path === "/") {
      sessionStorage.removeItem("keyword");
      return;
    }
    const sessValue = sessionStorage.getItem("keyword") || "";
    setInputValue(sessValue);
    // eslint-disable-next-line
  }, []);

  const { className } = props;

  return (
    <>
      <StringBookSearcher
        inputValue={inputValue}
        handleClick={handleClick}
        handleOnChange={handleOnChange}
        handleKeyPress={handleKeyPress}
        handleKeyUp={handleKeyUp}
        className={className}
      />
    </>
  );
};

BookSearcher.defaultProps = {
  className: [""]
};

export default BookSearcher;
