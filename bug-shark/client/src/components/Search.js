import React, { Fragment, useState } from "react";
import search_icon from "../assets/icons/search_icon.png";

const Search = (props) => {
    const [input, setInput] = useState("");

    return (
        <Fragment>
            <div id={props.id}>
                <img src={search_icon}
                    alt="search"
                    id="search-icon"
                    onClick={() => props.onSearch(input)} // figure out how to pass input to TodaysActiveBugsList
                />
                <input id="home-search-input"
                    type="text"
                    placeholder="Search Project..."
                    value={input}
                    onKeyUpCapture={(e) => {
                        if (e.key === "Enter") {
                            props.onSearch(input);
                        }
                    }}
                    onInput={e => setInput(e.target.value)}
                />
            </div>
        </Fragment>
    );
}

export default Search;