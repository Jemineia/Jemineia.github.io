/* ========================================
   콘텐츠 데이터
   title
   startDate
   endDate

   images
======================================== */

const contents = [
  {
    title: "니케 2x2 Love",
    startDate: "2026-04-04",
    endDate: "2026-04-08",

    images: [
      {
        src: "images/contents/2x2Love.png",
        fit: "background"
      },
      {
        src: "images/contents/2x2Love2.png",
        fit: "background"
      }
    ]
  },
  {
    title: "당신과 나의 존재불명",
    startDate: "2026-05-10",
    endDate: "2026-05-12",
    images: [
      {
        src: "images/contents/noexistence.png",
        fit: "background"
      }
    ]
  },
  {
    title: "초 카구야 공주!",
    startDate: "2026-07-05",
    endDate: "2026-07-06",

    images: [
      {
        src: "images/contents/kaguyahime.jpg",
        fit: "cover"
      }
    ]
  },
  {
    title: "향기로운 꽃은 늠름하게 핀다",
    startDate: "2026-08-10",
    endDate: "2026-08-24",

    images: [
      {
        src: "images/contents/flower1.jpg",
        fit: "background"
      },
      {
        src: "images/contents/flower2.webp",
        fit: "background"
      },
      {
        src: "images/contents/flower3.jpg",
        fit: "background"
      }
    ]
  },
  {
    title: "마법소녀의 마녀재판(마노사바)",

    startDate: "2026-08-28",

    endDate: "2026-09-10",

    /* contain, cover, background
    1. cover : 날짜에 사진을 꽉차게(빈 공간x)
    2. contain : 사진을 날짜에 맞게(빈 공간o)
    3. background : 뒤에 흐릿한 사진 배경
    */
    images: [
      {
        src: "images/contents/manosaba5.png",
        fit: "cover"
      },
      {
        src: "images/contents/manosaba3.png",
        fit: "cover"
      },
      {
        src: "images/contents/manosaba4.png",
        fit: "background"
      },
      {
        src: "images/contents/manosaba1.png",
        fit: "background"
      }
    ],

    link: "https://gall.dcinside.com/mgallery/board/view?id=manosaba&no=223713"
  },
  {
    title: "별이 떨어질 때 - 경서",
    startDate: "2026-09-14",
    endDate: "2026-09-14",
    images: [
      {
        src: "https://i.ytimg.com/vi/LsJ9vFGphp4/maxresdefault.jpg",
        fit: "cover"
      }
    ],

    link: "https://www.youtube.com/watch?v=LsJ9vFGphp4"
  },
  {
    title: "44교시 생존수업",
    startDate: "2026-09-20",
    endDate: "2026-09-20",

    images: [
      {
        src: "https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791143205728.jpg?t=2983086",
        fit: "cover"
      }
    ]
  },
  {
    title: "과학고 생존일지",
    startDate: "2026-10-03",
    endDate: "2026-10-03",

    images: [
      {
        src: "images/contents/science.jpg",
        fit: "cover"
      }
    ],
    link: "https://comic.naver.com/webtoon/list?titleId=841608"
  },
  {
    title: "Light My Night - 꽃감이",
    startDate: "2026-10-04",
    endDate: "2026-10-04",

    images: [
      {
        src : "images/contents/Light My Night.jpg",
        fit : "cover"
      }
    ],
    link: "https://youtu.be/pBt2fO1NxS0"
  },
  {
    title: "전자오락수호대",
    startDate: "2026-10-17",
    endDate: "2026-10-17",
    images: [
      {
        src: "https://i.ytimg.com/vi/7jwq362anB0/maxresdefault.jpg",
        fit: "cover"
      }
    ]
  },
  {
    title: "Brave Shine(v. 토키노 메리)",
    startDate: "2026-10-18",
    endDate: "2026-10-18",
    images: [
      {
        src: "images/contents/BS.jpg",
        fit: "cover"
      }
    ],
    link: "https://youtu.be/v306nw4cvwI"
  },
  {
    title: "아리도록",
    startDate: "2026-10-24",
    endDate: "2026-10-24",
    images: [
      {
        src: "https://dcimg2.dcinside.co.kr/viewimage.php?id=2cafd922eac037ad&no=63f39f2fe8d577a26fabd7e44e806b30281cda0962d74760639193943da0d2896ec525d4491810dd57fa07706a767f56c96e4e9b1f4d37855e99ed9900dc75efb87a2bfa92e9",
        fit: "cover",
      }
    ],
    link: "https://comic.naver.com/webtoon/list?titleId=849736"
  },
  {
    title: "아빠가 힘을 숨김",
    startDate: "2026-11-15",
    endDate: "2026-11-15",
    images: [
      {
        src:
"https://pbs.twimg.com/media/GscLi6sacAAeLAn?format=webp&name=large",
        fit: "cover",
      }
    ],
    link: "https://page.kakao.com/home/%EC%95%84%EB%B9%A0%EA%B0%80-%ED%9E%98%EC%9D%84-%EC%88%A8%EA%B9%80/65504205/"
  },
  {
    title: "니케 Maria-n",
    startDate: "2026-11-16",
    endDate: "2026-11-16",
    images: [
      {
        src:
"https://private-user-images.githubusercontent.com/118803136/707708722-561e1ebc-c6c1-4dc8-82bd-0d9003a60491.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3OTQ4MzU0MDksIm5iZiI6MTc5NDgzNTEwOSwicGF0aCI6Ii8xMTg4MDMxMzYvNzA3NzA4NzIyLTU2MWUxZWJjLWM2YzEtNGRjOC04MmJkLTBkOTAwM2E2MDQ5MS5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYxMTE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MTExNlQxMzE4MjlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03YzY3MmU0YzU5OTEyYzRhZDJjMzJjYTIyYWVmZGVjOWVlNzUxYWE3OTEzOTQ0OGUyYTRkNWE3NDczNWM5ZDhkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZqcGVnIn0.dnw_xBjkQP75T9r_E8PD0FytGlSqX2HR7Hph8s5E8V0",
        fit: "cover",
      }
    ]
  }
];