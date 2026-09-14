/* ========================================
   콘텐츠 데이터
======================================== */

/*
    images:
    콘텐츠에 사용할 이미지 배열

    1줄짜리 콘텐츠
    → images[0]

    2줄짜리 콘텐츠
    → 첫 번째 줄 : images[0]
    → 두 번째 줄 : images[1]

    3줄짜리 콘텐츠
    → 첫 번째 줄 : images[0]
    → 두 번째 줄 : images[1]
    → 세 번째 줄 : images[2]

    이미지가 부족하면 해당 줄에는
    이미지 대신 콘텐츠 제목이 표시됨.
*/

const contents = [

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
        src: "images/contents/manosaba1.png",
        fit: "cover"
      },
      {
        src: "images/contents/manosaba2.png",
        fit: "cover"
      },
      {
        src: "images/contents/manosaba3.png",
        fit: "background"
      },
      {
        src: "images/contents/manosaba4.png",
        fit: "background"
      }
    ],

    link: "https://gall.dcinside.com/mgallery/board/view?id=manosaba&no=223713"
  },
  {
    title: "향기로운 꽃은 늠름하게 피어난다",
    startDate: "2026-08-15",
    endDate: "2026-08-27"
  }
];