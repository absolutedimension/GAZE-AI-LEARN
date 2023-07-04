import React, { useEffect } from 'react'
import { Loading } from 'components/shared'
import TutorChatList from '../TutorChatList';
// import PortfolioStats from './components/PortfolioStats'
// import FastTrade from './components/FastTrade'
// import Holding from './components/Holding'
// import RecentActivities from './components/RecentActivities'
// import MarketValue from './components/MarketValue'
// import reducer from './store'
// import { injectReducer } from 'store/index'
// import { getCryptoDashboardData } from './store/dataSlice'
// import { useDispatch, useSelector } from 'react-redux'




const LearningMainPage = () => {



return(


    <div className="flex flex-col gap-4 w-full h-full">
    <Loading loading={false}>
        <div className="grid grid-cols-4 xl:grid-cols-10 gap-4">
        <TutorChatList  className="2xl:col-span-8 xl:col-span-7"/>

            {/* <PortfolioStats
                className="2xl:col-span-8 xl:col-span-7"
                data={portfolioStatsData}
            />
            <FastTrade className="2xl:col-span-3 xl:col-span-4" /> */}
        </div>
        {/* <Holding data={holdingsData} /> */}
        {/* <div className="grid grid-cols-1 xl:grid-cols-11 gap-4">

           
            {/* <MarketValue
                className="2xl:col-span-8 xl:col-span-7"
                data={marketValueData}
            />
            <RecentActivities
                className="2xl:col-span-3 xl:col-span-4"
                data={recentAcivityData}
            /> *
        </div> */}
    </Loading>
</div>


)

}

export default LearningMainPage;