import React from 'react'
import { Routes, Route } from 'react-router'

import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs.jsx'
import { StationIndex } from './pages/StationIndex.jsx'

import { StationDetails } from './cmps/StationDetails.jsx'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/footer/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { SideBar } from './cmps/SideBar/SideBar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { SearchGenres } from './pages/SearchGenres.jsx'
import { SearchInDetails } from './cmps/SearchInDetails.jsx'
import { EditStation } from './cmps/EditStation.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />
            <SideBar />
            <main>
                <Routes>
                    <Route path='test' element={<SearchInDetails />} />
                    <Route path="about" element={<AboutUs />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route>
                    <Route path="/" element={<StationIndex />} />
                    {/* <Route path="/" element={<StationDetails />} /> */}
                    <Route path='genres' element={<SearchGenres />} />
                    <Route path='search' element={<SearchPage />} />
                    <Route path="station/:stationId" element={<StationDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
                <EditStation/>
            </main>
            <AppFooter />
            
        </div>
    )
}


