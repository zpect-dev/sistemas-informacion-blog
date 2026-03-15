import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import posts from '../data/posts';

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post && window.mermaid) {
      window.mermaid.run();
    }
  }, [post]);

  if (!post) {
    return (
      <main className="flex flex-col items-center justify-center gap-6 py-32 text-center px-6 animate-fade-in">
        <div className="text-7xl">📄</div>
        <h1 className="text-3xl font-bold text-white">Entrada no encontrada</h1>
        <p className="text-slate-400">La entrada que buscas no existe o fue eliminada.</p>
        <Link
          to="/"
          className="mt-2 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
        >
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="animate-fade-in py-12">
      {/* Content container */}
      <div className="mx-auto max-w-3xl px-6 pb-20">
        {/* Meta Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block rounded-full bg-violet-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-400 border border-violet-600/30">
              {post.category}
            </span>
            <time className="text-sm text-slate-500">{formatDate(post.date)}</time>
          </div>
          
          <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
        </div>

        {/* Divider */}
        <div className="mb-10 h-px w-full bg-gradient-to-r from-violet-600/40 via-slate-700/40 to-transparent" />

        {/* Body */}
        <article
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back button */}
        <div className="mt-14 border-t border-slate-800/50 pt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Volver a todas las entradas
          </button>
        </div>
      </div>
    </main>
  );
}

export default PostDetail;
