import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Project, Technology } from "@prisma/client";

interface ProjectCardProps {
  project: Project & {
    technologies: Technology[];
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-background/30 border border-border/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(42,205,221,0.15)] hover:border-cyan-900/50">
      <div className="aspect-video relative overflow-hidden">
        <Image 
          src={project.imageUrl} 
          alt={project.title} 
          className="object-cover transition-transform duration-500 hover:scale-105"
          fill
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span 
                key={tech.id}
                className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}
        <div className="flex space-x-4">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          )}
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                <ExternalLink className="mr-2 h-4 w-4" />
                Démo en direct
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}