import React from 'react';
import ProjectContent from './ProjectContent';
import prisma from '../store/db';
import { getServerSession } from 'next-auth';
import { authoptions } from '../store/lib/authoption';
import NoProjects from './NoProjects';
import { redirect } from 'next/navigation';

export interface ProjectType {
    p_id: string;
    user_id: string;
    title: string;
    description: string;
    image: string | null;
    source_code: string | null;
    live_Link: string | null;
    tech_stack: string[];
}

async function getProjects(id: string | undefined) {
    const response = await prisma.project.findMany({
        where: {
            user_id: String(id)
        }
    })
    return response
}
const ProjectsById = async () => {
    const session = await getServerSession(authoptions)
    if (!session) {
        redirect("/")

    }
    const id = session?.user?.id || "0"
    const projects = await getProjects(id)
    if (!projects) {
        return null;
    }

    if (projects.length === 0) {
        return (
            <NoProjects />
        );
    }

    return (
        <div>
            {projects?.map((project: ProjectType) => (
                <div className='items-center justify-center flex my-4 w-full' key={project.p_id}>
                    <ProjectContent
                        p_id={project.p_id}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        source_code={project.source_code}
                        live_Link={project.live_Link}
                        tech_stack={project.tech_stack}
                        isProfile={true}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProjectsById;
