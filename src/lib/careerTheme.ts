export interface CategoryTheme {
  name: string;
  color: string;       // Primary hex color
  bgColor: string;     // Pastel background hex
  borderColor: string; // Border color
  textColor: string;   // Text color
  badgeClass: string;
  iconBgClass: string;
  iconTextClass: string;
  borderClass: string;
  hoverBorderClass: string;
}

export function getCategoryTheme(categoryName: string, track?: 'science' | 'social_science'): CategoryTheme {
  const c = (categoryName || '').toLowerCase();

  // Health / Medicine -> #E5484D / #FDECEC
  if (c.includes('សុខាភិបាល') || c.includes('សុខភាព') || c.includes('medicine') || c.includes('health')) {
    return {
      name: categoryName,
      color: '#E5484D',
      bgColor: '#FDECEC',
      borderColor: '#FCA5A5',
      textColor: '#B91C1C',
      badgeClass: 'bg-[#FDECEC] text-[#B91C1C] border-[#FCA5A5]',
      iconBgClass: 'bg-[#FDECEC]',
      iconTextClass: 'text-[#E5484D]',
      borderClass: 'border-[#FDECEC]',
      hoverBorderClass: 'hover:border-[#E5484D]',
    };
  }

  // Agriculture / Environment / Food -> #1E9E6A / #E8F8F0
  if (c.includes('កសិកម្ម') || c.includes('បរិស្ថាន') || c.includes('ចំណីអាហារ') || c.includes('agriculture') || c.includes('food')) {
    return {
      name: categoryName,
      color: '#1E9E6A',
      bgColor: '#E8F8F0',
      borderColor: '#A7F3D0',
      textColor: '#047857',
      badgeClass: 'bg-[#E8F8F0] text-[#047857] border-[#A7F3D0]',
      iconBgClass: 'bg-[#E8F8F0]',
      iconTextClass: 'text-[#1E9E6A]',
      borderClass: 'border-[#E8F8F0]',
      hoverBorderClass: 'hover:border-[#1E9E6A]',
    };
  }

  // Engineering & Construction -> #6E56CF / #F1EEFD
  if (c.includes('វិស្វកម្ម') || c.includes('សំណង់') || c.includes('engineering') || c.includes('construction')) {
    return {
      name: categoryName,
      color: '#6E56CF',
      bgColor: '#F1EEFD',
      borderColor: '#DDD6FE',
      textColor: '#5B21B6',
      badgeClass: 'bg-[#F1EEFD] text-[#5B21B6] border-[#DDD6FE]',
      iconBgClass: 'bg-[#F1EEFD]',
      iconTextClass: 'text-[#6E56CF]',
      borderClass: 'border-[#F1EEFD]',
      hoverBorderClass: 'hover:border-[#6E56CF]',
    };
  }

  // Pure Sciences -> #1F5BFF / #EAF1FF
  if (c.includes('វិទ្យាសាស្ត្រពិត') || c.includes('pure science')) {
    return {
      name: categoryName,
      color: '#1F5BFF',
      bgColor: '#EAF1FF',
      borderColor: '#BAE6FD',
      textColor: '#1E40AF',
      badgeClass: 'bg-[#EAF1FF] text-[#1E40AF] border-[#BAE6FD]',
      iconBgClass: 'bg-[#EAF1FF]',
      iconTextClass: 'text-[#1F5BFF]',
      borderClass: 'border-[#EAF1FF]',
      hoverBorderClass: 'hover:border-[#1F5BFF]',
    };
  }

  // IT & Computing -> #0284C7 / #E0F2FE
  if (c.includes('កុំព្យូទ័រ') || c.includes('ព័ត៌មាន') || c.includes('it') || c.includes('computing')) {
    return {
      name: categoryName,
      color: '#0284C7',
      bgColor: '#E0F2FE',
      borderColor: '#BAE6FD',
      textColor: '#0369A1',
      badgeClass: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
      iconBgClass: 'bg-[#E0F2FE]',
      iconTextClass: 'text-[#0284C7]',
      borderClass: 'border-[#E0F2FE]',
      hoverBorderClass: 'hover:border-[#0284C7]',
    };
  }

  // Law & Governance -> #7C3AED / #F3E8FF
  if (c.includes('ច្បាប់') || c.includes('រដ្ឋបាល') || c.includes('law')) {
    return {
      name: categoryName,
      color: '#7C3AED',
      bgColor: '#F3E8FF',
      borderColor: '#E9D5FF',
      textColor: '#6B21A8',
      badgeClass: 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]',
      iconBgClass: 'bg-[#F3E8FF]',
      iconTextClass: 'text-[#7C3AED]',
      borderClass: 'border-[#F3E8FF]',
      hoverBorderClass: 'hover:border-[#7C3AED]',
    };
  }

  // Business / Commerce / Management / Finance -> #E37400 / #FFF4E0
  if (c.includes('ធុរកិច្ច') || c.includes('ពាណិជ្ជកម្ម') || c.includes('ហិរញ្ញវត្ថុ') || c.includes('គ្រប់គ្រង') || c.includes('business')) {
    return {
      name: categoryName,
      color: '#E37400',
      bgColor: '#FFF4E0',
      borderColor: '#FED7AA',
      textColor: '#9A3412',
      badgeClass: 'bg-[#FFF4E0] text-[#9A3412] border-[#FED7AA]',
      iconBgClass: 'bg-[#FFF4E0]',
      iconTextClass: 'text-[#E37400]',
      borderClass: 'border-[#FFF4E0]',
      hoverBorderClass: 'hover:border-[#E37400]',
    };
  }

  // Education & Training -> #D97706 / #FEF3C7
  if (c.includes('អប់រំ') || c.includes('គរុកោសល្យ') || c.includes('education')) {
    return {
      name: categoryName,
      color: '#D97706',
      bgColor: '#FEF3C7',
      borderColor: '#FDE68A',
      textColor: '#B45309',
      badgeClass: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
      iconBgClass: 'bg-[#FEF3C7]',
      iconTextClass: 'text-[#D97706]',
      borderClass: 'border-[#FEF3C7]',
      hoverBorderClass: 'hover:border-[#D97706]',
    };
  }

  // Arts & Design -> #DB2777 / #FCE7F3
  if (c.includes('សិល្បៈ') || c.includes('រចនា') || c.includes('តន្ត្រី') || c.includes('art') || c.includes('music')) {
    return {
      name: categoryName,
      color: '#DB2777',
      bgColor: '#FCE7F3',
      borderColor: '#FBCFE8',
      textColor: '#9D174D',
      badgeClass: 'bg-[#FCE7F3] text-[#9D174D] border-[#FBCFE8]',
      iconBgClass: 'bg-[#FCE7F3]',
      iconTextClass: 'text-[#DB2777]',
      borderClass: 'border-[#FCE7F3]',
      hoverBorderClass: 'hover:border-[#DB2777]',
    };
  }

  // Hospitality & Tourism -> #0D9488 / #CCFBF1
  if (c.includes('ទេសចរណ៍') || c.includes('បដិសណ្ឋារកិច្ច') || c.includes('tourism') || c.includes('hospitality')) {
    return {
      name: categoryName,
      color: '#0D9488',
      bgColor: '#CCFBF1',
      borderColor: '#99F6E4',
      textColor: '#115E59',
      badgeClass: 'bg-[#CCFBF1] text-[#115E59] border-[#99F6E4]',
      iconBgClass: 'bg-[#CCFBF1]',
      iconTextClass: 'text-[#0D9488]',
      borderClass: 'border-[#CCFBF1]',
      hoverBorderClass: 'hover:border-[#0D9488]',
    };
  }

  // Default track-based fallback
  const isSci = track === 'science';
  return {
    name: categoryName,
    color: isSci ? '#1F5BFF' : '#E37400',
    bgColor: isSci ? '#EAF1FF' : '#FFF4E0',
    borderColor: isSci ? '#BAE6FD' : '#FED7AA',
    textColor: isSci ? '#1E40AF' : '#9A3412',
    badgeClass: isSci ? 'bg-[#EAF1FF] text-[#1E40AF] border-[#BAE6FD]' : 'bg-[#FFF4E0] text-[#9A3412] border-[#FED7AA]',
    iconBgClass: isSci ? 'bg-[#EAF1FF]' : 'bg-[#FFF4E0]',
    iconTextClass: isSci ? 'text-[#1F5BFF]' : 'text-[#E37400]',
    borderClass: isSci ? 'border-[#EAF1FF]' : 'border-[#FFF4E0]',
    hoverBorderClass: isSci ? 'hover:border-[#1F5BFF]' : 'hover:border-[#E37400]',
  };
}
