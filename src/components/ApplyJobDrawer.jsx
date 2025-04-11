import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import useFetch from "@/hooks/useFetch";
import { applyToJob } from "@/api/apiApplications"
import { BarLoader } from "react-spinners"

const schema = z.object({
    experience: z.number().min(0, { message: "Experience must be at least 0" }).int(),
    skills: z.string().min(1, { message: "Enter at least one skill" }),
    education: z.enum(["Intermediate", "Graduate", "Post Graduate"], { message: "Education is Required" }),
    resume: z.any()
        .refine((file) => file[0] &&
            (file[0].type === "application/pdf" ||
                file[0].type === "application/pdf"), { message: "Only PDF or word documents are allowed" }),
})

const ApplyJobDrawer = ({ job, user, fetchJob, applied = false }) => {

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
    })

    const {
        loading: loadingApply,
        error: errorApply,
        fn: fnApply,
    } = useFetch(applyToJob);

    const onSubmit = (data) => {
        fnApply({
            ...data,
            job_id: job.id,
            candidate_id: user.id,
            name: user.fullName,
            status: "applied",
            resume: data.resume[0]
        }).then(() => {
            fetchJob();
            reset();
        })
    }

    return (
        <>

            <Drawer open={applied ? false : undefined}>
                <DrawerTrigger className="w-full mt-4" asChild>
                    <Button size="lg" variant={job?.isOpen && !applied ? "blue" : "destructive"} disabled={!job?.isOpen || applied}>
                        {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
                        <DrawerDescription>Please fill the form below</DrawerDescription>
                    </DrawerHeader>



                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
                        <Input
                            type="number"
                            placeholder="Years of Experience"
                            className="flex-1"
                            {...register("experience", {
                                valueAsNumber: true,
                            })}
                        />
                        {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
                        <Input
                            type="text"
                            placeholder="Skills (Comma Sperated)"
                            className="flex-1"
                            {...register("skills")}
                        />
                        {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}
                        <Controller
                            name="education"
                            control={control}
                            render={({ field }) => (<RadioGroup onValueChange={field.onChange} {...field}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Intermediate" id="Intermediate" />
                                    <Label htmlFor="Intermediate">Intermediate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Graduate" id="Graduate" />
                                    <Label htmlFor="Graduate">Graduate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Post Graduate" id="Post-Graduate" />
                                    <Label htmlFor="Post-Graduate">Post Graduate</Label>
                                </div>
                            </RadioGroup>)}
                        />
                        {errors.education && <p className="text-red-500">{errors.education.message}</p>}
                        <Input
                            type='file'
                            accept=".pdf, .doc, .docx"
                            className="flex-1 file:text-gray-500"
                            {...register("resume")}
                        />
                        {errors.resume && <p className="text-red-500">{errors.resume.message}</p>}
                        {errorApply?.message && <p className="text-red-500">{errorApply?.message}</p>}

                        {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}

                        <Button type="submit" variant="blue" size="lg">
                            Apply
                        </Button>
                    </form>




                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>


        </>
    )
}

export default ApplyJobDrawer
