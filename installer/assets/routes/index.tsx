import LogoSection from "../components/Logo/index.tsx";

function App() {
  return (
    <main
      className="flex flex-col md:flex-row-reverse md:h-screen"
      style={{ background: "#13111c" }}
    >
      <LogoSection />

      <section className="justify-center px-4 md:px-0 md:flex md:w-2/3 md:border-r border-gray-800">
        <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
          <h3 className="font-medium md:text-xl pt-3 text-white">
            Botway Assets CDN 📦
          </h3>
        </div>
      </section>
    </main>
  );
}

export default App;
