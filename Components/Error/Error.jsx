import React from 'react';

import Style from "./Error.module.css";

export default function Error({error}) {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>Please Fix this Error & Reload Browser</h1>
        {error}
      </div>
    </div>
  )
}
