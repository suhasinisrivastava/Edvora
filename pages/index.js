import Head from 'next/head';
import NavigationOption from '../components/NavigationOption';
import RidesOption from '../components/RidesOption';
import styles from '../styles/Home.module.css';
import RidesCard from '../components/RidesCard';
import { useRouter } from 'next/router';
import { useStateValue } from '../components/StateProvider';
import { useCallback, useEffect, useState } from 'react';

var val;

export default function Home({rides,user}) {
  const [stateData,setStateData] = useState(false);
  const router = useRouter();
  const [{state,city},dispatch] = useStateValue();
  
  const states=[];
  const cities=[];
  
  
  const retrieveData=()=>{
    const array = [];
    rides.map((ride) => {
      states.push(ride.state);
      cities.push(ride.city);
      const closest = ride.station_path.reduce((a, b) => {
        let differenceA = Math.abs(a - user.station_code);
        let differenceB = Math.abs(b - user.station_code);
        if (differenceA === differenceB) {
          return a > b ? a : b;
        } else {
          return differenceB < differenceA ? b : a;
        }
      })
      const distance = +(closest - user.station_code).toString().replace(/-/, "");
      array.push({ ...ride, distance: distance });
      return null;
    })
    array.sort((a, b) => a.distance - b.distance);
    val=array.length;
    console.log(val);
    return array;
  };
  const [citiesState,setCitiesState] = useState(cities);
  const [sortArr,setSortArr] = useState(retrieveData());
  useEffect(()=>{

    const filter=(data,name)=>{
      if(name === "state"){
        const filterState =retrieveData().filter((ride)=>ride.state === data);
        setSortArr(filterState);
        setStateData(true);
        filterCities(data);
      }
      else if(name==="city"){
        const filterCity = retrieveData().filter((ride)=>ride.city === data);
        console.log(filterCity,':::::d');
        setSortArr(filterCity);
      }
    }

    if(state){
      let name ="state";
      filter(state,name);
    }
    else if(city){
      let name ="city";
      filter(city,name);
    }

    function filterCities(data){
      const sortArr = rides.filter((ride)=>ride.state === data);
      const citiesArray=[];
      sortArr.map((ride)=>{
        citiesArray.push(ride.city);
      });
      setCitiesState(citiesArray);
    }

  },[state,city,rides]);

  return (
    <>
      <Head>
        <title>Suhasini</title>
      </Head>

      <main className={styles.main}>
        <NavigationOption user={user}/>
        <RidesOption states={states} cities={citiesState} path={router.pathname} rides={rides} user={user}/>
        {sortArr.map((ride,i)=><RidesCard props={ride} key={i} user={user}/>)}
      </main>
    </>
  )
};
export const count=val;
export async function getStaticProps(){
  const rides = await (await fetch('https://assessment.api.vweb.app/rides')).json();
  const user = await(await fetch('https://assessment.api.vweb.app/user')).json();

  return {
    props: {
      rides,
      user,
    }
  }
};


