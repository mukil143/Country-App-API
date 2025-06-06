import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const CountryDetails = () => {
  const { name } = useParams();

  const [country, setcountry] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const apiRes = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const CountryData = await apiRes.json();
        setcountry(CountryData[0]);
        // console.log(CountryData[0]);
      } catch (errormsg) {
        console.log("Apireserror", errormsg);
      } finally {
        setloading(false);
      }
    };

    if (name) {
      fetchdata();
    }
  }, [name]);

  if (loading) {
    return <Loading />;
  }

  console.log(country);

  return (
    <section className=" container flex  p-5 flex-col h-screen  justify-between">
      <div className="container p-5 ">
        <h1 className="text-center text-2xl font-bold mb-2 ">
          <p className="">{Object.values(country.name)[0].toUpperCase()}</p>
        </h1>

        <img className="w-full h-32 object-contain" src={country.flags.svg} />
        <div className="mt-5">
          <p>
            <span className="font-semibold">Native Name : </span>
            {Object.entries(country.name.nativeName).map(
              ([code, { official }], idx, arr) => {
                return (
                  <span key={code}>
                    {official} {""} {idx < arr.length - 1 && ", "}
                  </span>
                );
              }
            )}
          </p>
          <p>
            <span className="font-semibold">Population: </span>
            {country.population}
          </p>
          <p>
            <span className="font-semibold">Capital: </span>
            {country.capital[0]}
          </p>

          {Object.entries(country.currencies).map(
            ([code, { name, symbol }], idx, arr) => (
              <p key={code}>
                <span className="font-semibold">Currencies : </span>
                {name} ({symbol}){idx < arr.length - 1 && ","}
              </p>
            )
          )}
          <p>
            <span className="font-semibold">Languages :</span>
            {/* {console.log(Object.entries(country.languages))}  */}
            {/*  [['eng', 'English'],  ['fij', 'Fijian'],  ['fij', 'Fijian']] */}
            {Object.entries(country.languages).map((item, idx, arr) => {
              return (
                <span key={idx}>
                  {" "}
                  {item[1]} {idx < arr.length - 1 && ","}{" "}
                </span>
              );
            })}
          </p>

          <p>
            <span className="font-semibold">Location : </span>
            <a className="text-blue-400" href={country.maps.googleMaps}>
              {country.maps.googleMaps}
            </a>
          </p>
          <p>
            <span className="font-semibold">Sub Region : </span>
            {country.subregion}
          </p>
          <p>
            <span className="font-semibold">TimeZone: </span>
            {country.timezones[0]}
          </p>
          <p>
            <span className="font-semibold">Coat of Arms: </span>
          </p>
          <div className="flex justify-center  ">
            <img
              className=" h-32 inline-block  "
              src={country.coatOfArms.svg}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="relative   ">
        <div className="sticky top-10 z-50 flex justify-center" >

        <a
          className="flex justify-center items-center gap-1  bg-black text-white  w-fit px-4 py-1 rounded-lg shadow-md   hover:cursor-pointer  "
          href="/"
        >
          <HiArrowLeft className="inline" /> Back
        </a>
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;
