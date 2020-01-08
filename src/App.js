import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import List from './List';
import {DATA_MAHASISWA_KEY,DATA_VERSION_KEY} from "./CONST"

function App() {
    let [searchBarState, changeSearchBarState] = useState("");
    let allmhsRef = useRef(undefined);
    let [shownMahasiswa, changeShownMahasiswa] = useState([]);
    let [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        if((localStorage.getItem(DATA_MAHASISWA_KEY) == null) || localStorage.getItem(DATA_VERSION_KEY) == null){
            (async ()=>{
                let temp = await fetch(`${process.env.PUBLIC_URL}/data/datamahasiswa.json`);
                temp = await temp.text();
                let ver = await fetch(`${process.env.PUBLIC_URL}/data/version.json`);
                ver = await ver.text();
                localStorage.setItem(DATA_MAHASISWA_KEY,temp);
                localStorage.setItem(DATA_VERSION_KEY,ver);
                allmhsRef.current  = JSON.parse(temp);
                setLoading(false);
            })();
        }else{
            (async () => {
                let oldVer = localStorage.getItem(DATA_VERSION_KEY);
                oldVer = JSON.parse(oldVer);
                let newVer = await fetch(`${process.env.PUBLIC_URL}/data/version.json`);
                newVer = await newVer.json()
                if (newVer['updated_date'] !== oldVer['updated_date']){
                    let temp = await fetch(`${process.env.PUBLIC_URL}/data/datamahasiswa.json`);
                    temp = await temp.text();
                    localStorage.setItem(DATA_MAHASISWA_KEY,temp);
                    allmhsRef.current  = JSON.parse(temp);
                }else{
                    let temp = localStorage.getItem(DATA_MAHASISWA_KEY);
                    allmhsRef.current = JSON.parse(temp);
                }
                setLoading(false);
            })()
        }
    },[]);
    useEffect(()=>{
        if(searchBarState === '' || searchBarState.length < 3){
            changeShownMahasiswa([]);
        }else{
            setLoading(true);
            (async()=>{
                let temp = await allmhsRef.current.filter((elmt)=>{
                    return (elmt[0].toLowerCase().indexOf(searchBarState) !== -1) || (elmt[1].indexOf(searchBarState) !== -1) || (elmt.length === 2 ? false :  (elmt[2].indexOf(searchBarState) !== -1))
                });
                changeShownMahasiswa(temp);
                setLoading(false);
            })()
        }
    },[searchBarState]);
    return (
        <div className="App">
            <h1 className='Title'>NIM Finder ITB</h1>
            <SearchBar 
                searchBarState={searchBarState}
                changeSearchBarState={changeSearchBarState}
                // loading={loading}
                />
            <List
                loading={loading}
                mhsList={shownMahasiswa}
            />
        </div>
    );
}

export default App;
