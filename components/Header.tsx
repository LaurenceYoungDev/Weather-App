import styles from "@/styles/Header.module.css";
import { lato } from "@/api/fonts";
import Image from "next/image";
import HeaderIcon from "@/public/icons/fill/rain.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <p className={lato.className}>Tokyo, Japan</p>
        <div className={styles.units}>
          <button>℃</button>
          <button>℉</button>
        </div>
      </div>
      <Image src={HeaderIcon} alt="header-icon" className={styles.icon} />
      <div className={styles.temperature}>
        <p className={lato.className}>
          12<i>℃</i>
        </p>
        <p className={styles.status}>Rain and snow mixed</p>
      </div>
    </header>
  );
}
