import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="heading text-7xl text-primary-200 sm:text-8xl">404</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-3 max-w-md text-lg text-slate-600">The page may have moved. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/programmes" variant="outline" icon={false}>Find a programme</Button>
      </div>
    </section>
  );
}
