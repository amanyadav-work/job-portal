import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox, Heart } from 'lucide-react';

const Header = () => {

    const [showSignedIn, setshowSignedIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const {user} = useUser();


    useEffect(() => {
        if (search.get('sign-in')) {
            setshowSignedIn(true)
        }
    }, [search])

    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link to='/'>
                    <img src="logo.png" alt="" className='h-20' />
                </Link>

                <div className="flex gap-8" >
                    <SignedOut >
                        <Button variant='outline' onClick={() => setshowSignedIn(true)} onOv>Login</Button>
                    </SignedOut>
                    <SignedIn>

                       {user?.unsafeMetadata?.role==="recruiter" &&
                       <Link to='/post-job'>
                            <Button variant='destructive' className='rounded-full'><PenBox size={20} className='mr-2' /> Post A Job</Button>
                        </Link>}
                        <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10' } }}>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label='My Jobs'
                                    labelIcon={<BriefcaseBusiness size={15} />}
                                    href='/my-jobs'
                                />
                                <UserButton.Link
                                    label='Saved Jobs'
                                    labelIcon={<Heart size={15} />}
                                    href='/saved-jobs'
                                />
                            </UserButton.MenuItems>

                        </UserButton>
                    </SignedIn>
                </div>
            </nav>
            {
                showSignedIn && (<div className="fixed bg-black bg-opacity-50 z-10 flex items-center justify-center w-full h-full top-0 left-0" onClick={e => { e.target === e.currentTarget && setshowSignedIn(false); setSearch({}) }}>
                    <SignIn
                        signUpForceRedirectUrl="/onboarding"
                        fallbackRedirectUrl="/onboarding"
                    />
                </div>)
            }
        </>
    )
}

export default Header
