import posts from '../data/posts';
import PostCard from '../components/PostCard';

function Home() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [featured, ...rest] = sorted;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 animate-fade-in">
      {/* Hero section */}
      <section className="mb-14 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white">
          Juan Jose Vargas Bertaggia
        </p>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white">
          C.I: 29.960.819
        </p>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white">
          Ingeniería en Informática
        </p>
      </section>

      {/* Entries grid */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          </div>
          <p className="text-slate-500 text-lg font-medium">Todavía no hay entradas publicadas.</p>
          <p className="text-slate-600 text-sm">Agrega tu primera entrada en <code className="text-violet-400">src/data/posts.js</code></p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {sorted.map((post) => (
            <PostCard key={post.id} post={post} featured />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
