import KeyboardTest from "@/components/KeyboardTest";
const { getWordsList } = require('most-common-words-by-language');

function LearnPage() {
  const wordList2 = ['no', 'pero', 'parece', 'que', 'esto', 'funcione']
  return (
    <section className="w-screen h-screen flex flex-col justify-center">
      {/* selector de layout */}
      <KeyboardTest wordList={wordList2} />
    </section>
  );
}

export default LearnPage;
