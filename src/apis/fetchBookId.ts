type FetchBookIdPayload = {
  id: number;
};

export const fetchBookId = (payload: FetchBookIdPayload) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/bookId/${payload.id}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default fetchBookId;
