import component from "./component";
import "./main.css";
import 'purecss';
import 'react';
import 'react-dom';
import { bake } from './shake';
// import "./main.scss";
bake();
document.body.appendChild(component());
