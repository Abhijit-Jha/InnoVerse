import React, { use } from 'react'

import ProjectContent from './ProjectContent'
import prisma from '../store/db';
import NoProjects from './NoProjects'

export interface ProjectType {
    p_id: string;
    user : {
        name:string | null;
        username : string;
    }
    title: string;
    description: string;
    image: string | null;
    source_code: string | null;
    live_Link: string | null;
    tech_stack: string[];
}

async function getProjectDetails() {
    const data = await prisma.project.findMany({
        select:{
            user :{
                select : {
                    name : true,
                    username : true
                }
            },
            title  : true,
            description : true,
            image : true,
            live_Link : true,
            p_id : true,
            source_code : true,
            tech_stack : true
        }
    })
    
    return data
}


const Projects = async() => {
    // fixed : for you page not updating
    const data = await getProjectDetails()
    
    if (!data.length) {
        return <div className='mt-24 '><NoProjects /></div>
    }
    return (
        <div>
            {data.map((project:ProjectType) => {
                return <div className='flex items-center justify-center w-full p-2' key={project.p_id}>
                    <ProjectContent uploadedBy={project.user.name || project.user.username} p_id={project.p_id} title={project.title} description={project.description} image={project.image} source_code={project.source_code} live_Link={project.live_Link} tech_stack={project.tech_stack} />
                </div>
            })}
        </div>
    )
}

export default Projects
