import Link from "next/link";
import {
    withAuth,
    getSignInUrl,
    signOut
  } from '@workos-inc/authkit-nextjs';

export default async function Header() {
    const { user } = await withAuth();
    const signInUrl = await getSignInUrl();
    return (
        <header>
            <div className="container flex items-center justify-between py-4 px-6 ">
                <Link href={'/'} className="font-bold text-xl">Job Board</Link>
                <nav className="flex gap-2 ">
                    {!user && (
                        <Link className="flex gap-2 py-2 px-4 rounded-md bg-gray-200" href={signInUrl}>Login</Link>
                    )}
                    {user && (
                        <form
                        action={async () => {
                          'use server';
                          await signOut();
                        }}
                        >
                            <button type="submit" className="flex gap-2 py-2 px-4 rounded-md bg-gray-200">Logout</button>
                        </form>
                    )}
                    <Link className="flex gap-2 py-2 px-4 rounded-md bg-blue-600 text-white" href={'/new-listing'}>Post a Job</Link>
                </nav>
            </div>
        </header>
    );
}