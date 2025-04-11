import CreatedApplications from '@/components/CreatedApplications';
import CreatedJobs from '@/components/CreatedJobs';
import { useUser } from '@clerk/clerk-react';
import React from 'react'

const MyJobs = () => {
  const { isLoaded,user } = useUser();
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"?"My Applications":"My Jobs"}
       </h1>
     
        {user?.unsafeMetadata?.role === "candidate"?<CreatedApplications/>:<CreatedJobs/>}

    </div>
  )
}

export default MyJobs
