import React, { useState } from 'react';
import { useStateValue } from './StateProvider';
import styles from "./Filter.module.css";

export default function Filter({name,data}) {
  const [{},dispatch] = useStateValue();
  const select = (item,name) =>{
    if(name =="State"){
      dispatch({
        
        type:"STATE",
        state:item.target.value,
      })
    }
    else if(name="City"){
      dispatch({
        type:"CITY",
        city:item.target.value,
      })
    }
  }

  return (
    <select name={name} className={styles.selectbar} defaultValue={name} title={name} onChange={(item)=>select(item,name)}>
        <option disabled>{name}</option>
        {data && data.map((data,i)=><option key={i} value={data}>{data}</option>)}
    </select>
  )
}

