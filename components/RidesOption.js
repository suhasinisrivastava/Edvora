import React, { useCallback, useEffect, useState } from 'react';
import sort from '../images/sort.svg';
import Image from 'next/image';
import Filter from './Filter';
import styles from "./RidesOption.module.css";
import Link from 'next/link';
import {count} from '../pages/index';

export default function RidesOption({states,cities,path,user,rides}) {
    const [filters,setFilters] = useState(false);
    
    const count1=()=>{
        let array = [];
        array = [...rides];
          const val2 = array.length
          return val2
      }
    
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
                    <span className="filter" name="Upcoming ride">Upcoming rides (0)</span>
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

