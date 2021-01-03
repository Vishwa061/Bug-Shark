import React, { useState } from "react";
import search_icon from "../assets/icons/search_icon.png";

const Search = (props) => {
    const [input, setInput] = useState("");

    return (
        <div id={props.id}>
            <img src={search_icon}
                alt="search"
                id="search-icon"
                onClick={() => props.onSearch(input)} // figure out how to pass input to TodaysActiveBugsList
            />
            <input id={props.input_id}
                type="text"
                placeholder="Search Project..."
                onKeyUpCapture={(e) => {
                    if (e.key === "Enter") {
                        props.onSearch(input);
                    }
                }}
                onInput={e => setInput(e.target.value)}
            />
        </div>
    );
}

export default Search;