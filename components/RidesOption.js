import React, { useCallback, useEffect, useState } from 'react';
import sort from '../images/sort.svg';
import Image from 'next/image';
import Filter from './Filter';
import styles from "./RidesOption.module.css";
import Link from 'next/link';
import {count} from '../pages/index';


export default function RidesOption({states,cities,path,user,rides}) {
    const [filters,setFilters] = useState(false);
    useEffect(()=>{
        const allFilters = document.querySelectorAll(".filter");
        allFilters.forEach((filter) => {
            filter.classList.remove(`${styles.active}`);
        });
        let name =path.slice(1);
        if(name==""){
            allFilters[0].classList.add(`${styles.active}`);
        }
        else if(name=="upcomingRides"){
            allFilters[1].classList.add(`${styles.active}`);
        }
        else if(name=="pastRides"){
            allFilters[2].classList.add(`${styles.active}`);
        }
    },[path]);

    function ToggleFunction(){
        setFilters(!filters);
    }
    
    const count1=()=>{
        const array = [];
        if(rides){
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
        var val=array.length;
        console.log(val);
        return val;
      };
    }

      
    return (
    <div className={styles.ridesOption}>
        <div className={styles.TotalRides}>
            <Link href='/'>
                <a>
                    <span className={`filter ${styles.active}`} name="Nearest Ride" >Nearest rides ({count1()})</span>
                </a>
            </Link>    
            <Link href='/upcomingRides'>
                <a>
                    <span className="filter" name="Upcoming ride">Upcoming rides </span>
                </a>
            </Link>
            <Link href='/pastRides'>
                <a>
                    <span className="filter" name="Past ride">Past rides ({count1()})</span>
                </a>
            </Link>
        </div>
        <div className={styles.filter} onClick={ToggleFunction}>
            <Image src={sort} alt="sort" width="24" height="24"></Image>
            <div className={styles.Text}>Filters</div>
        </div>
        {filters ?
            <div className={styles.filteroption}>
                <div className={styles.filteroptionText}>Filters</div>
                <hr/>
                <Filter name="State" data={states}/>
                <Filter name="City" data={cities}/>
            </div> 
            : <></>
        }
    </div>
    )
}

