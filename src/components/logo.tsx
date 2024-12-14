import Link from 'next/link'

export function Logo() {
  return (
    <Link 
      href="https://hariompandit.me" 
      target="_blank"
      className="flex items-center gap-2 text-2xl font-bold text-[#0e639c] hover:text-[#1177bb] transition-colors mb-4"
    >
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0e639c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="#0e639c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#0e639c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>hariompandit.me</span>
    </Link>
  )
}

