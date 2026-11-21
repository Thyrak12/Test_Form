import {
  TrackGroup,
  AssessmentCluster,
  TrackDescriptionsData,
  TrackQuestionsData,
  StudentTrackAnswers,
  ClusterScoreDetail,
  GroupScoreDetail,
  TrackClassificationResult,
  SubjectAdvice,
  VocationalMajor,
} from "@/types/trackClassification";
import descriptionsJson from "@/data/assessments/track_classification/descriptions.json";
import questionsJson from "@/data/assessments/track_classification/questions.json";

export const descriptionsData = descriptionsJson as unknown as TrackDescriptionsData;
export const questionsData = questionsJson as unknown as TrackQuestionsData;

export const SCIENCE_CLUSTER_IDS = [1, 2, 8, 11, 13, 15, 16];
export const SOCIAL_SCIENCE_CLUSTER_IDS = [3, 4, 5, 6, 7, 9, 10, 12, 14];

/**
 * Cluster-specific high school subject prioritization mapping
 */
const CLUSTER_SUBJECT_MAP: Record<number, SubjectAdvice[]> = {
  1: [
    { subjectKm: "ជីវវិទ្យា (Biology)", subjectEn: "Biology", reasonKm: "ពង្រឹងការយល់ដឹងអំពីបរិស្ថាន កសិកម្ម និងប្រព័ន្ធជីវសាស្ត្រ" },
    { subjectKm: "គីមីវិទ្យា (Chemistry)", subjectEn: "Chemistry", reasonKm: "សំខាន់សម្រាប់វិភាគសមាសភាគដី ជី និងធនធានធម្មជាតិ" },
  ],
  2: [
    { subjectKm: "គណិតវិទ្យា (Mathematics)", subjectEn: "Mathematics", reasonKm: "គ្រឹះនៃការគណនាទំហំ បន្ទុក និងមាត្រដ្ឋានប្លង់" },
    { subjectKm: "រូបវិទ្យា (Physics)", subjectEn: "Physics", reasonKm: "ចាំបាច់សម្រាប់កម្លាំង យន្តសាស្ត្រសំណង់ និងរចនាសម្ព័ន្ធអគារ" },
  ],
  3: [
    { subjectKm: "អក្សរសាស្ត្រខ្មែរ (Khmer Literature)", subjectEn: "Khmer Literature", reasonKm: "អភិវឌ្ឍការតែងនិពន្ធ សិល្បៈភាសា និងទំនាក់ទំនងសាធារណៈ" },
    { subjectKm: "ភាសាបរទេស (Foreign Languages)", subjectEn: "Foreign Languages", reasonKm: "ពង្រីកលទ្ធភាពផ្សព្វផ្សាយ និងការងារសិល្បៈប្រព័ន្ធផ្សព្វផ្សាយ" },
  ],
  4: [
    { subjectKm: "គណិតវិទ្យា (Mathematics)", subjectEn: "Mathematics", reasonKm: "មូលដ្ឋាននៃការគិតវិភាគ តួលេខ និងស្ថិតិពាណិជ្ជកម្ម" },
    { subjectKm: "សេដ្ឋកិច្ច និងពលរដ្ឋ (Economics & Civics)", subjectEn: "Economics & Civics", reasonKm: "យល់ដឹងពីទីផ្សារ ច្បាប់អាជីវកម្ម និងការគ្រប់គ្រង" },
  ],
  5: [
    { subjectKm: "អក្សរសាស្ត្រខ្មែរ (Khmer Literature)", subjectEn: "Khmer Literature", reasonKm: "ពង្រឹងជំនាញគរុកោសល្យ និងការផ្ទេរចំណេះដឹង" },
    { subjectKm: "ភាសាបរទេស (English/French)", subjectEn: "Foreign Languages", reasonKm: "សំខាន់សម្រាប់ស្រាវជ្រាវវិធីសាស្ត្របង្រៀនទំនើប" },
  ],
  6: [
    { subjectKm: "គណិតវិទ្យា (Mathematics)", subjectEn: "Mathematics", reasonKm: "ចាំបាច់បំផុតសម្រាប់គណនេយ្យ ហិរញ្ញវត្ថុ និងស្ថិតិប្រូបាប" },
    { subjectKm: "សេដ្ឋកិច្ច (Economics)", subjectEn: "Economics", reasonKm: "ស្វែងយល់ពីប្រព័ន្ធធនាគារ ទីផ្សារភាគហ៊ុន និងធានារ៉ាប់រង" },
  ],
  7: [
    { subjectKm: "សីលធម៌-ពលរដ្ឋវិជ្ជា (Morality-Civics)", subjectEn: "Morality-Civics", reasonKm: "គ្រឹះនៃអភិបាលកិច្ចល្អ ច្បាប់ និងរដ្ឋបាលសាធារណៈ" },
    { subjectKm: "ប្រវត្តិវិទ្យា (History)", subjectEn: "History", reasonKm: "យល់ដឹងពីដំណើរវិវត្តន៍នៃស្ថាប័នរដ្ឋ និងទំនាក់ទំនងអន្តរជាតិ" },
  ],
  8: [
    { subjectKm: "ជីវវិទ្យា (Biology)", subjectEn: "Biology", reasonKm: "គ្រឹះចម្បងនៃកាយវិភាគសាស្ត្រ សុខាភិបាល និងវេជ្ជសាស្ត្រ" },
    { subjectKm: "គីមីវិទ្យា (Chemistry)", subjectEn: "Chemistry", reasonKm: "សំខាន់សម្រាប់ឱសថសាស្ត្រ និងការពិសោធវេជ្ជសាស្ត្រ" },
  ],
  9: [
    { subjectKm: "ភាសាបរទេស (Foreign Languages)", subjectEn: "Foreign Languages", reasonKm: "គន្លឹះសំខាន់ក្នុងការទំនាក់ទំនងជាមួយភ្ញៀវទេសចរអន្តរជាតិ" },
    { subjectKm: "ភូមិវិទ្យា (Geography)", subjectEn: "Geography", reasonKm: "យល់ដឹងពីតំបន់ទេសចរណ៍ វប្បធម៌ និងអាកាសធាតុ" },
  ],
  10: [
    { subjectKm: "សីលធម៌-ពលរដ្ឋវិជ្ជា (Civics)", subjectEn: "Civics", reasonKm: "ពង្រឹងស្មារតីជួយសង្គម ការងារមនុស្សធម៌ និងសេវាសាធារណៈ" },
    { subjectKm: "អក្សរសាស្ត្រខ្មែរ (Khmer Literature)", subjectEn: "Khmer Literature", reasonKm: "ជំនាញប្រាស្រ័យទាក់ទង និងការផ្តល់ប្រឹក្សាផ្លូវចិត្ត" },
  ],
  11: [
    { subjectKm: "គណិតវិទ្យា (Mathematics)", subjectEn: "Mathematics", reasonKm: "មូលដ្ឋានគ្រឹះនៃ Algorithm, Logic និងសរសេរកូដកុំព្យូទ័រ" },
    { subjectKm: "រូបវិទ្យា និង ICT (Physics & ICT)", subjectEn: "Physics & ICT", reasonKm: "យល់ដឹងពីអេឡិចត្រូនិច Hardware និងប្រព័ន្ធបច្ចេកវិទ្យា" },
  ],
  12: [
    { subjectKm: "សីលធម៌-ពលរដ្ឋវិជ្ជា (Morality-Civics)", subjectEn: "Morality-Civics", reasonKm: "គ្រឹះនៃរដ្ឋធម្មនុញ្ញ ច្បាប់សង្គម និងយុត្តិធម៌" },
    { subjectKm: "ប្រវត្តិវិទ្យា (History)", subjectEn: "History", reasonKm: "ប្រវត្តិសាស្ត្រច្បាប់ និងទំនាក់ទំនងសង្គម" },
  ],
  13: [
    { subjectKm: "រូបវិទ្យា (Physics)", subjectEn: "Physics", reasonKm: "ចាំបាច់សម្រាប់កម្លាំង ថាមពល និងគ្រឿងចក្រឧស្សាហកម្ម" },
    { subjectKm: "គណិតវិទ្យា (Mathematics)", subjectEn: "Mathematics", reasonKm: "សំខាន់សម្រាប់ត្រួតពិនិត្យគុណភាព និងការផលិតតាមស្តង់ដារ" },
  ],
  14: [
    { subjectKm: "អក្សរសាស្ត្រខ្មែរ (Khmer Literature)", subjectEn: "Khmer Literature", reasonKm: "សរសេរមាតិកាផ្សព្វផ្សាយ ពាក្យស្លោក និងការបញ្ចុះបញ្ចូល" },
    { subjectKm: "ភាសាបរទេស (English)", subjectEn: "English", reasonKm: "សំខាន់សម្រាប់ទីផ្សារឌីជីថល និងពាណិជ្ជកម្មអន្តរជាតិ" },
  ],
  15: [
    { subjectKm: "គណិតវិទ្យា (Mathematics)", subjectEn: "Mathematics", reasonKm: "បេះដូងនៃ STEM សម្រាប់ការវិភាគទិន្នន័យ និងវិស្វកម្ម" },
    { subjectKm: "រូបវិទ្យា និងគីមីវិទ្យា (Physics & Chemistry)", subjectEn: "Physics & Chemistry", reasonKm: "ការស្រាវជ្រាវ និងការច្នៃប្រឌិតបច្ចេកវិទ្យាថ្មីៗ" },
  ],
  16: [
    { subjectKm: "ភូមិវិទ្យា (Geography)", subjectEn: "Geography", reasonKm: "ផែនទី ផ្លូវធ្វើដំណើរ និងបណ្តាញដឹកជញ្ជូនក្នុងតំបន់" },
    { subjectKm: "គណិតវិទ្យា (Mathematics)", subjectEn: "Mathematics", reasonKm: "ការគណនាថ្លៃដើម ពេលវេលា និងការគ្រប់គ្រងស្តុក" },
  ],
};

