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
- **수정·배포가 끝나면 내부 브라우저 패널에 띄우지 말고, `.claude/open-or-refresh.sh`를 실행해 외부 브라우저로 보여준다.** 이 스크립트는 이미 열린 탭이 있으면 새 창을 띄우지 않고 새로고침하고, 없으면 새로 연다. (클라이언트 요청, 2026-07-23)
- **style.css / script.js를 수정하면 index.html의 `?v=` 버전 숫자를 함께 올린다.** (GitHub Pages가 CSS/JS를 10분 캐시하므로, 버전을 안 올리면 새 HTML + 옛 CSS 조합으로 화면이 깨져 보일 수 있음)

## 디자인 방향

- 레퍼런스: https://www.sockorea.com
- 다크 풀스크린 히어로 + 초대형 영문 타이포그래피
- 섹션 헤드라인: 두 줄 대문자 대형 타이포 (WHO WE ARE / OUR SERVICES / LET'S CONTACT)
- 포인트 컬러: 크림슨 레드 (#be2d2f, 로고 별 색), 폰트: Pretendard
- **크림(#fffdea) 키 컬러는 폐기됨 — 절대 재사용 금지. 라이트 배경은 중립 오프화이트(#f5f4f1).** (2026-07-23 클라이언트 지시)
- 구성(현재): 히어로 → About → Service(다크 행리스트) → Portfolio(카테고리 슬라이더) → Client(로고 스트립) → Contact(다크 폼)
- **포트폴리오 = 카테고리 필터 + 가로 블러 슬라이더.** 데이터는 script.js의 `PF_VIDEOS` 배열(id/제목/분야) — **영상 추가 = 이 배열에 한 줄**. (구 mosaic용 gen-portfolio.py/portfolio-videos.txt는 폐기.) 스크롤 진입 시 최초 1회 PORTFOLIO 글씨 써짐→0.5초 뒤 우→가운데 진입(글씨 페이드아웃), 탭 클릭은 슬라이드만 교체, 가운데 슬라이드 재생버튼 클릭 시 인라인 재생. slider.html은 프로토타입(참고용).

## 확정 정보 (2026-07-23 클라이언트 제공)
- 회사: 제이잼 에이전시 (JJAM AGENCY) · 대표 이은정
- 주소: 서울 강남구 압구정로134 타워빌딩 302호
- 전화: 010-3370-1432 · 이메일: ej74321@hanmail.net (문의폼 mailto 수신처)
- 카카오톡 링크: 아직 미정(헤더/푸터/문의버튼 href="#" 플레이스홀더 — 받으면 일괄 연결)
- 문의폼: 파일첨부 제거 → "레퍼런스 사이트" URL 입력칸으로 대체. 개인정보 동의 박스는 4개 항목 + 내부 스크롤(max-height 150px). 보유기간 "3년"은 템플릿값(클라이언트 조정 가능).

## 미확정 정보 (클라이언트 확인 필요)

- About 수치 (경력 10+, 프로젝트 120+, 만족도 98%)는 임의값
- 문의 폼은 현재 mailto 방식 — 추후 폼 서비스(Formspree 등) 연결 가능

## 작업 기록

- 2026-07-23: 최초 제작. 모던&미니멀 시안 제작 후 레퍼런스(sockorea.com) 반영하여 다크&볼드 스타일로 리디자인. 히어로/About/Services/Contact/푸터 완성. GitHub 저장소 생성 및 GitHub Pages 배포.
- 2026-07-23: 히어로 배경에 Vimeo 영상(1207998411) 무음 자동재생 적용. 어두운 오버레이로 타이포 가독성 확보.
- 2026-07-23: 메뉴를 JJAM / SERVICE / ABOUT / PORTFOLIO / CONTACT 구성으로 변경(섹션 순서도 동일하게 재배치). ABOUT 섹션을 클라이언트 시안대로 리뉴얼 — "방송 현업의 깊이로, 새로운 문화를 만듭니다" 카피 + jjam agency 소개문 + CEO 이은정 프로필(사진 대신 영상 assets/ceo-profile.mp4 자동재생) + WHY JJAM? 3항목. PORTFOLIO 섹션 신설(현재 Vimeo 영상 1건, 추가 콘텐츠 필요). 회사 정체성이 영상 제작사(jjam agency)로 확인됨 — SERVICES 섹션 내용(브랜딩/그래픽 중심)은 영상 제작 중심으로 개편 필요할 수 있음(클라이언트 확인 대기).
- 2026-07-23: WHY JJAM? 섹션을 구분선 리스트에서 카드 스타일로 리디자인 — 라운드 카드 + 레드 아이콘 칩(별/체크/카메라 SVG) + 고스트 넘버 + 호버 리프트 효과.
- 2026-07-23: 헤더 우측에 무료 상담신청(#contact 연결) + 카카오톡 상담(옐로우, href="#" — **링크 추후 클라이언트가 전달 예정**) 버튼 추가, 모바일 메뉴에도 동일 버튼. 키 컬러를 크림(#fffdea)으로 변경(라이트 섹션 배경/카드). 히어로 Vimeo 영상 페이드인 적용 — 로딩 중 블랙 화면 대신 다크 그라디언트가 보이고 재생 시작 시 1.4초 페이드인(Vimeo postMessage play 이벤트 + 로드 2초 폴백).
- 2026-07-23: 로고 적용 — 클라이언트 제공 이미지(jjam agency 워드마크 + 레드 별) 누끼 처리 후 assets/logo.png(원본색)·logo-white.png(다크 배경용 화이트) 생성, 헤더/푸터에 화이트 버전 적용. 파비콘을 레드 별로 교체. 사이트 포인트 레드를 로고 별 색상(#be2d2f 크림슨)으로 통일(기존 #e8362b에서 변경) — 로고와 사이트 색 부조화 문제 해결.
- 2026-07-23: SERVICE 섹션을 클라이언트 시안 내용으로 전면 교체 — 4개 서비스(영상 컨텐츠 제작 / 유튜브 채널 운영 / 유튜브 크리에이터 교육 / AI 영상 스튜디오). SERVICES 개편 필요 이슈는 이것으로 해결됨.
- 2026-07-23: 카드형 SERVICE 디자인이 별로라는 피드백 → 레퍼런스(다크 배경 + 행 리스트) 방식으로 리디자인. 좌측 스티키 OUR SERVICES 타이틀 + 우측 4개 행(제목/영문 라벨 + 설명 + 아이콘). body에 word-break: keep-all 적용(한국어 줄바꿈). → 이후 타이틀 스티키(따라오는) 효과는 클라이언트 요청으로 제거(position: static).
- 2026-07-23: 대표 약력 모달 추가 — ABOUT CEO 카드에 "대표 약력 보기 +" 버튼, 클릭 시 모달(연출: MBC 요리보고 세계보고/찾아라 맛있는 TV/똑똑 키즈스쿨/공감 특별한 세상, MBN 맛있는 여행, MBC에브리원 인생은 항구다, EBS 세계테마기행/스페셜 프로젝트 외 다수 · 강의: 한국방송예술교육진흥원 TV연출/TV다큐멘터리/VJ제작실습 · 20년 경력 인용문). ESC/배경 클릭으로 닫힘.
- 2026-07-23: CONTACT 섹션을 시안 반영해 전면 교체 — 크림 배경 + 화이트 카드 2단: 좌측 고민 카드(아직도 혼자 고민 중이신가요? + YOUR CONCERNS 5개 + 연락처), 우측 문의 폼(업체명/이름*/연락처*/이메일* + 문의 유형 칩 5종 + 파일첨부(50MB 제한 안내, mailto라 실제 첨부는 메일 앱에서) + 문의 내용 + 개인정보 동의 박스/체크 + 옐로우 "무료 콘텐츠 전략 받기 →" 버튼). 유효성 검사 포함, mailto 방식 유지.
- 2026-07-23: SERVICE 행 설명의 강제 줄바꿈(br) 제거 + 강조 문구 white-space: nowrap — 어색한 줄바꿈 수정. WHY JJAM?을 카드 스타일에서 미니멀 에디토리얼(블랙 상단 룰 + 레드 넘버 + 타이틀/설명, 호버 시 룰 레드)로 재리디자인.
- 2026-07-23: CONTACT 섹션을 다시 다크(검정) 배경으로 복원 + 화이트 카드 박스 제거(박스 디자인 별로라는 피드백). 고민 리스트는 언더라인 행 + 레드 ✕, 폼은 다크 인풋/라운드 칩, 제출 버튼은 옐로우 유지. 콘텐츠는 시안 그대로.
- 2026-07-23: 콘텐츠 컨테이너 최대 폭을 1180px → 1280px로 확대(업계 표준 상단, Tailwind max-w-7xl 기준). 큰 모니터에서 히어로/서비스/포트폴리오가 더 시원하게 보이도록.
- 2026-07-23: **포트폴리오를 유튜브 영상 갤러리로 전면 교체** — 16:9 썸네일 그리드(3열, ≤980 2열, ≤640 1열) + 각 타일 블러 썸네일 위에 영상 제목 오버레이(호버 시 블러 해제·재생버튼). 클릭 시 유튜브 라이트박스(youtube-nocookie, ESC/배경 닫힘). 처음 9개 노출 + "더 보기(+13)"로 나머지 13개 펼침. 총 22개. 제목은 유튜브 oEmbed로 자동 조회(끝 해시태그 제거), 비공개 2개(miUYlT1kOpA·S4AM6T1zqoc)는 임시 제목 "제이잼 포트폴리오".
  - **자동화**: `.claude/portfolio-videos.txt`에 URL 한 줄씩(형식 `URL` 또는 `URL | 직접제목`) → `python3 .claude/gen-portfolio.py` 실행하면 제목 자동 조회 후 그리드 재생성. 썸네일은 영상 ID에서 자동. 정적 사이트라 실시간 자동갱신은 아니고, "URL 추가 → 스크립트 → 배포" 흐름.
  - 하단 빈공간 제거: 타일 크기를 [big(2×2), 작은, 작은, wide(2×1)] 4칸 유닛 = 4열 2행 정확히 채우는 패턴으로(sizes_for), 노출 12개=3유닛 → 하단 평평. 포트폴리오 그리드만 **풀블리드(좌우여백 없이 100vw)**, 타일 radius 0, 행높이 calc로 항상 16:9.
  - "OUR CLIENTS" 헤더: 가운데정렬 → 다른 섹션처럼 좌측정렬로 통일.
  - "대표 약력 보기" 버튼: 텍스트링크 → 레드 pill + 라이트 스윕(3s 주기) 애니메이션(눈에 띄게).
  - 새로고침 시 항상 히어로에서 시작(history.scrollRestoration=manual + load에서 scrollTo top). 로고 클릭 시 새로고침(해시 제거 후 reload).
  - **레이아웃**: 균일 그리드 → **크기 제각각 모자이크**로 변경(클라이언트 요청). CSS grid 4열 + grid-auto-rows 170px + dense flow, 타일 크기변형 big(2×2)/wide(2×1)/tall(1×2)/기본(1×1), 크기는 index%9 패턴(gen-portfolio.py의 SIZE_BY_MOD). 작은/큰 타일 모두 자연 16:9라 왜곡 없음. **호버 시 썸네일 블러+어둡게 되며 제목 텍스트 표시**(평소엔 선명, 제목 숨김). 반응형 4→3(≤980)→2열 균일(≤640).
- 2026-07-23: 섹션 순서 재배치 → hero → about → service → portfolio → client(신규) → contact. 내비도 About/Service/Portfolio/Client/Contact로 변경(모바일 메뉴 포함). SERVICE는 유지(About 다음). **Client 섹션 신규**: 화이트 배경 + 5열×2줄 로고 플레이스홀더 10개(#client), 실제 클라이언트 로고 없어 "LOGO" 텍스트 타일로 대체 — **로고 받으면 .client__logo 내부를 img로 교체**. 반응형 5→3(≤980)→2(≤640)열.
- 2026-07-23: **관리자(CMS) 백엔드 구축 — Cloudflare Pages + Functions + D1.**
  - `schema.sql`: D1 테이블 4개(content 키-값 / portfolio / clients / submissions).
  - `functions/api/[[path]].js`: 캐치올 API — POST /login(ADMIN_PASSWORD → HMAC 토큰, SESSION_SECRET 서명, 12시간), GET/PUT /content(코드에 DEFAULTS 내장, DB 값이 있으면 덮어씀 + `_overrides`로 "실제 저장된 키"만 알려줌), portfolio CRUD + reorder(batch) + seed(기본 22개), clients CRUD + reorder, POST /contact(공개) + GET/DELETE(관리자). CORS 허용.
  - `admin.html`: 로그인 + 8개 탭(히어로/소개/서비스/WHY JJAM/포트폴리오/클라이언트/푸터/문의내역). 포트폴리오: 유튜브 링크 붙여넣으면 영상 ID 자동 추출, 제목 칸(영상 아래 가운데 표시), 분류 자동 추가(datalist), ▲▼ 순서 변경 즉시 저장, 비어있으면 "기본 22개 불러오기" 시드 버튼. WHY JJAM 04번 추가 시 사이트 레이아웃 자동(2×2: `.why__grid.n4`, 5개 이상: auto-fit `.nmany`). 토큰은 localStorage(`jjam_token`), 401 시 자동 로그아웃.
  - `script.js`: 포트폴리오 IIFE → `initPortfolioSlider(videos, catNames)` 함수화. `bootCMS()`가 /api/content·portfolio·clients 3개를 병렬 fetch(4초 타임아웃) → 성공 시 관리자 저장값 반영, 실패/정적 호스팅(GitHub Pages)이면 기존 하드코딩 콘텐츠 그대로(완전 폴백). `_overrides`에 있는 섹션만 DOM 재렌더(수정 안 한 섹션은 원본 마크업·<strong>·reveal 애니메이션 유지). 재렌더된 요소는 revealObserver에 재등록. Contact 폼: /api/contact POST 우선(성공 시 "문의가 접수되었습니다") → 실패 시 기존 mailto 폴백(수신 메일도 CMS 푸터 이메일 반영).
  - `ADMIN_SETUP.md`: Cloudflare 1회 설정 가이드(Pages Git 연결·빌드설정 없음/비움, D1 `jjam-db` 생성+schema 실행, 바인딩 변수명 `DB`, ADMIN_PASSWORD/SESSION_SECRET 시크릿, 재배포). **주의: Workers("npx wrangler deploy" 화면)가 아니라 Pages로 연결해야 함** — 사용자가 Workers 흐름에 들어갔다가 뒤로 나옴.
  - style.css: why__grid n4/nmany 규칙, client__logo img/client__name 규칙 추가. 캐시 v34.
  - 관리자 주소: `https://프로젝트명.pages.dev/admin.html` (GitHub Pages에서는 API가 없어 admin 동작 안 함 — Cloudflare 전용).
- 2026-07-23: 포트폴리오 제목 표시를 썸네일 오버레이 → **썸네일 아래 가운데 캡션(유튜브 스타일)**으로 변경 — 슬라이더(.pf-smedia 미디어 박스 + .pf-stit 캡션)와 그리드(.pf-gthumb + .pf-gtit) 모두. 재생 iframe은 미디어 박스 안에만 삽입되어 재생 중에도 제목 유지. 제목 없으면 :empty로 숨김. 화살표 위치 캡션만큼 보정(top calc(50% - 32px)), 그리드 세로 간격 30px. 제목 내용은 관리자 포트폴리오 탭 "제목" 칸에서 수정. 캐시 v35. (Cloudflare 연동 완료: jjamagency.pages.dev, D1 jjam_db + ADMIN_PASSWORD/SESSION_SECRET 설정됨, 관리자 /admin)
