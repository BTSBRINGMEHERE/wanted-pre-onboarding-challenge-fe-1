import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atoms";
import axios from "axios";

const useFetch = <TBody, TData extends unknown>(baseUrl: string) => {
  const { token } = useRecoilValue(userState);

  const getData = async (subUrl: string): Promise<TData> => {
    const url = `${baseUrl}${subUrl}`;

    const response = await axios({
      url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    return response.data;
  };

  const putData = async (subUrl: string, body: TBody): Promise<TData> => {
    const url = `${baseUrl}${subUrl}`;

    const response = await axios({
      url,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      data: JSON.stringify(body)
    });

    return response.data;
  };

  const postData = async (subUrl: string, body: TBody): Promise<TData> => {
    const url = `${baseUrl}${subUrl}`;

    const response = await axios({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      data: JSON.stringify(body)
    });

    return response.data;
  };

  const deleteData = async (subUrl: string): Promise<TData> => {
    const url = `${baseUrl}${subUrl}`;
    const response = await axios({
      url,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    return response.data;
  };

  return { getData, putData, postData, deleteData };
};

export default useFetch;
