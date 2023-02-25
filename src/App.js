import React, { useState, useEffect } from 'react';
import './App.css';
import Pagination from 'react-js-pagination'
import _ from 'lodash'
import RecordsGrid from './components/RecordsGrid/RecordsGrid';
import Calc from './components/Calculator/Calc';
import UndoRedoBox from './components/UndoRedo/UndoRedoBox';
//import {TextField} from "@mui/material"
//import "bootstrap/less/bootstrap.less";

function App() {
const [task,setTask] = useState(0)
  return (
    <div className="App">
      <h2>MindBody take home assignment Tasks</h2>
      <div>
      <button style={task == 1 ? {background:'green',color:'#FFF'} : {}} onClick={()=>setTask(1)}>Calculator</button>
      <button style={task == 2 ? {background:'green',color:'#FFF'} : {}} onClick={()=>setTask(2)}>Post Render with API</button>
      <button style={task == 3 ? {background:'green',color:'#FFF'} : {}} onClick={()=>setTask(3)}>Redo-Undo input</button>
      </div>
      
      {task ==2 && <RecordsGrid/>}
      {task ==1 && <Calc/>}
      {task ==3 && <UndoRedoBox/>}
      
    </div>
  );
}

export default App;
