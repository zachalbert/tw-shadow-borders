export default function Home() {
  const FixedElement = ({ children }: { children: React.ReactNode }) => (
    <div className="border border-blue-500 p-4">{children}</div>
  );

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen">
      <h1 className="text-4xl font-bold">Shadow Border Test</h1>

      <div className="flex items-center">
        <div className="shadow-borders">
          <FixedElement>Shadow border</FixedElement>
        </div>
        <div className="bg-red-500 h-[56px] flex items-center">56px tall</div>
        <FixedElement>Regular border</FixedElement>
      </div>
    </div>
  );
}
