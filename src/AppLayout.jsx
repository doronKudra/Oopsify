// AppLayout.jsx
import { Outlet } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/footer/AppFooter.jsx'
import { SideBar } from './cmps/SideBar/SideBar.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { EditStation } from './cmps/EditStation.jsx'

export function AppLayout() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />
            <SideBar />

            <main className="main-content">
                <div className="route-scroll">
                    <Outlet />
                </div>
            </main>
            {/* <EditStation/> */}
            <AppFooter />
        </div>
    )
}
