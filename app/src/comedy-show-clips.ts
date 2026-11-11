import { comedyChapters, comedyTime } from "./ComedyHighlightData"
import type { TaggedClip } from "./tagged-clips"

// Reuse the ten subtitle-based chapter boundaries from the existing comedy analysis.
// Tags and summaries are editorial candidates; retain the original punchline analysis separately.
const descriptions = [
  "從舞台角色互換、前任婚禮到道謝與道歉錯置，接著以恐怖校規與 AI 稱呼攻防延伸角色反差。",
  "戀愛條件評分與情侶互動重演，接續跳傘導覽的意外及穿越武士適應現代生活的誤會。",
  "猜拳懲罰、輝夜姬求婚條件、濕包推理與宵夜抉擇，最後以失控的接客練習收束。",
  "理想約會的角色互換、被答成大喜利的提問，以及中華餐館最後突然改用日語吐槽的反轉。",
  "獻血獎勵、寶可夢式家長對應、蔬菜攻擊力、叛逆兒子管教與街拍烏龜，呈現日常情境的荒謬升級。",
  "從共感覺與拉麵店付款，到奶奶交友、蔬菜刑事劇及偏見宣導，靠雙關與固定觀念錯位製造笑點。",
  "航海王劇透、音樂祭試麥、老師開拉麵店、搗麻糬青春劇與美容師招牌誤會，各組接續演出。",
  "便利商店戀情、牙醫離題、歌手前任幻想、牡蠣代數及歷史人物英語教室，展開戀愛與字義誤用。",
  "假髮退出宣言、婚禮致詞、即興廣告、交友軟體重逢與高齡 M-1，以荒唐推演及伏筆揭露接續收尾。",
  "神燈願望執著於牙醫費、夏祭屋台的循環演出，最後以可愛夢想走進校園情境並結束合集。"
]
const clipTags: TaggedClip["tags"][] = [
  [
    {
      "category": "Topic",
      "label": "School"
    },
    {
      "category": "Highlight Type",
      "label": "Boke"
    },
    {
      "category": "Mood",
      "label": "Laughter"
    }
  ],
  [
    {
      "category": "Mood",
      "label": "Romance"
    },
    {
      "category": "Topic",
      "label": "Romance"
    },
    {
      "category": "Highlight Type",
      "label": "Setup"
    }
  ],
  [
    {
      "category": "Highlight Type",
      "label": "Closing Punchline"
    },
    {
      "category": "Topic",
      "label": "Food"
    },
    {
      "category": "Mood",
      "label": "Laughter"
    }
  ],
  [
    {
      "category": "Title",
      "label": "Group Name"
    },
    {
      "category": "Highlight Type",
      "label": "Tsukkomi"
    },
    {
      "category": "Topic",
      "label": "Romance"
    }
  ],
  [
    {
      "category": "Topic",
      "label": "Family"
    },
    {
      "category": "Highlight Type",
      "label": "Boke"
    },
    {
      "category": "Mood",
      "label": "Laughter"
    }
  ],
  [
    {
      "category": "Highlight Type",
      "label": "Tsukkomi"
    },
    {
      "category": "Topic",
      "label": "Food"
    },
    {
      "category": "Mood",
      "label": "Laughter"
    }
  ],
  [
    {
      "category": "Title",
      "label": "Group Name"
    },
    {
      "category": "Topic",
      "label": "Anime / Pop Culture"
    },
    {
      "category": "Highlight Type",
      "label": "Punchline"
    }
  ],
  [
    {
      "category": "Mood",
      "label": "Romance"
    },
    {
      "category": "Topic",
      "label": "Romance"
    },
    {
      "category": "Highlight Type",
      "label": "Punchline"
    }
  ],
  [
    {
      "category": "Highlight Type",
      "label": "Closing Punchline"
    },
    {
      "category": "Topic",
      "label": "Romance"
    },
    {
      "category": "Mood",
      "label": "Laughter"
    }
  ],
  [
    {
      "category": "Mood",
      "label": "Laughter"
    },
    {
      "category": "Topic",
      "label": "School"
    },
    {
      "category": "Highlight Type",
      "label": "Closing Punchline"
    }
  ]
]

export const comedyShowClips: TaggedClip[] = comedyChapters.map((chapter, index) => ({
  id: `comedy-show-clip-${String(index + 1).padStart(2, "0")}`,
  title: chapter.name,
  start: comedyTime(chapter.start),
  end: comedyTime(chapter.end),
  thumbnail: `clips/comedy-show/continuous-${String(index + 1).padStart(2, "0")}.jpg`,
  description: descriptions[index],
  tags: clipTags[index],
}))
