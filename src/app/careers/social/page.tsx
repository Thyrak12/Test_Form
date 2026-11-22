import type { Metadata } from "next";
import { TrackExplorerView } from "@/components/careers/TrackExplorerView";

export const metadata: Metadata = {
  title: "មុខជំនាញឧត្តមសិក្សា ផ្នែកវិទ្យាសាស្ត្រសង្គម (Social Science Track) | MoEYS",
  description: "រុករក ៦៦ មុខជំនាញសិក្សានៅឧត្តមសិក្សា មុខវិជ្ជាស្នូលវិទ្យាល័យ និងឱកាសការងារសម្រាប់ផ្នែកវិទ្យាសាស្ត្រសង្គម",
};

export default function SocialCareersPage() {
  return <TrackExplorerView track="social_science" />;
}
