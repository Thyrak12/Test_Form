import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MajorItem } from "@/types/career";
import scienceMajorsData from "@/data/science_majors.json";
import socialMajorsData from "@/data/social_science_majors.json";
import { MajorDetailPageContent } from "@/components/careers/MajorDetailPageContent";

const scienceMajors = scienceMajorsData as unknown as MajorItem[];
const socialMajors = socialMajorsData as unknown as MajorItem[];
const allMajors = [...scienceMajors, ...socialMajors];

// Generate static parameters for all 136 majors at build time
export async function generateStaticParams() {
  return allMajors.map((major) => ({
    id: major.id,
  }));
}

// Generate dynamic metadata for SEO, social sharing & bookmarks
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const major = allMajors.find((m) => m.id === id);

  if (!major) {
    return {
      title: "រកមិនឃើញមុខជំនាញ | Career Explorer",
      description: "មិនមានមុខជំនាញត្រូវនឹងកូដនេះទេ",
    };
  }

  const trackLabel = major.track === "science" ? "ផ្នែកវិទ្យាសាស្ត្រ" : "ផ្នែកវិទ្យាសាស្ត្រសង្គម";

  return {
    title: `${major.major_name_kh} (${major.major_name_en}) - ${trackLabel} | MoEYS`,
    description: major.description_kh,
    openGraph: {
      title: `${major.major_name_kh} (${major.major_name_en}) | មគ្គុទ្ទេសក៍អាជីព MoEYS`,
      description: major.description_kh,
      type: "article",
    },
  };
}

export default async function MajorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const majorIndex = allMajors.findIndex((m) => m.id === id);

  if (majorIndex === -1) {
    notFound();
  }

  const major = allMajors[majorIndex];
  const sameTrackMajors = major.track === "science" ? scienceMajors : socialMajors;
  const trackIndex = sameTrackMajors.findIndex((m) => m.id === id);

  const prevMajor = trackIndex > 0 ? sameTrackMajors[trackIndex - 1] : null;
  const nextMajor = trackIndex < sameTrackMajors.length - 1 ? sameTrackMajors[trackIndex + 1] : null;

  const relatedMajors = sameTrackMajors
    .filter((m) => m.category === major.category && m.id !== major.id)
    .slice(0, 3);

  return (
    <MajorDetailPageContent
      major={major}
      prevMajor={prevMajor}
      nextMajor={nextMajor}
      relatedMajors={relatedMajors}
    />
  );
}
