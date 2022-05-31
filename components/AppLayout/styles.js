import css from "styled-jsx/css";

import { breakpoints, colors, fonts } from "../../styles/theme";
import { addOpacityToColor } from "../../styles/utils";

const backgroundColor = addOpacityToColor(colors.primary, 0.3);

export const globalStyles = css.global`
  html,
  body {
    /* background-image: radial-gradient(${backgroundColor} 1px, #fdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px); */
    background-color: ${colors.black};
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
  }
  * {
    box-sizing: border-box;
  }
  textarea,
  input {
    font-family: ${fonts.base};
  }
`;

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }
  main {
    background: ${colors.white};
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 100%;
    overflow-y: auto;
    position: relative;
    width: 100%;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.white};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${colors.strong};
  }
  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`;
