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
};

export const getRickAndMortyCharacters = async (
  pageNumber: number
): Promise<ResponseResult> => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${pageNumber}`
    );
    return {
      status: true,
      data: response.data.results,
    };
  } catch (error: unknown) {
    return {
      status: false,
      message: "Error fetching data from the API.",
      data: [],
    };
  }
};
