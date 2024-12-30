import React, { useEffect } from 'react'
import Line from '../../components/Line'
import Invoice from '../../components/Invoice'
import ModernInvoice from '../../components/ModernInvoice'
import Head from './Head'
import SalesGraph from './Graphs/SalesGraph'
import RecentBill from './Lists/RecentBill'
import ServicesPie from './Graphs/ServicesPie'
import ServiceDoughnut from './Graphs/ServiceDoughnut'
import BranchBar from './Graphs/BranchBar'
import useDashboard from '../../services/useDashboard'

const Dashboard = () => {
  

  return (
    <div className="flex w-full h-full min-h-screen flex-col p-10">
      {/* <Line /> */}
      {/* <Invoice /> */}
      {/* <ModernInvoice /> */}
      <Head />
      <SalesGraph />
      <div className="w-full flex">
        <div className="w-3/4">
          <BranchBar />
        </div>
        <div className="w-1/4 pl-4 h-[500px]">
          <ServiceDoughnut />
        </div>
      </div>
      <div className="mt-10">
        <h2>Herlgoewhgrh</h2>
      </div>
    </div>
  )
}

export default Dashboard
