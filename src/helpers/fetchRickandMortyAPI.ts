// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";

type RickAndMortyDataType = {
  id: number;
  name: string;
  episode: string[];
  image: string;
};

type ResponseResult = {
  status?: boolean;
  message?: string;
  data?: RickAndMortyDataType[];
  info?: {
    next: string | null;
    count: number;
    pages: number;
  };
};

export const getRickAndMortyCharacters = async (
  pageNumber: number,
  name?: string
): Promise<ResponseResult> => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${pageNumber}&name=${
        name || ""
      }`
    );
    return {
      status: true,
      data: response.data.results,
      info: response.data.info,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: AxiosError | any) {
    return {
      status: false,
      message:
        error?.response?.data?.error ||
        "Error fetching data from Rick and Morty API",
      data: [],
    };
  }
};
