import React, {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';
import List from './List';

function App() {
    let [searchBarState, changeSearchBarState] = useState("");
    let allmhsRef = useRef(undefined);
    let [shownMahasiswa, changeShownMahasiswa] = useState([]);
    let [loading, setLoading] = useState(false);
    useEffect(()=>{
        console.log(process.env.PUBLIC_URL);
        setLoading(true)
        if(localStorage.getItem("data_mahasiswa") == null){
            (async ()=>{
                let temp = await fetch(`${process.env.PUBLIC_URL}/data/mahasiswa_compressed.json`);
                temp = await temp.text();
                // console.log(temp);
                localStorage.setItem("data_mahasiswa",temp);
                allmhsRef.current  = JSON.parse(temp);
                setLoading(false);
            })();
        }else{
            (async () => {
                let temp = localStorage.getItem("data_mahasiswa");
                allmhsRef.current = JSON.parse(temp);
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
                    return (elmt[0].toLowerCase().indexOf(searchBarState) !== -1) || (elmt[2].indexOf(searchBarState) !== -1) || (elmt[1] ? false :  (elmt[3].indexOf(searchBarState) !== -1))
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
