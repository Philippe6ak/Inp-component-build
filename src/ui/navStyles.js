// Shared base for all top-level nav items (both section headers and singletons)
export const menuButtonClass = [
  'w-full flex items-center justify-center md:justify-start',
  'md:gap-[10px]',
  'px-[10px] py-[10px] md:px-[16px]',
  'transition-all duration-300',
  'text-grey-600 text-[1.1rem] md:text-[1.15rem] font-semibold',
  'hover:bg-grey-50 hover:text-grey-800 hover:rounded-[var(--border-radius-sm)]',
  '[&_svg]:w-[24px] [&_svg]:h-[24px] [&_svg]:text-grey-400 [&_svg]:transition-all [&_svg]:duration-300',
  'hover:[&_svg]:text-brand-600',
].join(' ');

// Active state classes shared by both singletons and expandable headers
export const activeMenuButtonClass =
  'bg-grey-50 text-grey-800 rounded-(--border-radius-sm) [&_svg]:text-brand-600';

// Sub-item links (children inside an expanded section)
export const subNavLinkClass = [
  'flex items-center justify-center md:justify-start',
  'md:gap-[10px]',
  'px-[10px] py-[10px] md:px-[16px]',
  'transition-all duration-300',
  'text-grey-600 text-[1.35rem] md:text-[1.45rem] font-medium',
  'hover:bg-grey-50 hover:text-grey-800 hover:rounded-[var(--border-radius-sm)]',
  '[&.active]:bg-grey-50 [&.active]:text-grey-800 [&.active]:rounded-[var(--border-radius-sm)]',
  '[&_svg]:w-[24px] [&_svg]:h-[24px] [&_svg]:text-grey-400 [&_svg]:transition-all [&_svg]:duration-300',
  'hover:[&_svg]:text-brand-600 [&.active_svg]:text-brand-600',
].join(' ');
