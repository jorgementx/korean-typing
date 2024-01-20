import TypingGame from "@/components/TypingGame";
import { loremKorean as text } from "@/components/example";

function HomePage() {
  return (
    <section className="bg-slate-900 flex items-center flex-col w-screen min-h-screen gap-10">
      <h1 className="text-white text-6xl py-8 tracking-tighter ">
        Typing practice <span className="inline-block">⚡</span>
      </h1>
      <TypingGame text={text} />
    </section>
  );
}

export default HomePage;
