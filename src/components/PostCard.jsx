import { Link } from 'react-router-dom';

// Formatea la fecha en español, ej. "15 de marzo de 2026"
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostCard({ post, featured = false }) {
  if (featured) {
    return (
      <Link
        to={`/post/${post.slug}`}
        className="group relative col-span-full flex flex-col overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-900/60 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-violet-900/20 hover:shadow-2xl"
      >
        {/* Content - Horizontal Layout but WITHOUT image */}
        <div className="flex flex-col justify-center gap-2 p-5 w-full border-l-4 border-violet-600">
          <div className="flex items-center justify-between">
            <span className="w-fit rounded-full bg-violet-600/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet-400 border border-violet-600/30">
              {post.category}
            </span>
            <time className="text-[10px] text-slate-500">{formatDate(post.date)}</time>
          </div>

          <h2 className="text-xl font-bold leading-tight text-white transition-colors group-hover:text-violet-300 sm:text-2xl">
            {post.title}
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-end pt-1">
            <span className="flex items-center gap-1 text-xs font-semibold text-violet-400 group-hover:gap-2 transition-all">
              Leer más
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/post/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-700/40 bg-slate-900/40 p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-violet-900/20 hover:shadow-lg"
    >
      {/* Content ONLY */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-violet-500">
            {post.category}
          </span>
          <time className="text-[9px] text-slate-500">{formatDate(post.date)}</time>
        </div>

        <h2 className="text-sm font-bold leading-tight text-white transition-colors group-hover:text-violet-300">
          {post.title}
        </h2>
        
        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-end pt-1">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-violet-400 group-hover:gap-2 transition-all">
            Leer
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
