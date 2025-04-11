import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import { BarLoader } from 'react-spinners'

const ProtectedRoute = ({ page }) => {

    const { isSignedIn, user, isLoaded } = useUser();
    const { pathname } = useLocation();
    if (!isLoaded) {
        return <BarLoader className='mb-4' width={"100%"} color='red' />
    }
    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to='/?sign-in=true' />
    }
    if (user!==undefined&& !user.unsafeMetadata.role && pathname !=='/onboarding') {
        return <Navigate to='/onboarding' />
    }
    return (page)
};

export default ProtectedRoute