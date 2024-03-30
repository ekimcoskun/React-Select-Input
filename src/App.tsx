import { useEffect, useState } from "react";
import "./App.css";
import { SelectInput } from "./components/SelectInput";
import { getRickAndMortyCharacters } from "./helpers/fetchRickandMortyAPI";
import { SelectInputOption } from "./components/SelectInput/types";

function App() {
  const [options, setOptions] = useState<SelectInputOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");

  const handleFetchMoreData = (page: number, name: string) => {
    getRnMData(page, name);
  };

  const getRnMData = async (pageNumber: number, name?: string) => {
    setLoading(true);
    const response = await getRickAndMortyCharacters(pageNumber, name);
    if (response.status) {
      const newOptions =
        response.data?.map((character) => ({
          value: String(character.id),
          label: character.name,
          image: character.image,
          description: `${character.episode.length} episodes`,
        })) || [];
      setHasNext(response?.info?.next ? true : false);

      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRnMData(1);
  }, []);

  return (
    <div className="App">
      <div className="App-Content">
        <SelectInput
          onSelectedChange={(selected) => console.log(selected)}
          isMulti={true}
          options={options}
          onMenuScrollToBottom={(page) => handleFetchMoreData(page, inputValue)}
          isLoading={loading}
          hasNext={hasNext}
          debounceDelay={500}
          onSearch={(searchText) => {
            console.log("app-sea ", searchText);
            setInputValue(searchText);
            //handleFetchMoreData(1, searchText);
          }}
        />
      </div>
    </div>
  );
}

export default App;
