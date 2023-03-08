import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Panel from "@/components/Panel";
import { getHourlyForecast } from "@/api/request";
import { CurrentWeather, HourlyData } from "@/types/temperature";

interface HomeProps {
  hourlyData: HourlyData;
  currentWeather: CurrentWeather;
}
export default function Home({ hourlyData, currentWeather }: HomeProps) {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="A weather app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Header currentWeather={currentWeather} />
        <Panel hourlyData={hourlyData} />
      </div>
    </>
  );
}

function getCurrentWeather(data: HourlyData) {
  const currentHour = new Date().getHours();
  const hours: string[] = data.time;
  const currentIndex = hours.findIndex(
    i => i.slice(-5, -3) === currentHour.toString()
  );
  const currentWeather = {
    weatherCode: data.weathercode[currentIndex],
    temperature: data.temperature_2m[currentIndex],
    apparentTemperature: data.apparent_temperature[currentIndex],
    humidity: data.relativehumidity_2m[currentIndex],
    visibility: data.visibility[currentIndex],
    windSpeed: data.windspeed_10m[currentIndex],
  };
  return currentWeather;
}

export async function getServerSideProps() {
  const hourlyData = await getHourlyForecast();
  const currentWeather = getCurrentWeather(hourlyData.hourly);
  return { props: { hourlyData: hourlyData.hourly, currentWeather } };
}
