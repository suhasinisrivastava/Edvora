import Head from 'next/head';
import styles from '../styles/Home.module.css';
import NavigationOption from '../components/NavigationOption';
import RidesOption from '../components/RidesOption';
import RidesCard from '../components/RidesCard';
import { useRouter } from 'next/router';
import { useStateValue } from '../components/StateProvider';
import { useCallback, useEffect, useState } from 'react';


export default function Home({rides,user}) {
  const router = useRouter();
  const states=[];
  const cities=[];
  
  const [{state,city},dispatch] = useStateValue();
  const [stateData,setStateData] = useState(false);

  function sort(){
    rides.map((ride) => {
      states.push(ride.state);
      cities.push(ride.city);
    })
  };

  const retrieveData=()=>{
    sort();  
    let array = [];
    array = [...rides];
    return array;
  }

  useEffect(()=>{

    const filter = (data,name) => {
      if(name == "state"){
        const filterState = retrieveData().filter((ride)=>ride.state === data);
        setSortArr(filterState);
        setStateData(true);
        filterCities(data);
      }
      if(name == "city"){
        const filterCity =retrieveData().filter((ride)=> ride.city === data);
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

  const [sortArr,setSortArr] = useState(retrieveData());
  const [citiesState,setCitiesState] = useState(cities);

  return (
    <div>
      <Head>
        <title>Suhasini</title>
      </Head>

      <main className={styles.main}>
        <NavigationOption user={user}/>
        <RidesOption states={states} cities={citiesState} path={router.pathname} rides={rides} user={user}/>
        {sortArr.map((ride,i)=> {
            var date = new Date(ride.date);
            var now = new Date(Date.now());
            var bool = now > date;
                if(bool){
                    return <RidesCard props={ride} key={i} user={user}/>
                } 
        })}
      </main>
    </div>
  )
};

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