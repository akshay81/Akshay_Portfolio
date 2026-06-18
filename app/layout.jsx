import "./globals.css";
import SideBar from "./layouts/SideBar";
import NavBar from "./layouts/NavBar";
import ChatBot from "./components/ChatBot";

// export const metadata = {
//   title: "Akshay Ajay Sharma",
//   description: "Im gonna be the king of the pirates.",
//   image: "https://next-vcard-portfolio.vercel.app/embed.png",
//   keywords: ["Akshay", "Sharma", "Akshay Ajay Sharma", "Akshay Sharma"],
//   "og:title" : "Akshay Ajay Sharma",
//   "og:description" : "Im gonna be the king of the pirates.",
//   "og:image" : "https://next-vcard-portfolio.vercel.app/embed.png",

//   "twitter:title" : "Akshay Ajay Sharma",
//   "twitter:description" : "Im gonna be the king of the pirates.",
//   "twitter:image" : "https://next-vcard-portfolio.vercel.app/embed.png",
// };

export const metadata = {
  title: "Akshay Ajay Sharma",
  description: "Im gonna be the king of the pirates.",
  image: "https://next-vcard-portfolio.vercel.app/embed.png",
  keywords: ["Akshay", "Sharma", "Akshay Ajay Sharma", "Akshay Ajay Sharma"],
  openGraph: {

    images: [
      {
        url: "https://next-vcard-portfolio.vercel.app/og-img.png",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "https://next-vcard-portfolio.vercel.app/og-img.png",
      },
    ]
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
<main>
          <SideBar />
          <div className="main-content">
            <NavBar />
            {children}
          </div>
        </main>
        <ChatBot />
      </body>
    </html>
  );
}