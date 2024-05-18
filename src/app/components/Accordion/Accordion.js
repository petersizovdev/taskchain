"use client";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Data } from "./Data";
import styles from "./Accordion.module.css";

const Accordion = () => {
  const [clicked, setClicked] = useState(false);

  function toggle(index) {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  }

  return (
    <IconContext.Provider value={{ color: "#02cc6f", size: "25px" }}>
      <div className={styles.accordionsection}>
        <div className={styles.container}>
          {Data.map((item, index) => {
            const { question, answer } = item;
            return (
              <div key={index}>
                <div className={styles.wrap} onClick={() => toggle(index)}>
                  <h4>{question}</h4>
                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </div>
                <div className={styles.dropdown}></div>
                {clicked === index && (
                  <div className={styles.dropdownopen}>
                    <p>{answer}</p>
                  </div>
                )}
                <div className={styles.seporator}></div>
              </div>
            );
          })}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Accordion;
