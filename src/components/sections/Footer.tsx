import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-20 relative -mt-4">
      <div className="container px-4 md:px-6 max-w-[85%] md:max-w-[82%] mx-auto">
        <div className="bg-[#0a0d14] text-white rounded-3xl p-12 md:p-16 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-14">
            {/* Logo and copyright */}
            <div className="flex flex-col space-y-5">
              <div className="text-xl font-bold">autentic.ai</div>
              <p className="text-sm text-slate-400">© autentic.ai, {new Date().getFullYear()} — All rights reserved.</p>
              <div className="flex space-x-5 mt-8">
                <Link href="https://twitter.com" className="bg-[#1a1d23] hover:bg-[#2a2d33] p-3 rounded-full text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                  </svg>
                </Link>
                <Link href="https://dribbble.com" className="bg-[#1a1d23] hover:bg-[#2a2d33] p-3 rounded-full text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                    <path d="M8 0C3.58 0 0 8c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8m5.66 3.43a6.95 6.95 0 0 1 1.57 3.93c-.23-.06-1.19-.24-2.25-.24-.34 0-.69.02-1.03.06.04-.1.07-.19.11-.29.16-.39.32-.79.48-1.19 1.02-.46 1.87-.95 2.32-1.26a6.78 6.78 0 0 0-.83-.73 67.31 67.31 0 0 0-.8.58c-.44.33-1.23.83-2.4 1.34-.57.25-1.17.47-1.8.68-.58-1.18-1.2-2.26-1.79-3.25a148.1 148.1 0 0 0 1.92-.68c1.3-.47 2.14-.93 2.65-1.24a6.83 6.83 0 0 0-2.34-.81c-.33.21-1.03.61-2.14 1.03-.78.3-1.57.55-2.26.75.04-.11.08-.21.12-.32.33-.8.7-1.59 1.17-2.36.87-.15 1.77-.23 2.7-.23.66 0 1.3.06 1.92.16.23.28.44.56.65.86zM3.88 7.08c.32.44.87 1.32 1.49 2.61-1.13.34-2.26.54-3.3.62a57.48 57.48 0 0 0-.57.01a6.98 6.98 0 0 1 2.38-3.24M2.28 11.1c.15-.02.82-.13 2.16-.39.72-.14 1.45-.31 2.17-.53.33.65.66 1.31.95 1.97a42.45 42.45 0 0 1-1.92 1.06c-.59.29-1.16.51-1.63.64a7.02 7.02 0 0 1-1.73-2.75m3.12 3.53c.41-.14.91-.34 1.47-.63.69-.34 1.4-.75 2.03-1.17.79 2.07 1.18 3.75 1.27 4.17a6.95 6.95 0 0 1-4.77-2.37M8 14.26c-.05-.35-.3-1.93-1.04-3.84.06-.01.11-.03.17-.05a23.96 23.96 0 0 0 6.1-.83c.16.34.3.69.43 1.05-1.8.65-3.42 1.7-4.72 3.13-.31.34-.58.68-.82 1.01-.04-.15-.08-.31-.12-.47" />
                  </svg>
                </Link>
                <Link href="https://linkedin.com" className="bg-[#1a1d23] hover:bg-[#2a2d33] p-3 rounded-full text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Product column */}
            <div className="pl-0 md:pl-6">
              <h3 className="text-lg font-medium mb-6">Product</h3>
              <ul className="space-y-4">
                <li><Link href="#features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#roadmap" className="text-slate-400 hover:text-white transition-colors">Roadmap</Link></li>
                <li><Link href="#changelog" className="text-slate-400 hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            {/* Integrations column */}
            <div className="pl-0 md:pl-6">
              <h3 className="text-lg font-medium mb-6">Integrations</h3>
              <ul className="space-y-4">
                <li><Link href="#intercom" className="text-slate-400 hover:text-white transition-colors">Intercom</Link></li>
                <li><Link href="#zendesk" className="text-slate-400 hover:text-white transition-colors">Zendesk</Link></li>
                <li><Link href="#slack" className="text-slate-400 hover:text-white transition-colors">Slack</Link></li>
                <li><Link href="#linear" className="text-slate-400 hover:text-white transition-colors">Linear</Link></li>
              </ul>
            </div>

            {/* Company column */}
            <div className="pl-0 md:pl-6">
              <h3 className="text-lg font-medium mb-6">Company</h3>
              <ul className="space-y-4">
                <li><Link href="#about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal column */}
            <div className="pl-0 md:pl-6">
              <h3 className="text-lg font-medium mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><Link href="#terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#security" className="text-slate-400 hover:text-white transition-colors">Security</Link></li>
                <li><Link href="#cookies" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-t from-slate-100 dark:from-slate-900 to-transparent -z-10"></div>
    </footer>
  );
} 