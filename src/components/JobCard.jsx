import { useUser } from '@clerk/clerk-react'
import React, { useState,useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { deleteJobs, saveJob } from '@/api/apiJobs'
import useFetch from '@/hooks/useFetch'
import { BarLoader } from 'react-spinners'

const JobCard = ({ job, isMyJob = false, isSavedInit = false, onSavedJob = () => { }, }) => {
const [saved, setSaved] = useState(isSavedInit)

const { user } = useUser()

    const { fn: fnSavedJobs, data: savedJob, loading: loadingSavedJobs } = useFetch(saveJob,{
        alreadySaved:saved,
    });

    const { fn: fnDeleteJobs, loading: loadingDeleteJobs } = useFetch(deleteJobs,{
        job_id:job.id,
    });

    const handleDeleteJob = async () => {
        await fnDeleteJobs();
        onSavedJob();
    }



    const handleSavedJob = async () => {
        await fnSavedJobs({
            user_id: user.id,
            job_id: job.id
        });
        onSavedJob();
    }

    useEffect(() => {
        if (savedJob !== undefined) setSaved(savedJob?.length > 0);
      }, [savedJob]);
    
      if (loadingDeleteJobs) {
        return <BarLoader className='mb-4' width={"100%"} color='red' />
    }
     

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className='flex justify-between font-bold'>
                    {job.title}
                    {isMyJob &&
                        <Trash2Icon
                            fill='red'
                            size={18}
                            className='text-red-300 cursor-pointer'
                            onClick={handleDeleteJob} />}

                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 flex-1'>
                <div className='flex justify-between'>
                    {job.company && <img src={job.company.logo_url} className='h-6' />}
                    <div className='flex gap-2 items-center'>
                        <MapPinIcon size={15} /> {job.location}
                    </div>
                </div>
                <hr />
                {job.description.substring(0, job.description.indexOf('.'))}
            </CardContent>
            <CardFooter className='flex gap-2'>
                <Link to={`/jobs/${job.id}`} className='flex-1'>
                    <Button variant="secondary" className='w-full'>
                        More Details
                    </Button>
                </Link>
                {!isMyJob && (
                    <Button variant="outline" className="w-15" onClick={handleSavedJob} disabled={loadingSavedJobs}>
                        {saved ?
                            (<Heart size={20} stroke='red' fill='red' />)
                            :
                           ( <Heart size={20} stroke='red' />)
                        }
                    </Button>
                )}
            </CardFooter>
        </Card>

    )
}

export default JobCard
