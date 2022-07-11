import { NextSeo } from 'next-seo';
import { IoPauseOutline } from 'react-icons/io5';

export default function Home() {
  const SEO = {
    title: 'Next JS Template',
    description: 'Next JS Template with Tailwind CSS and React Icons',

    openGraph: {
      title: 'Next JS Template',
      description: 'Next JS Template with Tailwind CSS and React Icons',
      type: 'website',
      locale: 'en_IN',
      url: 'mridul.tech',
      site_name: 'Next JS Template',
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <NextSeo {...SEO} />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl font-bold">
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js
          </a>{' '}
          Template Home Page!
        </h1>

        <p className="mt-5 text-2xl">
          Get started by editing{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="https://nextjs.org/docs"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Examples &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
            <p className="mt-4 text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="p-3 flex justify-center items-center gap-1 flex-col sm:flex-row bg-white">
        <span className="flex items-center">
          Template by{' '}
          <a
            className="ml-1 font-semibold"
            href="https://www.mridul.tech/"
            target="_blank"
            rel="noreferrer"
          >
            Mridul
          </a>
          <span className="px-3 ml-1">
            <IoPauseOutline size={28} />
          </span>
        </span>
        <span>
          Made with ❤ {'& '}
          <a
            className="ml-1 font-semibold"
            href="https://github.com/Mridul2820/next-template"
            target="_blank"
            rel="noreferrer"
          >
            {'<Code/>'}
          </a>
        </span>
      </footer>
    </div>
  );
}
