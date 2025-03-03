// src/api/marvelApi.ts
import { Md5 } from 'ts-md5'; // Assuming 'ts-md5' is installed

const PUBLIC_KEY = "87b84f42b7f64d85eab4686dcee75e8f";
const PRIVATE_KEY = "78762c408f27bbfcf7c77ad8e127b162b71684b7";
const BASE_URL = "https://gateway.marvel.com/v1/public";

const getAuthParams = () => {
  const ts = new Date().getTime();
  const hash = Md5.hashStr(ts + PRIVATE_KEY + PUBLIC_KEY);
  return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
};

export const fetchCharacters = async (limit: number = 20, offset: number = 0) => {
  const url = `${BASE_URL}/characters?limit=${limit}&offset=${offset}&${getAuthParams()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching characters");
  const data = await response.json();
  return data.data.results;
};
