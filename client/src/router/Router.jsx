import { useQuery } from '@tanstack/react-query'
import Loader from 'modules/Loader'
import NotFoundPage from 'pages/404'
import AdminPage from 'pages/AdminPage'
import AuthPage from 'pages/AuthPage'
import DashboardPage from 'pages/DashboardPage'
import HomePage from 'pages/HomePage'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { getProfile } from 'services/user'

function Router() {
    const { data, isLoading, error } = useQuery(["profile"], getProfile)
    if (isLoading) return <Loader />

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={data ? <Navigate to="/dashboard" /> : <AuthPage />} />
            <Route path="/admin" element={data ? data.data.role === "ADMIN" ? <AdminPage /> : <Navigate to="/dashboard" /> : <Navigate to='/auth' />} />
            <Route path="/dashboard" element={data ? <DashboardPage /> : <Navigate to='/auth' />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Router