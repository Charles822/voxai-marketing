export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">VoxAI Marketing</h1>
      </div>
      
      <div className="relative flex place-items-center">
        <p className="text-lg">AI-powered 3D voxel art generation platform</p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <a
          href="#features"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">Features</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Text to 3D voxel generation
          </p>
        </a>

        <a
          href="#pricing"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">Pricing</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            From $9/month
          </p>
        </a>

        <a
          href="#gallery"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">Gallery</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            100+ curated models
          </p>
        </a>
      </div>
    </main>
  );
}
