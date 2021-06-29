import { Component }  from "react";
import React from "react";
import { BUNDLE_BUDGETS_URL } from "../shared/endPoints";
import {
  StatefulDataTable,
  BooleanColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
} from 'baseui/data-table';


const columns = [
    StringColumn({
      title: 'Bundle Name',
      mapDataToValue: (data) => data.name,
    }),
    StringColumn({
      title: 'Bundle Owner',
      mapDataToValue: (data) => data.owner,
    }),
    NumericalColumn({
      title: 'Bundle Size',
      format: NUMERICAL_FORMATS.DEFAULT,
      mapDataToValue: (data) => data.size,
    }),
    BooleanColumn({
      title: 'Budget Violation',
      mapDataToValue: (data) => data.budgetviolation,
    }),
  ];

     
const DummyData = [
    {name: 'asset-manifest.json', owner: 'Angad Sethi',size: 2000,budgetviolation : true},
    {name: 'index.html', owner: 'Srivathsan Baskaran',size:2000,budgetviolation :false},
    {name: 'static/css/main.9d5b29c0.chunk.css',owner: 'John Doe',size:2500,budgetviolation :false},
    {name: 'static/js/2.c7c9c3cc.chunk.js',owner: 'Jane Doe',size:2098,budgetviolation :true},
    {name: 'static/js/3.fec58525.chunk.js', owner: 'Ashok Gupta',size :1435,budgetviolation :false},
  ].map(r => ({id: r['name'], data: r}));


// Code to fetch and display bundle data

function getBudgetStats() {
    fetch(BUNDLE_BUDGETS_URL)
        .then((result) => result.json())
            .then((budgets) => {
                console.log(budgets)
            })
}


export default class Table extends Component{
  constructor(props){
    super(props);
    this.state = {
      rows : DummyData
    }
  }
  
  render(){
    return(    
    <div style={{height: '300px' }}>
    <StatefulDataTable 
      columns={columns}
      rows={this.state.rows}
    />
  </div>
    )
  }
} 
 