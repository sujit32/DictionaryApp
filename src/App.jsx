import { useState } from "react";
import Content from "./Content";
import Heading from "./Heading";
import searchImg from "./assets/search.png";

function App() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  const searchWord = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
      );
      const data = await response.json();
      setResults(data[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.response.message ?? "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="my-4 h-8 flex flex-row items-center">
        <h3 className="text-indigo-600 font-bold text-2x1">Word Finder</h3>
      </nav>
      <div className="flex items-center">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full bg-gray-100 border-none outline-none rounded-lg px-2 py-4 shadow-sm"
        />
        <button
          disabled={loading}
          className="bg-gray-300 px-3 py-2 rounded-lg ml-2"
          onClick={searchWord}
        >
          <img src={searchImg} width={18} alt="Search" />
        </button>
      </div>

      {loading ? (
        "Loading..."
      ) : (
        <div>
          {results?.meanings?.length > 0 ? (
            <>
              <Heading
                audioUrl={
                  results?.phonetics.find((phone) => phone.audio !== "")?.audio
                }
                word={results?.word}
                phonetic={results?.phonetic}
              />
              {results.meanings.map((content, index) => {
                return <Content {...content} key={index} />;
              })}
            </>
          ) : (
            <p>Result</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
