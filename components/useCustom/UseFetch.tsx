import React from "react";

const UseFetch = async (url: string) => {
  const response = await fetch(url);

  const data = await response.json();

  return { data };
};

export default UseFetch;
