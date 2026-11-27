import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects, getProjectBySlug, getNextProject } from "@/data/projects";
import ProjectDetailClient from "@/components/work/ProjectDetailClient";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — ${project.client}`,
    description: `${project.tagline} Edited by Kamsochukwu Nnodi for ${project.client}.`,
    openGraph: {
      title: `${project.title} | Kamsochukwu Nnodi`,
      description: project.synopsis,
      images: [
        {
          url: project.posterImage,
          width: 1920,
          height: 1080,
          alt: project.title,
        },
      ],
    },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

  return <ProjectDetailClient project={project} nextProject={nextProject} />;
}
