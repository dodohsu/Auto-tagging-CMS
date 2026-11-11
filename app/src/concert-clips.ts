export type ConcertTag = {
  category: "Mood" | "Topic" | "Title" | "Performance Type" | "Music Genre"
  label: string
}

export type ConcertClip = {
  id: string
  title: string
  start: string
  end: string
  thumbnail: string
  description: string
  tags: [ConcertTag] | [ConcertTag, ConcertTag] | [ConcertTag, ConcertTag, ConcertTag]
}

// Continuous draft boundaries approved from Concert.srt. Gaps without subtitles
// remain inside the clips; performance transitions still need visual review.
// Each clip carries 1–3 template tags. Balanced assignments below are demo
// fixtures for category coverage, not verified audiovisual analysis results.
export const concertClips: ConcertClip[] = [
  {
    "id": "concert-clip-01",
    "title": "Venue and lift rehearsal",
    "start": "00:00",
    "end": "02:14",
    "thumbnail": "clips/concert/continuous-01.jpg",
    "description": "Exploring the venue and testing the lift before the show.",
    "tags": [
      {
        "category": "Mood",
        "label": "Scary"
      },
      {
        "category": "Topic",
        "label": "Workplace"
      }
    ]
  },
  {
    "id": "concert-clip-02",
    "title": "Stage positions and cameras",
    "start": "02:14",
    "end": "04:17.940",
    "thumbnail": "clips/concert/continuous-02.jpg",
    "description": "Checking entrances, cameras and directions around the stage.",
    "tags": [
      {
        "category": "Topic",
        "label": "Workplace"
      },
      {
        "category": "Title",
        "label": "Group Name"
      }
    ]
  },
  {
    "id": "concert-clip-03",
    "title": "Merchandise and pre-show mood",
    "start": "04:17.940",
    "end": "06:06.940",
    "thumbnail": "clips/concert/continuous-03.jpg",
    "description": "Enjoying the merchandise, then talking about hunger and nerves.",
    "tags": [
      {
        "category": "Topic",
        "label": "Food"
      },
      {
        "category": "Mood",
        "label": "Relaxed"
      }
    ]
  },
  {
    "id": "concert-clip-04",
    "title": "An emotional rehearsal",
    "start": "06:06.940",
    "end": "07:17.940",
    "thumbnail": "clips/concert/continuous-04.jpg",
    "description": "Practising vocals and sharing how close they feel to tears.",
    "tags": [
      {
        "category": "Mood",
        "label": "Tearful"
      },
      {
        "category": "Performance Type",
        "label": "Melody"
      },
      {
        "category": "Music Genre",
        "label": "Ballad"
      }
    ]
  },
  {
    "id": "concert-clip-05",
    "title": "Pre-show nerves and encore",
    "start": "07:17.940",
    "end": "11:24.100",
    "thumbnail": "clips/concert/continuous-05.jpg",
    "description": "Encouraging each other, hearing encore calls and returning backstage.",
    "tags": [
      {
        "category": "Title",
        "label": "Group Name"
      },
      {
        "category": "Performance Type",
        "label": "Melody"
      },
      {
        "category": "Music Genre",
        "label": "J-Pop"
      }
    ]
  },
  {
    "id": "concert-clip-06",
    "title": "Surrounded by the audience",
    "start": "11:24.100",
    "end": "12:44.080",
    "thumbnail": "clips/concert/continuous-06.jpg",
    "description": "Reflecting on the joy of seeing fans in every direction.",
    "tags": [
      {
        "category": "Mood",
        "label": "Healing"
      },
      {
        "category": "Title",
        "label": "Group Name"
      }
    ]
  },
  {
    "id": "concert-clip-07",
    "title": "Nerves before day two",
    "start": "12:44.080",
    "end": "14:27.400",
    "thumbnail": "clips/concert/continuous-07.jpg",
    "description": "Discussing missed lyrics, fatigue and staying focused on day two.",
    "tags": [
      {
        "category": "Topic",
        "label": "Workplace"
      }
    ]
  },
  {
    "id": "concert-clip-08",
    "title": "Practice and team encouragement",
    "start": "14:27.400",
    "end": "16:01.400",
    "thumbnail": "clips/concert/continuous-08.jpg",
    "description": "Checking the routine again and encouraging each other before going on.",
    "tags": [
      {
        "category": "Performance Type",
        "label": "Melody"
      },
      {
        "category": "Music Genre",
        "label": "J-Pop"
      }
    ]
  },
  {
    "id": "concert-clip-09",
    "title": "Final backstage preparations",
    "start": "16:01.400",
    "end": "18:06.400",
    "thumbnail": "clips/concert/continuous-09.jpg",
    "description": "Sharing last-minute reminders and support before the next performance.",
    "tags": [
      {
        "category": "Performance Type",
        "label": "Melody"
      }
    ]
  },
  {
    "id": "concert-clip-10",
    "title": "Song, thanks and closing moments",
    "start": "18:06.400",
    "end": "20:37",
    "thumbnail": "clips/concert/continuous-10.jpg",
    "description": "A song segment followed by thanks, cheers and backstage reactions.",
    "tags": [
      {
        "category": "Title",
        "label": "Song Title"
      },
      {
        "category": "Music Genre",
        "label": "J-Pop"
      }
    ]
  }
]
