import KeyboardTest from "@/components/KeyboardTest";
import wordlist from "@/assets/wordlists/ko"
import animebg from "@/assets/animebg.webp"
import pixelanimation from "@/assets/pixelanimation.webp"

function LearnPage() {
  return (
    <section className="w-screen h-screen flex flex-col justify-center" style={{
      backgroundImage: `url(${pixelanimation.src})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top right",
    }}>
      <KeyboardTest wordList={wordlist} />
    </section>
  );
}

export default LearnPage;
