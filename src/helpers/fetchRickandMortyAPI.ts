import axios from "axios";

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
  } catch (error: unknown) {
    return {
      status: false,
      message: "Error fetching data from the API.",
      data: [],
    };
  }
};
