import { Github } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-2 px-4 bg-[#252526] border-t border-[#3e3e42]">
      <div className="container flex items-center justify-center space-x-4 text-xs text-[#d4d4d4]">
        <div className="flex items-center gap-2">
          <span className="text-[#0e639c]">Powered by</span>
          <Link 
            href="https://hariompandit.me" 
            target="_blank"
            className="font-medium text-[#0e639c] hover:text-[#1177bb] transition-colors"
          >
            Hariom Pandit
          </Link>
        </div>
        <div className="h-4 w-px bg-[#3e3e42]"></div>
        <Link
          href="https://github.com/hari7261"
          target="_blank"
          className="text-[#d4d4d4] hover:text-[#ffffff] transition-colors"
        >
          <Github className="h-4 w-4" />
        </Link>
      </div>
    </footer>
  )
}

