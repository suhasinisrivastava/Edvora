import Image from 'next/image';
import React from 'react';
import styles from "./NavigationOption.module.css";

 export default function NavigationOption({user}) {
  return (
        <div className={styles.NavigationOption}>
            <div className={styles.Starting}>Edvora</div>
            <div className={styles.Ending}>
                <div className={styles.userName}>{user.name}</div>
                <Image src={user.url} width={44} height={44} alt='user picture' className={styles.image}></Image>
            </div>
        </div>
  )
}


