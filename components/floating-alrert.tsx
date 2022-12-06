/* eslint-disable @next/next/no-img-element */
import styles from "../styles/fa.module.css";
const FloatingAlrert = () => {
  return (
    <div className={styles.floatingContainer}>
      <div>
        <img
          src="check.svg"
          width="80%"
          // height="20%"
          alt="check"
        />
      </div>
      <div>Copied!</div>
    </div>
  );
};

export default FloatingAlrert;
