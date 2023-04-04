import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [isi, setIsi] = useState("");
  const [data, setData] = useState(null);

  async function Cuaca() {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=c540e85fe248426fa6e20242233103&q=${isi}&aqi=no`
    );
    const data = await res.json();
    setData(data);
  }
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>
      <div className="container ">
        <div className="row text-center">
          <div className="col mt-5">
            <h1>Search Location</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="input-group mb-3">
              <input
                value={isi}
                onInput={(e) => setIsi(e.target.value)}
                type="text"
                className="form-control bg-transparent w-25 text-dark "
                placeholder="Cari Kota..."
              />
              <button
                onClick={Cuaca}
                className="btn btn-dark search-button"
                type="button"
              >
                Cari
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center" id="Cuaca">
          {data && (
            <div className="col-md-5 my-3">
              <div className="row justify-content-center mb-5 bg-transparent">
                <div className="col-md-5">
                  {" "}
                  <Image
                    src={`https:${data.current.condition.icon}`}
                    width={100}
                    height={100}
                    alt=""
                  />
                </div>
                <div className="col-md-5 mt-2">
                  <h2 className="card-title mb-2">{data.location.name}</h2>
                  <h3>{data.current.temp_c} ℃</h3>
                </div>
              </div>
              <div className="card">
                <div className="card-body mt-5">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <h6>Cakupan awan:</h6>
                      {data.current.cloud}%
                    </div>
                    <div className="col-md-4">
                      <h6>Titik Embun:</h6>
                      {data.current.humidity} ℃
                    </div>
                    <div className="col-md-4">
                      <h6>kecepatan angin:</h6>
                      {data.current.wind_mph} mph
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
