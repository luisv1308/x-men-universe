// src/api/marvelApi.ts
import { Md5 } from 'ts-md5'; // Assuming 'ts-md5' is installed

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const BASE_URL = "https://gateway.marvel.com/v1/public";

const getAuthParams = () => {
  const ts = new Date().getTime();
  const hash = Md5.hashStr(ts + PRIVATE_KEY + PUBLIC_KEY);
  return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
};

export const fetchCharacters = async (limit: number = 20, offset: number = 0) => {
  const url = `${BASE_URL}/series/2258/characters?limit=${limit}&offset=${offset}&${getAuthParams()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching characters");
  const data = await response.json();
  return data.data.results;
};

export const fetchCharactersByStartsWith = async (startsWith: string) => {
  const url = `${BASE_URL}/characters?nameStartsWith=${startsWith}&${getAuthParams()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching characters");
  const data = await response.json();
  return data.data.results;
}

export const fetchCharacterById = async (id: number) => {
  const url = `${BASE_URL}/characters/${id}?${getAuthParams()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching character");
  const data = await response.json();
  return data.data.results[0];
};

export const fetchCharacterComics = async (id: number) => {
  const url = `${BASE_URL}/characters/${id}/comics?${getAuthParams()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching character comics");
  const data = await response.json();
  return data.data.results;
};

export const fetchCharacterSeries = async (id: number) => {
  const url = `${BASE_URL}/characters/${id}/series?${getAuthParams()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching character series");
  const data = await response.json();
  return data.data.results;
};

export const fetchSingleSeries = async (id: number) => {
  const url = `${BASE_URL}/series/${id}?${getAuthParams()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching single series");
  const data = await response.json();
  return data.data.results[0];
};

export const fetchSingleComic = async (id: number) => {
  const url = `${BASE_URL}/comics/${id}?${getAuthParams()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching single comic");
  const data = await response.json();
  return data.data.results[0];
};