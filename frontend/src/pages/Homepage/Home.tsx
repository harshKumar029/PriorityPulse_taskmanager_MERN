import React from 'react'
import CreateTodo from '../../components/Createtodo'
import GetAllTodos from '../../components/Getalldata'
import BarChart from '../../components/Barchart'
import DoughnutChart from '../../components/DoughnutChart'
import Navbar from '../../components/Navbar'

const Home = () => {

    console.log("this is local data",localStorage.getItem("Token"));
    return (
        <>
            <div>
            <Navbar/>
                <CreateTodo />
                <GetAllTodos />
                <BarChart />
                <DoughnutChart />
            </div>
        </>
    )
}

export default Home