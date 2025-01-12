import Header from "../ui/main/header";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden">
      <Header />

      <div className="flex-grow px-8 pt-32 pb-12 md:pl-0 md:pr-8 overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
