import React, { useState } from 'react'
import CreateTodo from '../../components/Createtodo'
import GetAllTodos from '../../components/Getalldata'
import BarChart from '../../components/Barchart'
import DoughnutChart from '../../components/DoughnutChart'
import Navbar from '../../components/Navbar'
import './home.css'

const Home = () => {

    const [isDataUpdated, setIsDataUpdated] = useState(false);
    console.log ("state in home",isDataUpdated,)
    return (
        <>
            <Navbar />
            {/* <div > */}
                <div className='homepage'>
                    <section className='homecards'>
                        <CreateTodo onDataUpdated={() => setIsDataUpdated(true)}/>
                        <GetAllTodos />
                    </section>
                    <section className='homecards'>
                        <DoughnutChart isDataUpdated={isDataUpdated} />
                        <BarChart isDataUpdated={isDataUpdated} />
                    </section>
                </div>
            {/* </div> */}
        </>
    )
}

export default Home