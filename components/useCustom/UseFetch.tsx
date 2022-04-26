import React from "react";

const UseFetch = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    mode: "no-cors",
  });

  const data = await response.json();

  return { data };
};

export default UseFetch;
