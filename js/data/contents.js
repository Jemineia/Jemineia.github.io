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

    images:[
      {
        src : "images/contents/2x2Love.png",
        fit : "background"
      },
      {
        src : "images/contents/2x2Love2.png",
        fit : "background"
      }
    ]
  },
  {
    title : "당신과 나의 존재불명",
    startDate: "2026-05-10",
    endDate: "2026-05-12",
    images : [
        {
          src: "images/contents/noexistence.png",
          fit : "background"
        }
    ]
  },
  {
    title : "초 카구야 공주!",
    startDate: "2026-07-05",
    endDate: "2026-07-06",

    images:[
      {
        src : "images/contents/kaguyahime.jpg",
        fit : "cover"
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
    title : "별이 떨어질 때 - 경서",
    startDate: "2026-09-14",
    endDate: "2026-09-14",
    images: [
      {
        src : "https://i.ytimg.com/vi/LsJ9vFGphp4/maxresdefault.jpg",
        fit : "cover"
      }
    ],

    link : "https://www.youtube.com/watch?v=LsJ9vFGphp4"
  },
  {
    title: "44교시 생존수업",
    startDate: "2026-09-20",
    endDate: "2026-09-20",

    images:[
      {
        src : "https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791143205728.jpg?t=2983086",
        fit : "cover"
      }
    ]
  }
];