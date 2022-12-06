import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import FloatingAlrert from "../components/floating-alrert";
import styles from "../styles/Home.module.css";
import keyTable from "./keyTable.json";
interface ICurrentKey {
  key: string;
  code: string;
  which: number;
  keyCode: number;
}
interface IKeyInfo {
  title: string;
  keyIndex: "key" | "code" | "which" | "keyCode";
}
interface IButton {
  title: IBindKeys;
  icon: string;
  isPressed: boolean;
}
type IBindKeys = "Meta" | "Alt" | "Ctrl" | "Shift" | "Key";
const Home = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("inspector");
  const [currentKey, setCurrentKey] = useState<ICurrentKey | undefined>(
    undefined
  );
  const [visible, setVisible] = useState(false);
  const [buttonDedicatorObj, setButtonDedicatorObj] = useState<IButton[]>([
    {
      title: "Shift",
      icon: "⇧",
      isPressed: false,
    },
    {
      title: "Ctrl",
      icon: "⌃",
      isPressed: false,
    },
    {
      title: "Meta",
      icon: "⌘",
      isPressed: false,
    },
    {
      title: "Alt",
      icon: "⌥",
      isPressed: false,
    },
    {
      title: "Key",
      icon: "",
      isPressed: false,
    },
  ]);
  const handleOnClick = (item: IKeyInfo) => {
    if (!visible) {
      setVisible(true);
      currentKey &&
        currentKey[item.keyIndex] &&
        window.navigator.clipboard.writeText(
          currentKey?.[item.keyIndex].toString()
        );
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  };
  const bindKeyFunc = useCallback(
    (key: React.KeyboardEvent["key"]) => {
      if (key === "Control") {
        key = "Ctrl";
      }
      if (key) {
        const tempData = buttonDedicatorObj.map((item) => {
          if (item.title === key) {
            return { ...item, isPressed: true };
          }
          return { ...item, isPressed: false };
        });
        setButtonDedicatorObj(tempData);
      }
    },
    [buttonDedicatorObj]
  );
  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent) => {
      bindKeyFunc(e.key);
      const { key, code, which, keyCode } = e;
      setCurrentKey({ key, code, which, keyCode });
    },
    [bindKeyFunc]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleOnKeyDown);
    return () => {
      window.removeEventListener("keydown", handleOnKeyDown);
    };
  }, [currentPage, handleOnKeyDown]);

  const keyInfo: IKeyInfo[] = [
    { title: "e.key", keyIndex: "key" },
    { title: "e.code", keyIndex: "code" },
    { title: "e.which", keyIndex: "which" },
    { title: "e.keyCode", keyIndex: "keyCode" },
  ];
  return (
    <div className={styles.mainContainer}>
      {visible ? <FloatingAlrert /> : <></>}

      <div className={styles.headerContainer}>
        <h1
          className={styles.logo}
          onClick={() => {
            setCurrentPage("inspector");
          }}
        >
          ⌨️ Key.js
        </h1>
        <button
          className={styles.tableButton}
          onClick={() => {
            if (currentPage === "inspector") {
              setCurrentPage("table");
            } else {
              setCurrentPage("inspector");
            }
          }}
        >
          {currentPage === "inspector" ? "Keycodes Tables" : "Key Inspector"}
        </button>
      </div>

      <div className={styles.bodyContainer}>
        {currentPage === "inspector" ? (
          <>
            <p style={{ fontSize: "12px" }}>
              Press any key to get the JavaScript keydown event key, code, which
              and keyCode properties:
            </p>
            <input
              className={styles.input}
              placeholder="Press any key to start..."
            ></input>
            <div style={{ marginBottom: "10px" }}></div>
            <div className={styles.buttonContainer}>
              {buttonDedicatorObj.map((item) => {
                return (
                  <div
                    className={styles.buttonWrapper}
                    key={item.title}
                    style={
                      item.isPressed
                        ? {
                            background: "#4096ff",
                            color: "white",
                          }
                        : {}
                    }
                  >
                    {item.icon ? (
                      <div>{item.icon}</div>
                    ) : (
                      <>
                        <div></div>
                        <div>{currentKey?.key}</div>
                      </>
                    )}
                    <div style={{ fontSize: "12px" }}>{item.title}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginBottom: "30px" }}></div>
            <div className={styles.buttonContainer}>
              {keyInfo.map((item: IKeyInfo) => {
                return (
                  <div
                    className={styles.buttonWrapper2}
                    key={item.title}
                    onClick={() => handleOnClick(item)}
                  >
                    <div style={{ fontSize: "12px" }}>{item.title}</div>
                    <div style={{ fontSize: "14px", marginTop: "10px" }}>
                      {currentKey?.[item.keyIndex]}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginBottom: "50px" }}></div>
            <div style={{ fontSize: "12px", marginBottom: "20px" }}>
              Click a value to copy.
            </div>
            <div>
              Inspired by{" "}
              <a className={styles.a} href="https://keyjs.dev/">
                https://keyjs.dev/
              </a>
            </div>
<div style={{margin:'100px'}}></div>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <td>Key Code</td>
                  <td>Key Description</td>
                </tr>
              </thead>
              <tbody>
                {keyTable.map((item, idx) => {
                  const key = `${item}_${idx}`;
                  return (
                    <tr key={key}>
                      <td className={styles.td}>{item.keyCode}</td>
                      <td className={styles.td}>{item.keyDescrpition}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className={styles.footerContainer}>
        <span className={styles.footerCopy}>
          Copyright © 2022 Jihwan Kim. All rights reserved.
        </span>
        <a className={styles.a} href="mailto:fankim@icloud.com">
          <span>✉️</span>fankim@icloud.com
        </a>
        <a className={styles.a} href="https://github.com/fankimm">
          Github
        </a>
      </div>
    </div>
  );
};

export default Home;
