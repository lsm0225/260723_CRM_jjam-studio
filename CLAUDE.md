# 제이잼스튜디오 기업 홈페이지

- **클라이언트**: 제이잼스튜디오 (대표 이은정)
- **프로젝트**: 1페이지 기업 홈페이지
- **저장소**: 260723_CRM_jjam-studio (github.com/lsm0225)
- **스택**: 순수 HTML / CSS / JS (빌드 없음, 정적 사이트)
- **배포**: GitHub Pages (Cloudflare Pages 연결 가능)

## 작업 규칙

- **제작/수정 작업이 끝날 때마다 이 파일의 "작업 기록"에 한 줄 추가한다.**
- **수정 후 배포 시점마다 자동으로 `git add -A && git commit && git push` 한다.** (푸시하면 GitHub Pages에 자동 반영됨)
- 커밋 메시지는 한국어로 간결하게.

## 디자인 방향

- 레퍼런스: https://www.sockorea.com
- 다크 풀스크린 히어로 + 초대형 영문 타이포그래피
- 섹션 헤드라인: 두 줄 대문자 대형 타이포 (WHO WE ARE / OUR SERVICES / LET'S CONTACT)
- 포인트 컬러: 레드 (#e8362b), 폰트: Pretendard
- 구성: 히어로 → About(WHO WE ARE) → Services(4컬럼 리스트) → Contact(다크, 문의폼)

## 미확정 정보 (클라이언트 확인 필요)

- 연락처: 이메일/전화/인스타그램 현재 플레이스홀더 (hello@jjamstudio.com / 010-0000-0000 / @jjam.studio)
- About 수치 (경력 10+, 프로젝트 120+, 만족도 98%)는 임의값
- 문의 폼은 현재 mailto 방식 — 추후 폼 서비스(Formspree 등) 연결 가능

## 작업 기록

- 2026-07-23: 최초 제작. 모던&미니멀 시안 제작 후 레퍼런스(sockorea.com) 반영하여 다크&볼드 스타일로 리디자인. 히어로/About/Services/Contact/푸터 완성. GitHub 저장소 생성 및 GitHub Pages 배포.
- 2026-07-23: 히어로 배경에 Vimeo 영상(1207998411) 무음 자동재생 적용. 어두운 오버레이로 타이포 가독성 확보.
- 2026-07-23: 메뉴를 JJAM / SERVICE / ABOUT / PORTFOLIO / CONTACT 구성으로 변경(섹션 순서도 동일하게 재배치). ABOUT 섹션을 클라이언트 시안대로 리뉴얼 — "방송 현업의 깊이로, 새로운 문화를 만듭니다" 카피 + jjam agency 소개문 + CEO 이은정 프로필(사진 대신 영상 assets/ceo-profile.mp4 자동재생) + WHY JJAM? 3항목. PORTFOLIO 섹션 신설(현재 Vimeo 영상 1건, 추가 콘텐츠 필요). 회사 정체성이 영상 제작사(jjam agency)로 확인됨 — SERVICES 섹션 내용(브랜딩/그래픽 중심)은 영상 제작 중심으로 개편 필요할 수 있음(클라이언트 확인 대기).
- 2026-07-23: WHY JJAM? 섹션을 구분선 리스트에서 카드 스타일로 리디자인 — 라운드 카드 + 레드 아이콘 칩(별/체크/카메라 SVG) + 고스트 넘버 + 호버 리프트 효과.
