type FetchSearchPayload = {
  keywords: string[];
  offset: string;
  limit: string;
};

export const fetchSearch = (payload: FetchSearchPayload) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/search`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export default fetchSearch;
