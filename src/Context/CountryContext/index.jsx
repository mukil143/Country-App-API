import { createContext, useState } from "react";

const CountryContext=createContext();

export const CountryProvider= ({children})=>{
    const [countries,setcountries]=useState([]);

    

    const getAllcountries= async ()=>{
       const apiRes= await fetch("https://restcountries.com/v3.1/all");
       const CountryDatas=await apiRes.json();
       console.log("apiRes",CountryDatas)

    }
    getAllcountries();

    return(
        <CountryContext.Provider value={{countries}
        } >
            {children}

        </CountryContext.Provider>
    )
    
}

