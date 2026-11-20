import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Final Bot — Group 06 (HCMUS FIT)",
  description:
    "Interactive 2-Layer Single-Page Portfolio for Final Bot at the Faculty of Information Technology, VNU-HCM University of Science (HCMUS).",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6f2e9",
}

const extensionGuardScript = `
(function() {
  try {
    function isExtensionNode(node) {
      if (!node || node.nodeType !== 1) return false;
      var cls = typeof node.className === 'string' ? node.className : '';
      var id = node.id || '';
      return (
        cls.indexOf('jso-cursor-trail') !== -1 ||
        id.indexOf('jso-cursor') !== -1 ||
        node.hasAttribute('data-jso')
      );
    }
    function relocateExtensionNodes() {
      if (!document.body) return;
      var children = Array.prototype.slice.call(document.body.children);
      for (var i = 0; i < children.length; i++) {
        if (isExtensionNode(children[i])) {
          document.documentElement.appendChild(children[i]);
        }
      }
    }
    relocateExtensionNodes();
    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          if (isExtensionNode(added[j]) && added[j].parentNode === document.body) {
            document.documentElement.appendChild(added[j]);
          }
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`light ${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: extensionGuardScript }} />
        {/* External configuration file (/public/config.js) for easy link/data editing */}
        <script src="/config.js" async />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#f6f2e9] font-sans text-[#1e1b16] antialiased selection:bg-[#9a6a3e]/25 selection:text-[#1e1b16]"
      >
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
