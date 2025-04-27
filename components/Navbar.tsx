export const Navbar = () => {
    return (
      <nav className="max-w-7xl relative flex items-center justify-between px-4 py-4 mx-auto mb-20">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-amber-500" />
          <h1 className="text-base font-bold md:text-2xl">CalCal</h1>
        </div>
        <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Login
        </button>
      </nav>
    );
};
