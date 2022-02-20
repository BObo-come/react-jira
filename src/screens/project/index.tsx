import React from 'react'
import { Link } from 'react-router-dom'
import {Routes , Route} from 'react-router'
import { KanbanScreen } from '../Kanban'
import { EpicScreen } from '../epic'

export const ProjectScreen = () => {
    return <div>
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
        <Routes>
            <Route path={'/kanban'} element={<KanbanScreen/>}></Route>
            <Route path={'/epic'} element={<EpicScreen/>}></Route>
            {/* <Navigate to={window.location.pathname + 'kanban'}/> */}
            <Route index element={<KanbanScreen/>}></Route>
        </Routes>
    </div>
}