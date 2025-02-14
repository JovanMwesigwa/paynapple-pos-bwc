import { FC, ReactNode } from "react";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen">
        {/* <Header /> */}
        <div className="flex h-full flex-col w-full ">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
