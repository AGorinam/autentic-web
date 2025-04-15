import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-20 relative -mt-4">
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto">
        <div className="backdrop-blur-md bg-white/30 border border-slate-300/70 dark:border-slate-700/70 shadow-sm text-slate-800 dark:text-white rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Logo and social icons */}
          <div className="mb-10">
            <div className="text-xl font-bold">autentic.ai</div>
            <div className="flex space-x-5 mt-6">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 p-3 rounded-full text-slate-800 dark:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </Link>
              <Link href="https://www.youtube.com/@danidiestre" target="_blank" rel="noopener noreferrer" className="bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 p-3 rounded-full text-slate-800 dark:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                </svg>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 p-3 rounded-full text-slate-800 dark:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </Link>
              <Link href="http://discord.gg/PnBJNwDW77" target="_blank" rel="noopener noreferrer" className="bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 p-3 rounded-full text-slate-800 dark:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Menu sections - 2 columns on mobile, 3 on larger screens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10">
            {/* Connect column (merged Contact and Socials) */}
            <div>
              <h3 className="text-lg font-medium mb-4">Connect</h3>
              <ul className="space-y-3">
                <li><Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Github</Link></li>
                <li><Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">LinkedIn</Link></li>
                <li><Link href="https://www.youtube.com/@danidiestre" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">YouTube</Link></li>
                <li><Link href="http://discord.gg/PnBJNwDW77" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Discord</Link></li>
              </ul>
            </div>

            {/* Resources column (merged Help and Platforms) */}
            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="#contact-us" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#faq" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#web" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Web</Link></li>
              </ul>
            </div>

            {/* Product column - now visible on all screen sizes */}
            <div>
              <h3 className="text-lg font-medium mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#roadmap" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Roadmap</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Copyright and made in Barcelona - at the bottom with smooth separator */}
          <div className="mt-10 pt-6 border-t border-slate-200/30 dark:border-slate-700/30">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">© autentic.ai, {new Date().getFullYear()} — All rights reserved.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 sm:mt-0">Made with ❤️ in Barcelona</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-t from-slate-100 dark:from-slate-900 to-transparent -z-10"></div>
    </footer>
  );
} 