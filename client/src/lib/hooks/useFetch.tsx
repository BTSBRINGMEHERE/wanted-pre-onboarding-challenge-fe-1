import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";

const useFetch = <T extends unknown>(baseUrl: string) => {
  const { token } = useRecoilValue(userState);

  const getData = async (subUrl: string) => {
    const url = `${baseUrl}${subUrl}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const { data } = await response.json();
    return data;
  };

  const putData = async (subUrl: string, body: T) => {
    const url = `${baseUrl}${subUrl}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const { data } = await response.json();

    return data;
  };

  const postData = async (subUrl: string, body: T) => {
    const url = `${baseUrl}${subUrl}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const { data } = await response.json();

    return data;
  };

  const deleteData = async (subUrl: string) => {
    const url = `${baseUrl}${subUrl}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const { data } = await response.json();
    return data;
  };

  return { getData, putData, postData, deleteData };
};

export default useFetch;
