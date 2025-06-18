export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages - 1, totalPages];
    }
  
    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
      return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
  
    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };


export function cleanTranscript(text: string): string {
  // تقسيم النص إلى مقاطع بناءً على time stamp
  const parts = text.split(/\[\d{2}:\d{2}:\d{2,3}(?:\.\d{1,3})?\]/);

  // تنظيف كل جزء من الفراغات الزائدة وإزالة الفراغات الفارغة
  const cleaned = parts
    .map(part => part.trim())
    .filter(part => part.length > 0); // إزالة المقاطع الفارغة

  // إعادة تجميعها كسطور منفصلة
  return cleaned.join('\n');
}