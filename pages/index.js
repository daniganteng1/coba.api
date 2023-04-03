import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [isi, setIsi] = useState("");
  const [data, setData] = useState(null);

  async function Cuaca() {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=c540e85fe248426fa6e20242233103&q=${isi}&aqi=no`
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
            <h1>Cuaca di Indonesia</h1>
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
            <div className="col-md-7 my-3">
              <div className="card">
                <Image
                  src={`https:${data.current.condition.icon}`}
                  width={100}
                  height={100}
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">{data.location.name}</h5>
                  <h6>{data.current.temp_c} ℃</h6>
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <h6>Cakupan awan:</h6>
                      {data.current.cloud}%
                    </div>
                    <div className="col-md-6">
                      <h6>Titik Embun:</h6>
                      {data.current.humidity} ℃
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
