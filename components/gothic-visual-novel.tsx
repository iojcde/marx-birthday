"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Scroll, Feather, Volume2, VolumeX, Book } from "lucide-react";
import confetti from "canvas-confetti";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Dialogue = {
  speaker:
    | "카를 마르크스"
    | "프리드리히 엥겔스"
    | "포피"
    | "해설자"
    | "카를 마르크스 & 프리드리히 엥겔스";
  text: string;
  image: string | string[];

  hidden?: boolean;
};

const engelsImages = [
  "https://i.namu.wiki/i/E1CIsSjk75l336fefWwDvZpV17B-moUCfINbtVbIx-HEAjyiVisIgIdewFzU1kySToyNH-L6GJBuYlC1ZZ9gNA.webp",
  "https://i.namu.wiki/i/AwP8W5c_Gm3HaZmy0QTJ46UtuGRN70kC2OY-1nJd4SC3IyUoaf9t4_mDF4gyDCzx-T66VUaYvwdD_k5FHJkUMg.webp",
];

const script: Dialogue[] = [
  {
    speaker: "해설자",
    text: "19세기의 한 집 앞이다.",
    image: "https://city-walk.brest-belarus.org/marxstr/1/m_1.jpg",
  },
  {
    speaker: "프리드리히 엥겔스",
    text: "(문을 두드리며) 카를! 준비되었는가? 포피의 생일 모임에 늦겠네!",
    image: engelsImages,
  },
  {
    speaker: "카를 마르크스",
    text: "(문을 열며, 헝클어진 모습으로) 늦다니? 말도 안 되는 소리, 프리드리히. 시간은 부르주아지가 노동 계급을 통제하기 위해 만든 허상일 뿐일세.",
    image: "https://cdn.hankyung.com/photo/202105/01.26440724.1.jpg",
  },
  {
    speaker: "프리드리히 엥겔스",
    text: "(한숨을 쉬며) 모든 것이 계급 투쟁에 관한 것은 아니네, 카를. 포피는 몇 주 동안 이 모임을 기대해왔네. 그 학생을 기억하나? 지난번 세미나에서 내 친구가 소개했던 포피 말일세.",
    image: engelsImages,
  },
  {
    speaker: "카를 마르크스",
    text: "아, 그 학생 말인가. 그녀가 나와 자네의 팬이라고 했지. 생일이라니, 불필요한 소비를 장려하고 집단적 선보다 개인주의를 강화하는 또 하나의 자본주의적 음모로구먼.",
    image: "https://cdn.hankyung.com/photo/202105/01.26440724.1.jpg",
  },
  {
    speaker: "프리드리히 엥겔스",
    text: "(눈을 굴리며) 그냥 선물이나 챙기고 가세나. 포피는 자네의 생각에 대해 잘 알고 있더구만. 그녀의 생일을 축하해주는 것이 그녀에게 큰 의미가 있을 걸세.",
    image: engelsImages,
  },
  {
    speaker: "해설자",
    text: "(그들이 포피의 집에 도착한다. 포피는 비밀스러운 배경을 가진 학생으로, 카를 마르크스와 프리드리히 엥겔스를 만나는 것을 꿈꿔왔다.)",
    image:
      "https://images.gmanews.tv/webpics/2020/12/Screen_Shot_2020-12-09_at_10_2020_12_09_10_53_01.png",
  },
  {
    speaker: "포피",
    text: "(진지하게, 그러나 기쁘게) 카를! 프리드리히! 와주셔서 감사합니다.",
    image: "https://pbs.twimg.com/media/GD40pZdaUAAISLq?format=jpg&name=large",
  },
  {
    speaker: "카를 마르크스",
    text: "(어색하게) 생일을... 축하하네, 포피. 다음 태양 주기가 억압적인 사회경제 구조의 붕괴를 가져오기를.",
    image: "https://cdn.hankyung.com/photo/202105/01.26440724.1.jpg",
  },
  {
    speaker: "포피",
    text: "감사합니다, 마르크스 님. 들어오세요.",
    image: "https://pbs.twimg.com/media/GD40pZdaUAAISLq?format=jpg&name=large",
  },

  {
    speaker: "카를 마르크스",
    text: "(조잡하게 포장된 선물을 건네며) 선물을 가져왔네. 내 최신 원고일세. 자본주의의 모순을 파헤친 글이지.",
    image: "https://cdn.hankyung.com/photo/202105/01.26440724.1.jpg",
  },
  {
    speaker: "프리드리히 엥겔스",
    text: "(속삭이며) 카를, 우리가 얘기했잖나.. 모든 사람에게 자네 원고를 선물로 줄 순 없네.",
    image: engelsImages,
  },
  {
    speaker: "카를 마르크스",
    text: "(분개하며) 왜 안 되나? 프롤레타리아트의 해방이야말로 가장 큰 선물 아니겠나!",
    image: "https://cdn.hankyung.com/photo/202105/01.26440724.1.jpg",
  },
  {
    speaker: "포피",
    text: "(선물을 열며) 어... 정말 사려 깊으시네요. 고맙습니다. 꼼꼼히 읽어보도록 하겠습니다.",
    image: "https://pbs.twimg.com/media/GD40pZdaUAAISLq?format=jpg&name=large",
  },
  {
    speaker: "프리드리히 엥겔스",
    text: "(포피에게) 정말 미안하네.. 내년엔 정상적인 선물을 가져오겠네.",
    image: engelsImages,
  },
  {
    speaker: "포피",
    text: "(고개를 끄덕이며) 괜찮아요, 프리드리히 님. 중요한 것은 우리 모두가 함께 있다는 사실이죠. 저는 이 순간을 소중히 여기고 있습니다.",
    image: "https://pbs.twimg.com/media/GD40pZdaUAAISLq?format=jpg&name=large",
  },
  {
    speaker: "카를 마르크스",
    text: "(밝아지며) 이제 케이크를 먹세! 결국, 달콤함의 재분배도 정의로운 사회를 위한 중요한 단계이지.",
    image: "https://cdn.hankyung.com/photo/202105/01.26440724.1.jpg",
  },
  {
    speaker: "해설자",
    text: "(그들이 케이크를 나눠 먹으며)",
    image:
      "https://images.gmanews.tv/webpics/2020/12/Screen_Shot_2020-12-09_at_10_2020_12_09_10_53_01.png",
  },
  /*프리드리히: (케이크를 먹으며) 이 케이크는 정말 맛있군. 어디서 구했는가?

안나: (진지하게) 파리바게트라는 곳에서 사왔습니다. 파리에서 온 특별한 케이크입니다.

카를 마르크스: 파리라... 파리는 혁명의 도시이지. 그곳의 노동자들은 언제나 자유와 평등을 위해 싸우고 있네. 그들의 투쟁은 우리 모두에게 영감을 주지 않겠나.*/
  {
    speaker: "프리드리히 엥겔스",
    text: "이 케이크는 정말 맛있군. 어디서 구했는가?",
    image: engelsImages,
  },
  {
    speaker: "포피",
    text: "어.. 집 앞에 있는 '파리바게트'라는 가게에서 사왔어요. 파리에서 온 특별한 케이크입니다.",
    image:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDExMjJfMjMw/MDAxNjA2MDAyMTE1MDM0.U1xpfY6I4t_3DvYDKtCo1P09XTJ3ac8cz6qJSPpCCLcg.R9XRGs2MMjT9Q8FvKmF9v23OPRh4sYb4K-DZVqgyjyMg.JPEG.shaniro1/20201120%EF%BC%BF091707.jpg?type=w800",
  },
  {
    speaker: "카를 마르크스",
    text: "파리라... 파리는 혁명의 도시이지. 그곳의 노동자들은 언제나 자유와 평등을 위해 싸우고 있네. 그들의 투쟁은 우리 모두에게 영감을 주지 않겠나.",
    image: "https://cdn.hankyung.com/photo/202105/01.26440724.1.jpg",
  },
  {
    speaker: "해설자",
    text: "(그들이 케이크를 나눠 먹으며)",
    image:
      "https://images.gmanews.tv/webpics/2020/12/Screen_Shot_2020-12-09_at_10_2020_12_09_10_53_01.png",
  },
  {
    speaker: "카를 마르크스 & 프리드리히 엥겔스",
    text: "포피, 생일 축하한다! 앞으로 제 갈 길을 가라, 남이야 뭐라든!",

    image:
      "https://flexible.img.hani.co.kr/flexible/normal/500/438/imgdb/original/2021/0527/20210527504154.jpg",
  },

  {
    speaker: "해설자",
    text: "끝!!!!! 생일축하합니다 귤포피님!!!",
    image:
      "https://images.gmanews.tv/webpics/2020/12/Screen_Shot_2020-12-09_at_10_2020_12_09_10_53_01.png",
    hidden: true,
  },
  {
    speaker: "해설자",
    text: "made by Jeeho Ahn in 2024",
    image:
      "https://pbs.twimg.com/profile_images/1823250777273692160/HKouX82__400x400.jpg",
    hidden: true,
  },
];
export function GothicVisualNovelComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentImage, setCurrentImage] = useState("");
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [sleeping, setSleeping] = useState(false);

  const currentDialogue = script[currentIndex];
  const typingAudioRef = useRef<HTMLAudioElement | null>(null);
  const femaleTypingAudioRef = useRef<HTMLAudioElement | null>(null);
  const characterAudioRef = useRef<HTMLAudioElement | null>(null);

  const typeText = useCallback(() => {
    if (displayedText.length < currentDialogue.text.length) {
      const nextChar = currentDialogue.text.charAt(displayedText.length);
      setDisplayedText(currentDialogue.text.slice(0, displayedText.length + 1));
      if (isSoundOn) {
        if (currentDialogue.speaker === "포피") {
          femaleTypingAudioRef.current?.play();
        } else {
          typingAudioRef.current?.play();
        }
      }
      if (/[.!?]/.test(nextChar)) {
        setSleeping(true);
        setTimeout(() => {
          setIsTyping(true);
          setSleeping(false);
        }, 250);

        setIsTyping(false);
      }
    } else {
      setIsTyping(false);
      if (isSoundOn) {
        characterAudioRef.current?.play();
      }
    }
  }, [
    currentDialogue.text,
    displayedText,
    isSoundOn,
    currentDialogue.speaker,
    sleeping,
  ]);

  useEffect(() => {
    if (!isStarted) {
      return;
    }
    if (isTyping) {
      const typingInterval = setInterval(typeText, 30);
      return () => clearInterval(typingInterval);
    }
  }, [isTyping, typeText, isStarted]);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    if (Array.isArray(currentDialogue.image)) {
      setCurrentImage(
        currentDialogue.image[
          Math.floor(Math.random() * currentDialogue.image.length)
        ]
      );
    } else {
      setCurrentImage(currentDialogue.image);
    }
  }, [currentIndex, currentDialogue.image]);

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
    } else if (currentIndex < script.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (currentIndex === script.length - 3) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [currentIndex, script.length]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const startConversation = () => {
    setIsStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-amber-100 ">
      {!isStarted ? (
        <Dialog open={!isStarted}>
          <DialogContent className="bg-stone-800 text-amber-100 border-2 border-amber-700">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-amber-500">
                혁명의 여명 속 파티
              </DialogTitle>
              <DialogDescription className="text-amber-200 text-md">
                카를 마르크스와 그의 동료 프리드리히 엥겔스가 학생 귤포피의 생일
                파티에 초대된다. <br />
                이들이 한자리에 모인 이유는 단순한 생일 축하가 아니다. 철학과
                혁명, 그리고 개인적인 이야기가 얽힌 이 특별한 밤의 이야기를 지금
                만나보아라.
                <br />
                <br />
                <p className="text-sm">
                  <strong className="font-bold">주의:</strong> 이 대화는
                  픽션입니다. 실제 역사적 사실과 다를 수 있습니다.
                </p>
                <br />
                <br />
                <p>Made by Jeeho Ahn (안지호) in 2024</p>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={startConversation}
                className="bg-amber-900 hover:bg-amber-800 text-amber-100 border border-amber-700"
              >
                Start Conversation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="w-full max-w-4xl bg-stone-800 rounded-lg shadow-lg overflow-hidden border-4 border-amber-900">
          <div
            className="h-80 bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('/placeholder.svg?height=320&width=640&text=Gothic+Scene')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
            <div className="h-full flex items-end justify-center relative z-10">
              <img
                src={currentImage}
                // alt={currentDialogue.speaker}
                className="h-72 w-48 object-cover object-top rounded-t-lg border-2 border-amber-700 shadow-lg"
              />
            </div>
          </div>

          <div className="p-6 bg-stone-800 min-h-[200px] relative">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-stone-900 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=200&width=640&text=Ornate+Border')] bg-no-repeat bg-contain opacity-10"></div>
            <h3 className="text-2xl font-bold mb-4 text-amber-500">
              {currentDialogue.speaker}
            </h3>
            <p className="text-lg h-36 overflow-y-auto leading-relaxed relative z-10">
              {displayedText}
            </p>
            <Feather
              className="absolute bottom-4 right-4 text-amber-700 opacity-50"
              size={24}
            />
          </div>

          <div className="flex justify-between items-center p-4 bg-stone-900 border-t-2 border-amber-900">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-amber-900 hover:bg-amber-800 text-amber-100 border border-amber-700"
            >
              <Scroll className="mr-2 h-4 w-4" />
              이전
            </Button>
            <Button
              onClick={toggleSound}
              className="bg-amber-900 hover:bg-amber-800 text-amber-100 border border-amber-700"
            >
              {isSoundOn ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
            <Button
              onClick={handleNext}
              className="bg-amber-900 hover:bg-amber-800 text-amber-100 border border-amber-700"
            >
              {isTyping || sleeping
                ? "건너뛰기"
                : currentIndex === script.length - 1
                ? "종료"
                : "다음"}
              <Scroll className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="mt-4  hover:bg-amber-800 hover:text-amber-100 text-sm text-amber-100 "
          >
            <Book className="mr-2 h-4 w-4" />
            전체 대본 보기
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-stone-800 text-amber-100 border-2 border-amber-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-500">
              전체 대본
            </DialogTitle>
            <DialogDescription className="text-amber-200">
              아래에서 전체 대화 내용을 확인할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            {script
              .filter((i) => !i.hidden)
              .map((dialogue, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-bold text-amber-500">
                    {dialogue.speaker}
                  </h4>
                  <p className="text-amber-100">{dialogue.text}</p>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
      <audio ref={typingAudioRef} src="/sfx-blipmale.wav" />
      <audio ref={femaleTypingAudioRef} src="/sfx-blipfemale.wav" />
    </div>
  );
}
