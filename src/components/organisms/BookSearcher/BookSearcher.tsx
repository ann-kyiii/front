import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import StringBookSearcher from "../../molecules/StringBookSearcher";
import { RootState } from "../../../reducers";

type BookSearchProps = {
  className?: string[];
};

export const BookSearcher = ({ className = [""] }: BookSearchProps) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [canEnter, setCanEnter] = useState<boolean>(false);
  const [isAndSearch, setIsAndSearch] = useState(true);
  const keywordTags = useSelector((state: RootState) => state.tagSelector);
  const path = useSelector(
    (state: RootState) => state.router.location.pathname
  );
  const search: string = useSelector(
    (state: RootState) => state.router.location.search
  ).slice(1);
  const decode: string = decodeURI(search);
  const urlParams: string[] = decode.split(/&/g);
  const keyWords: string[] = urlParams
    .filter(param => param.startsWith("key="))
    .map(param => param.replace(/^key=/g, ""));

  const handleToBookLists = () => {
    const keyWord: string = keywordTags
      .filter(tag => tag.isSelected)
      .map(tag => tag.keyword)
      .toString()
      .replace(/,/g, " ")
      .concat(" ", inputValue)
      .trim();
    sessionStorage.setItem("keyword", keyWord);
    sessionStorage.setItem("isAndSearch", isAndSearch.toString());
    // TODO: おそらくconnected-react-routerがreact-reduxのhooksに未対応
    // process.envについて
    // https://create-react-app.dev/docs/adding-custom-environment-variables/
    const keys: string = keyWord
      .split(/\s+/)
      .map(key => `key=${key}`)
      .join("&");
    const encode = encodeURI(`/book-lists?${keys}&and=${isAndSearch}&page=1`);
    dispatch(push(encode));
  };

  const handleClick = () => {
    // tagが選択されている場合は、虫眼鏡ボタンを押す事で遷移できる
    const isAnythingSelected = keywordTags.filter(tag => tag.isSelected);
    if (!inputValue.trim() && isAnythingSelected.length === 0) {
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

  const handleKeyUp = () => {
    if (!canEnter) return;
    if (!inputValue.trim()) {
      setCanEnter(false);
      return;
    }
    setCanEnter(false);
    handleToBookLists();
  };

  const handleChange = useCallback(() => {
    if (isAndSearch) {
      setIsAndSearch(false);
    } else {
      setIsAndSearch(true);
    }
  }, [isAndSearch]);

  useEffect(() => {
    if (path === "/") {
      sessionStorage.removeItem("keyword");
      sessionStorage.removeItem("isAndSearch");
      return;
    }
    // ブラウザの戻るで一致しなくなった時に設定し直し
    if (
      path === "/book-lists" &&
      (sessionStorage.getItem("keyword") || "") !== keyWords.join(" ")
    ) {
      sessionStorage.setItem("keyword", keyWords.join(" "));
      sessionStorage.setItem("isAndSearch", isAndSearch.toString());
    }
    const sessValue = sessionStorage.getItem("keyword") || "";
    const sessIsAndSearch = sessionStorage.getItem("isAndSearch") || "true";
    setInputValue(sessValue);
    setIsAndSearch(sessIsAndSearch.toLowerCase() === "true");
  }, [search]);

  return (
    <StringBookSearcher
      inputValue={inputValue}
      checked={isAndSearch}
      handleClick={handleClick}
      handleOnChange={handleOnChange}
      handleKeyPress={handleKeyPress}
      handleKeyUp={handleKeyUp}
      handleChange={handleChange}
      className={className}
    />
  );
};

export default BookSearcher;
