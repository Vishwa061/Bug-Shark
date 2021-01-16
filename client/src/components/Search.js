import React, { useState } from "react";
import search_icon from "../assets/icons/search_icon.png";

const Search = ({ id, input_id, onSearch, placeholder }) => {
    const [input, setInput] = useState("");

    return (
        <div id={id}>
            <img src={search_icon}
                alt="search"
                id="search-icon"
                onClick={() => onSearch(input)} // figure out how to pass input to TodaysActiveBugsList
            />
            <input id={input_id}
                type="text"
                placeholder={placeholder}
                onKeyUpCapture={(e) => {
                    if (e.key === "Enter") {
                        onSearch(input);
                    }
                }}
                onInput={e => setInput(e.target.value)}
            />
        </div>
    );
}

export default Search;