/**
 * Pure scoring calculation for MoEYS Track Selection Assessment (Appendix 12)
 * @param studentAnswers Record of clusterId (1..16) -> { partA: {itemId: rating}, partB: {itemId: rating} }
 */
export function calculateTrackScores(
  studentAnswers: StudentTrackAnswers | Record<string, any>
): TrackClassificationResult {
  const clusterDetails: ClusterScoreDetail[] = [];
  let totalAnsweredCount = 0;

  for (const cluster of questionsData.clusters) {
    const cId = cluster.cluster_id;
    const userClusterAns = (studentAnswers as any)?.[cId] || (studentAnswers as any)?.[String(cId)] || { partA: {}, partB: {} };
    const partAAns = userClusterAns.partA || {};
    const partBAns = userClusterAns.partB || {};

    // Part A: 6 items, rated 1 to 4. Default if not answered = 1 (or 0)
    let partAScore = 0;
    for (const item of cluster.part_a_items) {
      const val = Number(partAAns[item.id] ?? partAAns[String(item.id)]);
      if (!isNaN(val) && val >= 1 && val <= 4) {
        partAScore += val;
        totalAnsweredCount++;
      } else {
        // If unselected, count minimal base score 1 per MoEYS scale or 0 if unanswered
        partAScore += 1;
      }
    }

    // Part B: 10 items, rated 0 to 3. Default if not answered = 0
    let partBScore = 0;
    for (const item of cluster.part_b_items) {
      const val = Number(partBAns[item.id] ?? partBAns[String(item.id)]);
      if (!isNaN(val) && val >= 0 && val <= 3) {
        partBScore += val;
        totalAnsweredCount++;
      }
    }

    const totalScore = partAScore + partBScore; // Max 24 + 30 = 54
    const totalMax = 54;
    const percentage = Math.round((totalScore / totalMax) * 100);

    clusterDetails.push({
      clusterId: cId,
      titleKm: cluster.title_km,
      titleEn: cluster.title_en,
      trackGroup: cluster.track_group,
      partAScore,
      partAMax: 24,
      partBScore,
      partBMax: 30,
      totalScore,
      totalMax,
      percentage,
    });
  }

  // Calculate Group Aggregations
  // Science Group: 7 Clusters (1, 2, 8, 11, 13, 15, 16)
  const scienceClusters = clusterDetails.filter((c) => SCIENCE_CLUSTER_IDS.includes(c.clusterId));
  const scienceTotal = scienceClusters.reduce((sum, c) => sum + c.totalScore, 0);
  const scienceMax = 7 * 54; // 378
  const scienceAvg = Number((scienceTotal / 7).toFixed(1));
  const sciencePercent = Math.round((scienceTotal / scienceMax) * 100);

  const scienceGroup: GroupScoreDetail = {
    group: "science",
    labelKm: "គន្លងវិទ្យាសាស្ត្រ (Science Track)",
    labelEn: "Science Track",
    clusterCount: 7,
    totalScore: scienceTotal,
    maxScore: scienceMax,
    averageScore: scienceAvg,
    percentage: sciencePercent,
  };

  // Social Science Group: 9 Clusters (3, 4, 5, 6, 7, 9, 10, 12, 14)
  const socialClusters = clusterDetails.filter((c) => SOCIAL_SCIENCE_CLUSTER_IDS.includes(c.clusterId));
  const socialTotal = socialClusters.reduce((sum, c) => sum + c.totalScore, 0);
  const socialMax = 9 * 54; // 486
  const socialAvg = Number((socialTotal / 9).toFixed(1));
  const socialPercent = Math.round((socialTotal / socialMax) * 100);

  const socialScienceGroup: GroupScoreDetail = {
    group: "social_science",
    labelKm: "គន្លងវិទ្យាសាស្ត្រសង្គម (Social Science Track)",
    labelEn: "Social Science Track",
    clusterCount: 9,
    totalScore: socialTotal,
    maxScore: socialMax,
    averageScore: socialAvg,
    percentage: socialPercent,
  };

  // Rank Top 3 Individual Clusters (Method 2)
  const sortedClusters = [...clusterDetails].sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    // Tie-break by Part A (Interest)
    if (b.partAScore !== a.partAScore) {
      return b.partAScore - a.partAScore;
    }
    return a.clusterId - b.clusterId;
  });

  const topClusters = sortedClusters.slice(0, 3);

  // Recommendation Determination
  // We compare cluster averages to be transparent between 7 vs 9 clusters
  let recommendedTrack: "science" | "social_science" | "balanced" = "balanced";
  let recommendedTrackKm = "គន្លងវិទ្យាសាស្ត្រ និងសង្គម (មានតុល្យភាព)";
  let recommendedTrackEn = "Balanced Track";

  const diff = scienceAvg - socialAvg;
  if (diff > 1.5) {
    recommendedTrack = "science";
    recommendedTrackKm = "គន្លងវិទ្យាសាស្ត្រ (Science Track)";
    recommendedTrackEn = "Science Track";
  } else if (diff < -1.5) {
    recommendedTrack = "social_science";
    recommendedTrackKm = "គន្លងវិទ្យាសាស្ត្រសង្គម (Social Science Track)";
    recommendedTrackEn = "Social Science Track";
  } else {
    // Check top 3 clusters to help decide
    const topScienceCount = topClusters.filter((c) => c.trackGroup === "science").length;
    if (topScienceCount >= 2) {
      recommendedTrack = "science";
      recommendedTrackKm = "គន្លងវិទ្យាសាស្ត្រ (Science Track)";
      recommendedTrackEn = "Science Track";
    } else if (topScienceCount <= 1 && topClusters.length > 0) {
      recommendedTrack = "social_science";
      recommendedTrackKm = "គន្លងវិទ្យាសាស្ត្រសង្គម (Social Science Track)";
      recommendedTrackEn = "Social Science Track";
    }
  }

