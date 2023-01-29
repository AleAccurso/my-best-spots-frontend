import styles from "./Home.module.css"
import Map from "./MyMap"

const HomePage = () => {
  return (
    <div className="homepage flex">
      <div className={styles.placesList}>Place list</div>
      <div className={styles.map}>map<Map/></div>
    </div>
  );
};

export default HomePage;
