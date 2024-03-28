import { useEffect, useState } from "react";
import "./App.css";
import { SelectInput } from "./components/SelectInput";
import { getRickAndMortyCharacters } from "./helpers/fetchRickandMortyAPI";
import { SelectInputOption } from "./components/SelectInput/types";

function App() {
  const [options, setOptions] = useState<SelectInputOption[]>([]);

  const getRnMData = async (pageNumber: number) => {
    const response = await getRickAndMortyCharacters(pageNumber);
    if (response.status) {
      const newOptions = response.data?.map((character) => ({
        value: String(character.id),
        label: character.name,
        image: character.image,
        description: `${character.episode.length} episodes`,
      }));

      setOptions(newOptions || []);
    }
  };

  useEffect(() => {
    getRnMData(1);
  }, []);
  return (
    <div className="App">
      <SelectInput onChange={() => null} options={options} />
    </div>
  );
}

export default App;
