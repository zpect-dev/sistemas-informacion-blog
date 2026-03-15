import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/40 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-900/30 transition-transform group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-white"
            >
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          </div>

          <div>
            <span className="text-lg font-bold text-white tracking-tight">
              Sistemas de informacion I
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-slate-400 transition-colors hover:text-violet-400 font-medium"
          >
            Inicio
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
