type FetchBorrowPayload = {
  id: string;
  name: string;
};

export const fetchBorrow = (payload: FetchBorrowPayload) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/borrow`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export default fetchBorrow;
