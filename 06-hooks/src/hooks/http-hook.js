import { useReducer, useCallback } from "react";

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
      };

    case "RESPONSE":
      return {
        ...httpState,
        loading: false,
        data: action.responseData,
      };

    case "ERROR":
      return {
        loading: false,
        error: action.error,
      };

    case "CLEAR":
      return {
        ...httpState,
        error: null,
      };

    default:
      throw new Error("WHOOPS");
  }
};

const useHttp = () => {
  const [httpProp, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method,
      body,
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        dispatchHttp({ type: "RESPONSE", responseData });
      })
      .catch((err) => {
        dispatchHttp({ action: "ERROR", error: err.message });
      });
  }, []);

  return {
    loading: httpProp.isLoading,
    data: httpProp.data,
    error: httpProp.error,
    sendRequest,
  };
};

export default useHttp;
