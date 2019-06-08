import React from "react";
import RoostBook from './routes';
import ReactDOM from 'react-dom';

const appContainer = document.createElement("div");
appContainer.classList.add("container");
document.getElementsByTagName("body")[0].appendChild(appContainer);

ReactDOM.render(<RoostBook/>, appContainer);

