import React, { useEffect, useMemo, useRef, useState } from "react";
import { CountryProvider } from "../Context/CountryContext";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

const CountryList = () => {
  const [countries, setcountries] = useState([]);
  const [loading, setloading] = useState(true);

  const [inputtext, setinputtext] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const apiRes = await fetch("https://restcountries.com/v3.1/all");
        const CountryDatas = await apiRes.json();
        setcountries(CountryDatas);

        console.log(CountryDatas);
      } catch (errormsg) {
        console.log("Apireserror", errormsg);
      } finally {
        setloading(false);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  const filterescountries = useMemo(() => {
    return countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(inputtext.toLowerCase());
    });
  }, [inputtext, countries]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="  ">
      <section className=" overflow-y-scroll h-screen scrollbar-hidden">
        <h1 className="text-4xl text-black font-bold text-center mt-2 ">Countries</h1>
        <div className="container    flex justify-center sticky pb-2 shadow-xl top-0  z-50 bg-white  ">
          <div className="   flex items-center w-86 border-1 border-gray-200 rounded-full shadow-md  px-2 text-center mt-5 md:w-xl ">
            <p className="text-2xl inline ">
              <HiSearch />
            </p>
            <input
              value={inputtext}
              onChange={(e) => {
                setinputtext(e.target.value);
              }}
              ref={inputRef}
              type="text"
              className="inline   p-2   outline-none    "
              placeholder="Search Country....."
            />
          </div>
        </div>
        <section className="mt-5 p-5 grid grid-cols-2 gap-6 *:hover:cursor-pointer md:grid-cols-3 lg:grid-cols-4  ">
          {filterescountries.map((country, idx) => (
            <div
              key={idx}
              className="container   p-4 border-2 shadow-lg border-gray-200 rounded-lg  transition-transform  hover:scale-105 "
            >
              <a href={`/country/${country.name.common}`}>
                <img
                  className="w-full h-32 object-contain"
                  src={country.flags.svg}
                  alt={country.flags.alt}
                />
                <p className="text-xl mt-2  ">{country.name.common}</p>
              </a>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
};

export default CountryList;
