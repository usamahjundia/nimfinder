import React from 'react'
import './SearchBar.css'

export default function SearchBar({searchBarState,changeSearchBarState}){

    const changeState = (e)=>{
        changeSearchBarState(e.target.value.toLowerCase());
    }

    return (
        <div className="Searchbar">
            <div className="Searchbar-tooltip">
                <p>Insert your query here</p>
            </div>
            <input
                className="Searchbar-input"
                type="text"
                name="searchValue"
                value={searchBarState}
                onChange={changeState}
            />
        </div>
    )
}