import "@styles/globals.css";

import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "discover and share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>   
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Navbar/>
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