const VOCATIONAL_DESCRIPTIONS: Record<string, string> = {
  "ជំនាញគណនេយ្យ": "រៀបចំរបាយការណ៍ហិរញ្ញវត្ថុ គណនាពន្ធ និងគ្រប់គ្រងបញ្ជីប្រាក់ចំណូលចំណាយក្នុងអាជីវកម្ម",
  "ជំនាញទេសចរណ៍": "គ្រប់គ្រងសេវាកម្មទេសចរណ៍ មគ្គុទ្ទេសក៍ ការកក់សំបុត្រ និងទំនាក់ទំនងភ្ញៀវអន្តរជាតិ",
  "ជំនាញបដិសណ្ឋារកិច្ច": "គ្រប់គ្រងប្រតិបត្តិការសណ្ឋាគារ ភោជនីយដ្ឋាន និងសេវាកម្មទទួលបដិសណ្ឋារកិច្ចកម្រិតខ្ពស់",
  "ជំនាញគ្រប់គ្រងឧស្សាហកម្ម": "គ្រប់គ្រងខ្សែច្រវាក់ផលិតកម្ម ត្រួតពិនិត្យគុណភាពផលិតផល និងសុវត្ថិភាពរោងចក្រ",
  "ជំនាញគ្រប់គ្រងឧស្សាហកម្ម និងមេកានិច": "គ្រប់គ្រងខ្សែច្រវាក់ផលិតកម្ម ត្រួតពិនិត្យគុណភាព និងការថែទាំគ្រឿងចក្រ",
  "ជំនាញអគ្គិសនី": "ដំឡើង ជួសជុល និងថែទាំប្រព័ន្ធបណ្តាញអគ្គិសនីលំនៅឋាន និងរោងចក្រ",
  "ជំនាញអេឡិចត្រូនិច": "ជួសជុលឧបករណ៍អេឡិចត្រូនិក សៀគ្វីមីក្រូ និងប្រព័ន្ធស្វ័យប្រវត្តិកម្ម",
  "ជំនាញមេកានិច": "ថែទាំ ជួសជុលម៉ាស៊ីន យានយន្ត និងគ្រឿងចក្រធុនធ្ងន់ក្នុងឧស្សាហកម្ម",
  "ជំនាញមេកាត្រូនិច": "ការរួមបញ្ចូលគ្នារវាងមេកានិក អេឡិចត្រូនិច និងការបញ្ជាប្រព័ន្ធស្វ័យប្រវត្តិតាមកុំព្យូទ័រ",
  "ជំនាញក្សេត្រសាស្ត្រ": "បច្ចេកទេសដាំដុះដំណាំ កែលម្អជីជាតិដី និងប្រព័ន្ធស្រោចស្រពទំនើប",
  "ជំនាញបសុវប្បកម្ម": "ការចិញ្ចឹម ថែទាំសុខភាពសត្វ និងការបង្កាត់ពូជសត្វកសិកម្មប្រកបដោយគុណភាព",
  "ជំនាញកុំព្យូទ័រ (ផ្នែកទន់)": "អភិវឌ្ឍន៍កម្មវិធីកុំព្យូទ័រ គេហទំព័រ និងការគ្រប់គ្រងមូលដ្ឋានទិន្នន័យ (Database)",
  "ជំនាញឌីជីថលមេឌៀឌីហ្សាញ": "រចនាក្រាហ្វិក វីដេអូពាណិជ្ជកម្ម និងមាតិកាឌីជីថលសម្រាប់ប្រព័ន្ធផ្សព្វផ្សាយ",
  "ជំនាញកែច្នៃអាហារ": "បច្ចេកវិទ្យាកែច្នៃ ការវេចខ្ចប់ និងការត្រួតពិនិត្យស្តង់ដារអនាម័យចំណីអាហារ",
};

