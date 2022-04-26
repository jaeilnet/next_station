import React from "react";

const UseFetch = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-type": "application/json;charset=UTF-8",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "no-cors",
  });

  const data = await response.json();

  return { data };
};

export default UseFetch;
