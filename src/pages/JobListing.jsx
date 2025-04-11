import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apijobs"
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch"
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from 'react-spinners';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { State } from "country-state-city";


const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);


  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded])

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery])

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get('search-query');
    if (query) setSearchQuery(query);
  }


  const clearFilters = () => {
    setLocation("");
    setCompany_id("");
    setSearchQuery("");
  }


  // Function to paginate an array
  const paginateArray = (jobs, page = 1, itemsPerPage = 10) => {
    // Calculate the starting index of the current page
    const startIndex = (page - 1) * itemsPerPage;

    // Slice the array to get the items for the current page
    const paginatedArray = jobs?.slice(startIndex, startIndex + itemsPerPage);

    return paginatedArray;
  };

  // Example of paginating the array
  const currentPage = 1;
  const itemsPerPage = 100;
  const paginatedResult = paginateArray(jobs, currentPage, itemsPerPage);


  return (

    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Latest Jobs</h1>

      {/* Add filter */}
      <form onSubmit={handleSearch} className="h-14 flex w-full gap-2 items-center mb-3">
        <Input type='text' placeholder='Search Jobs by Title..' name='search-query' className='h-full flex-1 px-4 text-md' />
        <Button variant="blue" className="h-full sm:w-28" type="submit">Search</Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter By Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return <SelectItem key={name} value={name}>{name}</SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter By Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return <SelectItem key={name} value={id}>{name}</SelectItem>
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">Clear Filters</Button>

      </div>

      {loadingJobs &&
        <BarLoader className='mb-4' width={"100%"} color='red' />
      }

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            paginatedResult.map((job) => {
              return <JobCard key={job.id} job={job} isSavedInit={job?.saved?.length > 0} />
            })
          ) : (
            <div> No Jobs Found</div>
          )}
        </div>

      )
      }

    </div >
  )
}

export default JobListing
