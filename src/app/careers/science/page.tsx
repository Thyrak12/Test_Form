import type { Metadata } from "next";
import { TrackExplorerView } from "@/components/careers/TrackExplorerView";

export const metadata: Metadata = {
  title: "មុខជំនាញឧត្តមសិក្សា ផ្នែកវិទ្យាសាស្ត្រ (Science Track) | MoEYS",
  description: "រុករក ៧០ មុខជំនាញសិក្សានៅឧត្តមសិក្សា មុខវិជ្ជាស្នូលវិទ្យាល័យ និងឱកាសការងារសម្រាប់ផ្នែកវិទ្យាសាស្ត្រ",
};

export default function ScienceCareersPage() {
  return <TrackExplorerView track="science" />;
}
