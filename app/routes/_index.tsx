import { useState } from "react";
import { css, cva } from "styled-system/css";

const styles = css({
  backgroundColor: "gainsboro",
  borderRadius: "9999px",
  fontSize: "24px",
  // bg: "primary",
  p: 4,
  // "&:hover > h2": {
  //   fontSize: "28px",
  //   color: "green",
  // },
});

const text = cva({
  base: {
    fontSize: "24px",
  },
  variants: {
    visual: {
      blue: {
        color: "secondary",
      },
      red: {
        color: "primary",
      },
    },
  },
});

const text2 = css({
  color: "secondary",
  textStyle: "body",
  // [`${styles}:hover &`]: {
  //   fontSize: "28px",
  //   color: "green",
  // },
});

export default function Page() {
  const [a, setA] = useState(true);

  return (
    <div className="group">
      <div className={css({ _groupHover: { bg: "red", height: "10px" } })}></div>
      <div className={styles}>
        <h1 className={text({ visual: a ? "blue" : "red" })}>Welcome</h1>
        <h2 className={text2}>h2</h2>
        <button
          onClick={() => {
            setA(!a);
          }}
        >
          Click
        </button>
        d
      </div>
    </div>
  );
}
