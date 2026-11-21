export interface AvatarOption {
  id: string;
  emoji: string;
  nameKh: string;
  gradient: string;
  ring: string;
}

export const AVATAR_LIST: AvatarOption[] = [
  {
    id: "avatar-1",
    emoji: "🧑‍🎓",
    nameKh: "សិស្សឆ្លាត",
    gradient: "from-indigo-500 to-blue-600",
    ring: "ring-indigo-400",
  },
  {
    id: "avatar-2",
    emoji: "👩‍🎨",
    nameKh: "អ្នកបង្កើត",
    gradient: "from-fuchsia-500 to-pink-600",
    ring: "ring-fuchsia-400",
  },
  {
    id: "avatar-3",
    emoji: "🧑‍🔬",
    nameKh: "អ្នកស្រាវជ្រាវ",
    gradient: "from-emerald-500 to-teal-600",
    ring: "ring-emerald-400",
  },
  {
    id: "avatar-4",
    emoji: "👩‍🚀",
    nameKh: "អ្នករុករក",
    gradient: "from-sky-500 to-cyan-600",
    ring: "ring-sky-400",
  },
  {
    id: "avatar-5",
    emoji: "🧑‍💻",
    nameKh: "អ្នកបច្ចេកវិទ្យា",
    gradient: "from-violet-500 to-purple-600",
    ring: "ring-violet-400",
  },
  {
    id: "avatar-6",
    emoji: "👩‍⚕️",
    nameKh: "អ្នកចិត្តល្អ",
    gradient: "from-rose-500 to-red-600",
    ring: "ring-rose-400",
  },
  {
    id: "avatar-7",
    emoji: "🧑‍💼",
    nameKh: "អ្នកដឹកនាំ",
    gradient: "from-amber-500 to-orange-600",
    ring: "ring-amber-400",
  },
  {
    id: "avatar-8",
    emoji: "🦊",
    nameKh: "រួសរាយ",
    gradient: "from-orange-500 to-amber-600",
    ring: "ring-orange-400",
  },
];

export function getAvatarById(id?: string): AvatarOption {
  return AVATAR_LIST.find((a) => a.id === id) || AVATAR_LIST[0];
}
