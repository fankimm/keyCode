import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
interface ICurrentKey {
  key: string;
  code: string;
  which: number;
  keyCode: number;
}
const Home = () => {
  const [currentKey, setCurrentKey] = useState<ICurrentKey | undefined>(
    undefined
  );
  const handleKeyDown = (e) => {
    console.log(e);
    const { key, code, which, keyCode } = e;
    setCurrentKey({ key, code, which, keyCode });
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className="headerContainer">
        <h5>Key.js</h5>
        <button>Keycodes Tables</button>
      </div>
      <div className="bodyContainer">
        <p>
          Press any key to get the JavaScript keydown event key, code, which and
          keyCode properties:
        </p>
        <input placeholder="Press any key to start..."></input>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonWrapper}>Shift</div>
          <div className={styles.buttonWrapper}>Ctrl</div>
          <div className={styles.buttonWrapper}>Meta L</div>
          <div className={styles.buttonWrapper}>Alt</div>
          <div className={styles.buttonWrapper}>Key {currentKey?.key}</div>
        </div>
        <div className="showKeyInfoContainer">
          <div>e.key : {currentKey?.key}</div>
          <div>e.code : {currentKey?.code}</div>
          <div>e.which : {currentKey?.which}</div>
          <div>e.keyCode : {currentKey?.keyCode}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
