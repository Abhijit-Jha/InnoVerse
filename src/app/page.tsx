import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authoptions } from './store/lib/authoption';

export default async function Home() {
    const session = await getServerSession(authoptions);

    if (!session) {
        redirect('/auth/signin');
    } else {
        redirect('/foryou');
    }

    return null; 
}