const CLUSTER_VOCATIONAL_MAP: Record<number, VocationalMajor> = {
  1: { km: "ជំនាញក្សេត្រសាស្ត្រ", en: "Agronomy", descriptionKm: VOCATIONAL_DESCRIPTIONS["ជំនាញក្សេត្រសាស្ត្រ"] },
  2: { km: "ជំនាញស្ថាបត្យកម្មសំណង់", en: "Building Construction", descriptionKm: "គូរប្លង់ សាងសង់ និងត្រួតពិនិត្យការដ្ឋានសំណង់អគារ" },
  3: { km: "ជំនាញឌីជីថលមេឌៀឌីហ្សាញ", en: "Digital Media Design", descriptionKm: VOCATIONAL_DESCRIPTIONS["ជំនាញឌីជីថលមេឌៀឌីហ្សាញ"] },
  4: { km: "ជំនាញរដ្ឋបាលពាណិជ្ជកម្ម", en: "Business Administration", descriptionKm: "គ្រប់គ្រងឯកសារ លិខិតស្នាម និងប្រតិបត្តិការការិយាល័យពាណិជ្ជកម្ម" },
  5: { km: "ជំនាញគរុកោសល្យបឋម", en: "Early Education & Training", descriptionKm: "វិធីសាស្ត្របង្រៀន និងការអភិវឌ្ឍកុមារតូច" },
  6: { km: "ជំនាញគណនេយ្យ", en: "Accounting", descriptionKm: VOCATIONAL_DESCRIPTIONS["ជំនាញគណនេយ្យ"] },
  7: { km: "ជំនាញរដ្ឋបាលសាធារណៈ", en: "Public Administration", descriptionKm: "នីតិវិធីរដ្ឋបាល និងការផ្តល់សេវាសាធារណៈជូនពលរដ្ឋ" },
  8: { km: "ជំនាញថែទាំសុខភាពបឋម", en: "Healthcare Assistance", descriptionKm: "ជំនួយការថែទាំអ្នកជំងឺ និងការងារគិលានុបដ្ឋាកបឋម" },
  9: { km: "ជំនាញបដិសណ្ឋារកិច្ច", en: "Hospitality Services", descriptionKm: VOCATIONAL_DESCRIPTIONS["ជំនាញបដិសណ្ឋារកិច្ច"] },
  10: { km: "ជំនាញសេវាសង្គមកិច្ច", en: "Social Work Services", descriptionKm: "ការគាំទ្រសហគមន៍ កុមារ និងជនងាយរងគ្រោះ" },
  11: { km: "ជំនាញកុំព្យូទ័រ (ផ្នែកទន់)", en: "Computer (Software)", descriptionKm: VOCATIONAL_DESCRIPTIONS["ជំនាញកុំព្យូទ័រ (ផ្នែកទន់)"] },
  12: { km: "ជំនាញច្បាប់ និងសន្តិសុខ", en: "Law & Security Services", descriptionKm: "ការការពារសន្តិសុខ សុវត្ថិភាព និងច្បាប់មូលដ្ឋាន" },
  13: { km: "ជំនាញគ្រប់គ្រងឧស្សាហកម្ម និងមេកានិច", en: "Industrial Management & Mechanics", descriptionKm: VOCATIONAL_DESCRIPTIONS["ជំនាញគ្រប់គ្រងឧស្សាហកម្ម និងមេកានិច"] },
  14: { km: "ជំនាញទីផ្សារ និងលក់", en: "Marketing & Sales", descriptionKm: "ការស្រាវជ្រាវទីផ្សារ ការលក់ និងសេវាថែទាំអតិថិជន" },
  15: { km: "ជំនាញមេកាត្រូនិច", en: "Mechatronics", descriptionKm: VOCATIONAL_DESCRIPTIONS["ជំនាញមេកាត្រូនិច"] },
  16: { km: "ជំនាញភស្តុភារកម្ម និងដឹកជញ្ជូន", en: "Logistics & Supply Chain", descriptionKm: "ការគ្រប់គ្រងឃ្លាំងស្តុក ការវេចខ្ចប់ និងការដឹកជញ្ជូនទំនិញ" },
};

  // Vocational Recommendations
  // Include vocational majors for the recommended track plus top clusters
  const vocationalRecommendations: VocationalMajor[] = [];
  const addedMajors = new Set<string>();

  const enrichMajor = (m: { km: string; en: string }): VocationalMajor => ({
    km: m.km,
    en: m.en,
    descriptionKm: VOCATIONAL_DESCRIPTIONS[m.km] || "ជំនាញបច្ចេកទេស និងវិជ្ជាជីវៈកម្រិតមធ្យមសិក្សាទុតិយភូមិ",
  });

  if (recommendedTrack === "science") {
    for (const m of descriptionsData.track_groups.science.vocational_majors) {
      if (!addedMajors.has(m.km)) {
        vocationalRecommendations.push(enrichMajor(m));
        addedMajors.add(m.km);
      }
      if (vocationalRecommendations.length >= 3) break;
    }
  } else if (recommendedTrack === "social_science") {
    for (const m of descriptionsData.track_groups.social_science.vocational_majors) {
      if (!addedMajors.has(m.km)) {
        vocationalRecommendations.push(enrichMajor(m));
        addedMajors.add(m.km);
      }
    }
  } else {
    // Both
    for (const m of [
      ...descriptionsData.track_groups.science.vocational_majors.slice(0, 2),
      ...descriptionsData.track_groups.social_science.vocational_majors,
    ]) {
      if (!addedMajors.has(m.km)) {
        vocationalRecommendations.push(enrichMajor(m));
        addedMajors.add(m.km);
      }
    }
  }

  // Ensure at least 3 vocational majors by pulling relevant matches from student's Top Clusters!
  for (const c of topClusters) {
    const match = CLUSTER_VOCATIONAL_MAP[c.clusterId];
    if (match && !addedMajors.has(match.km)) {
      vocationalRecommendations.push(match);
      addedMajors.add(match.km);
    }
    if (vocationalRecommendations.length >= 3) break;
  }

  // Subject Prioritization Advice
  const subjectAdvice: SubjectAdvice[] = [];
  const seenSubjects = new Set<string>();

  for (const cluster of topClusters) {
    const list = CLUSTER_SUBJECT_MAP[cluster.clusterId] || [];
    for (const s of list) {
      if (!seenSubjects.has(s.subjectKm)) {
        subjectAdvice.push(s);
        seenSubjects.add(s.subjectKm);
      }
    }
    if (subjectAdvice.length >= 4) break;
  }

  return {
    scienceGroup,
    socialScienceGroup,
    recommendedTrack,
    recommendedTrackKm,
    recommendedTrackEn,
    topClusters,
    allClusters: sortedClusters,
    vocationalRecommendations,
    subjectAdvice: subjectAdvice.slice(0, 3),
    totalAnsweredCount,
  };
}
