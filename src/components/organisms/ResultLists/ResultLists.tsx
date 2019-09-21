import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { AppProps } from "../../../App";
import { RootState } from "../../../reducers";
import PageNatior from "../../molecules/PageNatior";

type ResultListsProps = AppProps & {};

export const ResultLists = (props: ResultListsProps) => {
  const search: string = useSelector((state: RootState) =>
    get(state, ["router", "location", "search"])
  ).slice(1);
  const decode: string = decodeURI(search);
  const urlParams: string[] = decode.split(/&/g);
  const keyWords: string = urlParams
    .filter(param => param.startsWith("key="))
    .map(param => param.replace(/^key=/g, ""))
    .join(" ");
  const pageIndex: number =
    parseInt(
      urlParams
        .filter(param => param.startsWith("page="))
        .map(param => param.replace(/^page=/g, ""))
        .slice(-1)
        .toString(),
      10
    ) || 0;

  const [isLoading, setIsLoading] = useState(false);

  const getBookLists = async () => {};

  useEffect(() => {
    console.log(keyWords);
    console.log(pageIndex);
  }, []);

  return (
    <>
      <PageNatior
        totalPage={100}
        currentPage={0}
        handleClick={() => console.log("Hello")}
      />
    </>
  );
};

export default ResultLists;
