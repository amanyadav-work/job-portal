import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react"
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, LucideDoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ApplyJobDrawer from "@/components/ApplyJobDrawer";
import ApplicationCard from "@/components/ApplicationCard";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: id });

  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateHiringStatus, { job_id: id });


  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob())
  }


  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded])
  return (
    <div>
      <div className="flex flex-col-reverse gap-6  md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">{job?.title}</h1>
        <img src={job?.company?.logo_url} alt={job?.title} className="h-12" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? <> <LucideDoorOpen /> Open</> : <><DoorClosed /> Closed</>}
        </div>
      </div>
      {/* hiring status  */}
      {job?.recruiter_id === user?.id &&
        (<Select onValueChange={(value) => handleStatusChange(value)}>
          <SelectTrigger className={`w-full + ${job?.isOpen ? "bg-green-950":"bg-red-950"}`}>
            <SelectValue placeholder={"Hiring Status" + (job?.isOpen?"(Open)":"(Closed)")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>)

      }
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-5">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-5">What we are looking for</h2>
      <MDEditor.Markdown source={job?.requirements} className="bg-transparent sm:text-lg text-white" />
      {/* render application  */}
      {job?.recruiter_id !== user?.id && 
      <ApplyJobDrawer job={job} user={user} fetchJob={fnJob} 
      applied={job?.applications?.find(ap=>ap.candidate_id === user.id)}/> 
      }

      {job?.recruiter_id === user?.id &&(
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-5">Applications</h2>
          {job?.applications.map((application)=>{
            return <ApplicationCard key={application.id} application={application}/>
          })}
        </div>
      )}
    </div>

  )
}

export default JobPage
