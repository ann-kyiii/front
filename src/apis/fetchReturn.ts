type FetchReturnPayload = {
  id: string;
  name: string;
};

export const fetchReturn = (payload: FetchReturnPayload) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/return`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export default fetchReturn;
