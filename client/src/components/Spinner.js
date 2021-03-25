import { useState } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

function Spinner(props) {
    let [loading, setLoading] = useState(true);
  return (
    <div>
      <p id="spinner-text">Waiting for data.....</p>
      <ClipLoader id="spinner" color={'black'} loading={loading} css={override} size={150} />
    </div>
  );  
}

export default Spinner;
