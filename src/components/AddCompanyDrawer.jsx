import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { addNewCompany } from "@/api/apiCompanies"
import useFetch from "@/hooks/useFetch"
import { BarLoader } from "react-spinners"
import { useEffect } from "react"


const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z.any()
        .refine((file) => file[0] &&
            (file[0].type === "image/png" ||
                file[0].type === "image/jpeg"), { message: "Only PNG or JPEG formats are allowed" }),
})

const AddCompanyDrawer = ({ fetchCompanies }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    
    const {
        loading: loadingAddCompany,
        error: errorAddCompany,
        data: dataAddCompany,
        fn: fnAddCompany,
    } = useFetch(addNewCompany);

    const onSubmit = (data) =>{
        fnAddCompany({
            ...data,
            logo:data.logo[0],
        });
    }

    useEffect(() => {
      if(dataAddCompany?.length>0) fetchCompanies();
    }, [loadingAddCompany])
    

    return (
        <div>
            <Drawer>
                <DrawerTrigger>
                    <Button type="button" variant="secondary" size="sm">
                        Add Company
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Add A New Company</DrawerTitle>
                    </DrawerHeader>

                    <form className="flex gap-2 p-4 pb-0">
                        <Input placeholder="Company name" {...register("name")} />
                        <Input type="file" accept="image/*" className="file:text-gray-500" {...register("logo")} />
                        <Button type="button" onClick={handleSubmit(onSubmit)} variant="destructive" className="w-40">
                            Add
                        </Button>
                    </form>
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
                        {errorAddCompany?.message && <p className="text-red-500">{errorAddCompany?.message}</p>}
                        {loadingAddCompany && <BarLoader width={"100%"} color='red' />}

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="secondary" type="button">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

export default AddCompanyDrawer
