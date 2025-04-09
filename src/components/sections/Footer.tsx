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
              <Link href="https://twitter.com" className="bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 p-3 rounded-full text-slate-800 dark:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </Link>
              <Link href="https://dribbble.com" className="bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 p-3 rounded-full text-slate-800 dark:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                  <path fillRule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99.082-.016 .164-.033 .246-.052 2.312-.988 3.391-2.493 3.563-2.637zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A6.95 6.95 0 0 1 8 1.18zm-2.907.642A43.123 43.123 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.865 6.865 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.002 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.817 6.817 0 0 1-1.752-4.564zM8 14.837a6.785 6.785 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.246 28.246 0 0 1 1.457 5.18A6.722 6.722 0 0 1 8 14.837zm3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.774 6.774 0 0 1-2.924 4.573z"/>
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 p-3 rounded-full text-slate-800 dark:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Menu sections - 2 columns on mobile, 4 on tablet, 5 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
            {/* Contact column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Contact</h3>
              <ul className="space-y-3">
                <li><Link href="https://github.com" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Github</Link></li>
                <li><Link href="https://twitter.com" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="https://instagram.com" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Instagram</Link></li>
              </ul>
            </div>

            {/* Platforms column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Platforms</h3>
              <ul className="space-y-3">
                <li><Link href="#ios" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">iOS</Link></li>
                <li><Link href="#android" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Android</Link></li>
                <li><Link href="#web" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Web</Link></li>
              </ul>
            </div>

            {/* Help column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Help</h3>
              <ul className="space-y-3">
                <li><Link href="#contact-us" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#faq" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#feedback" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Feedback</Link></li>
              </ul>
            </div>

            {/* Socials column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Socials</h3>
              <ul className="space-y-3">
                <li><Link href="https://twitch.tv" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Twitch</Link></li>
                <li><Link href="https://discord.com" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Discord</Link></li>
                <li><Link href="https://dribbble.com" className="text-slate-600 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:text-white transition-colors">Dribbble</Link></li>
              </ul>
            </div>

            {/* Product column - only visible on desktop */}
            <div className="hidden lg:block">
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