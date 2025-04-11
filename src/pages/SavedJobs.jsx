import { getSavedJobs } from '@/api/apiJobs';
import JobCard from '@/components/JobCard';
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react'



const SavedJobs = () => {
  const { isLoaded } = useUser();
  const { data: savedJobs, loading: loadingSavedJobs, error: errorSavedJob, fn: fnSavedJob } = useFetch(getSavedJobs);

  useEffect(() => {

    fnSavedJob()


  }, [isLoaded])
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Saved Jobs</h1>
      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs.map((saved) => {
              return <JobCard key={saved.id} job={saved?.job} isSavedInit={true} onSavedJob={fnSavedJob} />
            })
          ) : (
            <div> No Saved Jobs Found</div>
          )}
        </div>

      )
      }
    </div>
  )
}

export default SavedJobs
