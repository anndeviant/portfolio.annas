"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

import { extractJsonLinks, normalizeHref, splitList, type TextLink } from "../../lib/data-utils";
import type { ProjectRow } from "../../types/database";

type ProjectsProps = {
  projects: ProjectRow[];
};

export default function Projects({ projects }: ProjectsProps) {
  const activeProjects = useMemo(
    () =>
      projects.filter((project) => {
        const active = project.active?.toLowerCase();
        return active === undefined || active === null || active === "true";
      }),
    [projects],
  );

  return (
    <section id="projects" className="relative px-4 py-18 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 md:gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-200/80 md:mb-5 md:text-xs md:tracking-[0.22em]">
            Selected Work
          </p>
          <h2 className="max-w-xl text-balance text-4xl font-black leading-[0.95] text-white md:text-8xl">
            Projects that turn data into usable products.
          </h2>
        </div>

        <div className="space-y-5 md:space-y-8 lg:space-y-12">
          {activeProjects.map((project, index) => (
            <ProjectItem key={project.id} index={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectItemProps = {
  index: number;
  project: ProjectRow;
};

function ProjectItem({ index, project }: ProjectItemProps) {
  const technologies = splitList(project.technologies);
  const links = getProjectLinks(project);
  const isOffset = index % 2 === 1;

  return (
    <motion.article
      className={`grid min-w-0 gap-5 border border-white/10 bg-white/[0.035] p-3 md:gap-6 md:p-5 lg:grid-cols-[0.92fr_1.08fr] ${
        isOffset ? "lg:-translate-x-12" : ""
      }`}
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-white/[0.04]">
        {project.video_url ? (
          <video
            src={project.video_url}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : project.image_url ? (
          <Image
            src={project.image_url}
            alt={`${project.title ?? "Project"} preview`}
            fill
            sizes="(min-width: 1024px) 34rem, 92vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center bg-[linear-gradient(135deg,rgba(103,232,249,0.16),rgba(244,114,182,0.10),rgba(255,255,255,0.03))]">
            <span className="px-6 text-center text-sm font-bold uppercase tracking-[0.24em] text-white/70">
              {project.title ?? "Project"}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-h-0 min-w-0 flex-col justify-between gap-6 py-1 md:min-h-72 md:gap-8 md:py-2 lg:py-3">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/50 md:mb-5 md:text-xs md:tracking-[0.18em]">
            <span>{project.dates ?? "Featured"}</span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="break-words text-3xl font-black leading-none text-white md:text-5xl">
            {project.title ?? "Untitled Project"}
          </h3>
          <p className="mt-4 text-pretty text-sm leading-7 text-white/70 md:mt-5 md:text-lg">
            {project.description ?? "A featured portfolio project."}
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="border border-white/10 px-2.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white/70 md:px-3 md:text-[0.68rem] md:tracking-[0.16em]"
                >
                  {technology}
                </span>
              ))}
            </div>
          ) : null}

          {links.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={`${project.id}-${link.label}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center border border-white/20 px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-200 hover:text-cyan-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function getProjectLinks(project: ProjectRow): TextLink[] {
  const links = [...extractJsonLinks(project.links)];
  const href = normalizeHref(project.href);

  if (href) {
    links.unshift({ label: "Live Site", url: href });
  }

  const uniqueUrls = new Set<string>();

  return links.filter((link) => {
    if (uniqueUrls.has(link.url)) {
      return false;
    }

    uniqueUrls.add(link.url);
    return true;
  });
}
