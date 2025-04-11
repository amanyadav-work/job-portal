import { getMyJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import JobCard from './JobCard';

const CreatedJobs = () => {

  const { user } = useUser();

  const { loading: loadingCreatedJobs, fn: fnCreatedJobs, data: dataCreatedJobs } = useFetch(getMyJobs, { recruiter_id: user.id })


  useEffect(() => {
    fnCreatedJobs()
  }, [])
  
  if (loadingCreatedJobs) {
    return <BarLoader className='mb-4' width={"100%"} color='red' />
}
 

  return (
    <div>
    
      {
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataCreatedJobs?.length ? (
            dataCreatedJobs.map((job) => {
              return <JobCard key={job.id} job={job} onSavedJob={fnCreatedJobs} isMyJob />
            })
          ) : (
            <div> No Jobs Found</div>
          )}
        </div>
      }
    </div>
  )
}

export default CreatedJobs
