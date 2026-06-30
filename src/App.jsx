import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { DarkModeProvider } from './context/DarkModeContext';
import Account from './pages/Account';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import DragDrop from './pages/DragDrop';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import ReusableButtons from './pages/ReusableButtons';
import Settings from './pages/Settings';
import Table from './pages/Table';
import Users from './pages/Users';
import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';
import Calc from './pages/Calc';
import Calcul from './pages/Calcul';
import Patients from './pages/Patients';
import NewConsultation from './pages/NewConsultations';
import Specialties from './pages/Specialties';
import DiseasesType from './pages/DiseasesType';
import ExamenType from './pages/ExamenType';
import Diseases from './pages/Diseases';
import Examen from './pages/Examen';
import TypeMedecine from './pages/MedecineType';
import Medicament from './pages/Medicament';
import ConsultationType from './pages/ConsultationType';
import ListUsers from './features/administration/users/ListUsers';
import Permissions from './pages/Permissions';
import Roles from './pages/Roles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="booking/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<ListUsers />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
              <Route path="table" element={<Table />} />
              <Route path="drag-drop" element={<DragDrop />} />
              <Route path="reusable-buttons" element={<ReusableButtons />} />
              <Route path="calc" element={<Calc />} />
              <Route path="calcul" element={<Calcul />} />

              {/* TEMPORARY REDIRECTS FOR NEW HEALTHCARE ROUTES */}
              <Route path="patients" element={<Patients />} />
              <Route path="patients/new" element={<Users />} />
              <Route path="consultations" element={<Bookings />} />
              <Route path="consultations/new" element={<NewConsultation />} />
              <Route path="prescriptions" element={<Bookings />} />
              <Route path="medications" element={<Bookings />} />
              <Route path="stock" element={<Bookings />} />
              <Route path="appointments" element={<Bookings />} />
              <Route path="hospitalizations" element={<Bookings />} />
              <Route path="pregnancies" element={<Bookings />} />
              <Route path="referrals" element={<Bookings />} />
              <Route path="specialties" element={<Specialties />} />
              <Route path="typediseases" element={<DiseasesType />} />
              <Route path="typesexamens" element={<ExamenType />} />
              <Route path="typemedicines" element={<TypeMedecine />} />
              <Route path="typesconsultations" element={<ConsultationType />} />
              <Route path="diseases" element={<Diseases />} />
              <Route path="examens" element={<Examen />} />
              <Route path="pricing" element={<Settings />} />
              <Route path="medicaments" element={<Medicament />} />
              <Route path="users" element={<ListUsers />} />
              <Route path="permissions" element={<Permissions />} />
              <Route path="roles" element={<Roles />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
