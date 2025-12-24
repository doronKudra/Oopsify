import React from 'react'
import { Routes, Route } from 'react-router'
import { DndContext } from '@dnd-kit/core'
import { AppLayout } from './AppLayout.jsx'
import { AuthLayout } from './AuthLayout.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'

import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs.jsx'
import { StationIndex } from './pages/StationIndex.jsx'

import { StationDetails } from './cmps/StationDetails.jsx'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/footer/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

import { SideBar } from './cmps/SideBar/SideBar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { SearchGenres } from './pages/SearchGenres.jsx'
import { YtPlayer } from './cmps/YtPlayer.jsx'
import { EditStation } from './cmps/EditStation.jsx'
import { SearchInDetails } from './cmps/SearchInDetails.jsx'
import { OptionMenuProvider } from './cmps/OptionMenuProvider.jsx'

export function RootCmp() {
    return (
        <DndContext>
            <OptionMenuProvider>
                <Routes>
                    {/* AUTH ROUTES */}
                    <Route element={<AuthLayout />}>
                        <Route
                            path="/login"
                            element={<LoginSignup isSignup={false} />}
                        />
                        <Route
                            path="/signup"
                            element={<LoginSignup isSignup={true} />}
                        />
                    </Route>

                    {/* MAIN APP ROUTES */}
                    <Route element={<AppLayout />}>
                        <Route path="test" element={<YtPlayer />} />
                        <Route path="about" element={<AboutUs />}>
                            <Route path="team" element={<AboutTeam />} />
                            <Route path="vision" element={<AboutVision />} />
                        </Route>
                        <Route path="/" element={<StationIndex />} />
                        <Route path="genres" element={<SearchGenres />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route
                            path="station/:stationId"
                            element={<StationDetails />}
                        />
                        <Route path="user/:id" element={<UserDetails />} />
                    </Route>
                </Routes>
            </OptionMenuProvider>
        </DndContext>
    )
}
