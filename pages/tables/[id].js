import Layout from '../../components/layout'
import { getCsvData } from '../../lib/tables'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
// import { DataGrid } from '@mui/x-data-grid';
import DataTable from 'react-data-table-component';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Table({ jsonFile }) {
  const columns = []

//   console.log(jsonFile[0])
  Object.keys(jsonFile[0]).forEach(function(key) {
      columns.push({
          name: `${key}`,
          selector: row => eval(`row.${key}`.replace(" ", "_")),
          sortable: true,
      }) 
  }) 
  const chosenCounter = jsonFile.map((row) => {
    const newObj = {}
    Object.keys(row).forEach(function(key) {
        if ( key.includes("counter1val") ) {
            newObj[key] = parseFloat(row[key]);
        }
  })
  return newObj
  })
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];
  console.log(chosenCounter)
  return (
    <div>

    <ResponsiveContainer>
    <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
  </ResponsiveContainer>
    {/* <DataTable
            columns={columns}
            data={jsonFile}
    /> */}
    </div>
  )
}


// export async function getStaticPaths() {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }

export async function getServerSideProps({ params }) {

  const jsonFile = await getCsvData(params.id)
//   console.log(jsonFile[0])


  return {
    props: {
        jsonFile
    }
  }
}

