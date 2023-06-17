import React from "react";
import styles from "@/styles/components/Highlighter.module.css";


const Highlighter = (props) => {
  const { text, highlight } = props;

  if (!highlight) {
    return text;
  } 
  
  const regexp = new RegExp(highlight, "gi");
  const matches = text.match(regexp);
  const parts = text.split(regexp);

  let index = 0;
  const highlightedParts = parts.map((part, i) => {
    if (i !== parts.length - 1) {
      const match = matches[index++];

      return (
        <React.Fragment key={i}>
          {part}<span className={styles.highlighted}>{match}</span>
        </React.Fragment>
      );
    }

    return part;
  });

  return (
    <div className={styles.highlighter}>
      {highlightedParts}
    </div>
  );
}; 

export default Highlighter;