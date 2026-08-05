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
- 구성(현재): 히어로 → 슬로건 배너 → **Service(다크 행리스트)** → About → Why → Portfolio(카테고리 슬라이더) → Client(로고 스트립) → Contact(다크 폼)
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
- 2026-07-23: 포트폴리오 캡션 간격 확대(슬라이더 22px·그리드 16px, 그리드 세로갭 44px/모바일 24px). 관리자 포트폴리오 각 줄에 "제목(썸네일 아래에 표시)"/"유튜브 링크·분류" 라벨 추가 + 안내문구 명확화(제목 칸 → 저장 흐름). "기본 22개 불러오기" 버튼은 DB 비었을 때만 표시되는 사양(이미 시드됨 → 숨김 정상). 캐시 v36.
- 2026-07-23 (퇴근 시점 상태): **Cloudflare 운영 전환 완료.** 운영 URL: https://jjamagency.pages.dev (GitHub main 푸시 → 자동 배포, 1~2분 소요. GitHub Pages 링크도 병행 유지). 관리자: https://jjamagency.pages.dev/admin (비밀번호는 Cloudflare에 Secret으로 저장, 클라이언트만 알고 있음). Cloudflare 설정 완료 항목: Pages 프로젝트 jjamagency(Git 연결), D1 `jjam_db`(테이블 4개 생성됨, 포트폴리오 22개 시드됨), 바인딩 DB, Secret ADMIN_PASSWORD/SESSION_SECRET. **다음 작업 후보**: 모바일 최적화 마무리(사용자 예고), 카카오톡 링크 연결(미수령), 클라이언트 로고 등록(관리자에서 가능), About 수치 확인.
- 2026-07-23: **관리자(CMS) 전면 리디자인** — 레퍼런스(SOOM CRM 대시보드) 스타일. admin.html 전체 재작성: 좌측 사이드바 내비(로고+아이콘 메뉴 9개+사이트 보기/로그아웃, ≤900px에서 상단 가로바로 변환) + 대시보드(날짜 인사말 카드/통계 4카드: 영상·분류·클라이언트·문의/최근 문의 5건/빠른 작업 4버튼) + 파트별 카드형 화면(파스텔 아이콘 칩, 레드 포인트 #be2d2f). 문의 수는 사이드바 배지로도 표시.
  - **히어로 배경 영상 교체 기능**: 관리자 히어로 탭에 Vimeo 링크 입력칸(형식 검증) → API DEFAULTS.hero.video 추가 → script.js가 링크에서 ID 추출해 .hero__video src 교체(같은 영상이면 미교체로 깜빡임 방지).
  - **드래그 순서 변경**: 포트폴리오·클라이언트 목록에 드래그 손잡이(⠿) — 손잡이 잡고 드래그(mousedown 시에만 draggable 활성화, 인풋 텍스트 선택과 충돌 방지), 놓으면 reorder API 자동 저장. ▲▼ 버튼은 제거.
  - 캐시 v37. 검증: 뷰 전환/드래그 재정렬 로직([1,2,3]→[2,3,1] 캡처)/콘솔 무오류 확인.
- 2026-07-23: 관리자 로고 교체 — 로그인 카드·사이드바의 별표 SVG를 실제 로고 파일(assets/logo.png)로 변경. 사이드바는 로고 + 레드 "ADMIN" 배지(모바일에선 배지 숨김, 로고 축소).
- 2026-07-24: 관리자 레이아웃 정렬 수정 — .mn이 margin-left:236px(사이드바) + max-width만 있고 margin:auto가 없어 넓은 화면에서 콘텐츠가 좌측으로 쏠려 "가운데정렬 안됨" 상태였음. `.mn > *{max-width:1044px;margin-left/right:auto}`로 변경(사이드바 236 + 콘텐츠 1044 = 1280 기준, 사이드바 오른쪽 영역에서 가운데 정렬). 헤더·모든 뷰가 동일 폭·동일 좌측선으로 정렬됨.
- 2026-07-24: **기획안(제이쨈 에이전시 홈페이지 기획안-1.docx) 검토 → 리디자인 목업 이미지 제작(구현 보류).** 실제 사이트 미반영. 헤드리스 Chrome(force-device-scale-factor 2)으로 9개 섹션을 실제 style.css 재사용해 개별 PNG 렌더 후 클라이언트에 전달. **클라이언트 확정 방향(구현 대기, 메모리 jjam-redesign-plan에도 기록)**: ①섹션 순서를 기획안 순서로 변경(히어로→슬로건배너→서비스→About→Why→Process→포트폴리오(+Partners통합)→Contact→최종CTA) — 현재 About이 서비스 위 → 서비스 먼저로 이동 ②문의 수신 이메일 ej74321@hanmail.net → **jjamagency@gmail.com**(푸터+문의폼 mailto+CMS footer.email 기본값) ③신규 3섹션 추가(슬로건배너 NEW/TRENDY/CREATIVE, PROCESS 6단계, 최종 CTA). 섹션별 수정: HERO 헤드라인 "Premium Content Creator Company"+서브"브랜드의 성장을 만드는 콘텐츠 파트너"+자막 왼쪽하단+무료상담 부활 / SERVICES 설명문+세부항목 태그(5·4·4·4) / WHY 3→6개+태그라인 / PORTFOLIO 부제"결과로 증명하는 콘텐츠"+정식제목 캡션+3카테고리 재배치 / CONTACT 해결책박스 / 푸터카피 "콘텐츠가 바뀌면 당신이 바로 브랜드가 됩니다". 미결: PROCESS 아이콘 스타일, 포트폴리오 22개 정식 제목 매핑(기획안 리스트). **다음 지시 "구현해줘" 오면 이 스펙대로 실제 반영.**
- 2026-08-05: **히어로 헤드라인·버튼 변경(기획안 스펙 중 HERO 일부 선반영).** 헤드라인 "Mastering Premium / Content Production" → **"Premium Content / Creator Company"**(포인트 레드 단어 Premium 유지), 서브카피 → **"브랜드의 성장을 만드는 콘텐츠 파트너"**. 버튼 "스튜디오 소개(#about)/문의하기(#contact)" → **"무료 상담 신청"(#contact, 레드) + "카톡문의"(카카오 옐로우, 말풍선 아이콘)**. 카톡 링크는 여전히 미수령이라 `href="#"` 플레이스홀더(헤더·푸터와 동일 — 링크 받으면 3곳 일괄 연결). style.css에 `.btn--kakao` 신설(`--color-kakao` 재사용, `.btn`이 이미 inline-flex라 gap/색상만). API DEFAULTS.hero의 line1/line2/desc도 동일하게 변경(DB `_overrides`가 비어 있어 하드코딩 HTML과 기본값 양쪽을 맞춰야 관리자 화면에 새 문구가 뜸). 캐시 v38. 검증: 데스크톱 1440 + 실제 390px 뷰포트(iframe 하니스) 렌더 확인 — 모바일에서 헤드라인 2줄·버튼 2개 나란히 들어감. **주의: 헤드리스 Chrome `--window-size`만으로는 모바일 미디어쿼리가 안 먹어 잘린 것처럼 보임 → iframe 하니스로 측정할 것.**
- 2026-08-05: 히어로 카피 **좌측 정렬 + 중앙보다 살짝 아래 배치**(v39), 헤드라인 **크기 축소**(clamp 최대 5.4rem → 4.7rem, v40). ⚠️ **핵심 함정**: `.hero`가 column flex라 `.container`의 `margin:0 auto`(교차축 auto 마진)가 stretch를 꺼버려서, `.hero__content`가 텍스트 폭(1440 기준 904px)으로 shrink-wrap 된 채 가운데 놓임 → `text-align:left`만 주면 글자가 화면 중앙쯤에서 시작해 "왼쪽 정렬이 안 된" 것처럼 보인다. **`.hero__content{width:100%}`가 해답** — 그래야 다른 섹션과 같은 좌측 기준선(1440에서 108px, 모바일 20px)에 맞음. 하단 이동은 `margin-top: clamp(40px,10svh,110px)`(SCROLL 인디케이터와 겹치지 않음).
- 2026-08-05: **슬로건 배너 섹션 신설(#slogan, 히어로 바로 다음).** 기획안의 NEW/TRENDY/CREATIVE 배너 구현. 구성: 3줄 슬로건(한글 화이트 + 영문 레드 `<em>`) → **가운데 로고(logo-white.png)** → 태그라인 "당신의 브랜딩 파트너 영상 제작사 **jjam agency 쨈 에이전시**". 배경 `--color-dark-soft`(#17171a)로 히어로(#0c0c0d)와 미묘하게 구분, 하단 보더로 흰 About 섹션과 분리. 가운데 정렬. 내비에는 추가 안 함(배너 성격). CMS 미연동(정적 마크업) — 문구 수정은 index.html 직접. 캐시 v41. 검증: 데스크톱 1440 + 실제 390px(iframe 하니스) 오버플로 없음.
  - **미리보기 팁**: 섹션만 따로 렌더할 때 임시 HTML을 만들면 ①`<meta charset="UTF-8">` 필수(없으면 한글 깨짐) ②`.reveal{opacity:1!important;transform:none!important}` 오버라이드 필요(script.js 없이는 opacity:0이라 안 보임). 임시 파일은 렌더 후 반드시 삭제(커밋 오염 방지).
- 2026-08-05: 슬로건 배너 표기 수정(트랜디 → **트렌디**, 표준 표기). 이어서 "디자인 요소를 넣고 싶다"는 요청에 **시안 4종을 실제 CSS로 렌더해 제시**(A 에디토리얼 넘버링 / B 흐르는 레드 마퀴 / C 3열 아이콘 / D 고스트 대형 타이포 배경) → **클라이언트가 C 선택, 적용 완료(v42)**. 구성: `.slogan__grid` 3열 + 세로 구분선(`border-left`, 마지막 칸만 `border-right`), 각 칸에 레드 라인 아이콘(반짝임/상승그래프/전구 인라인 SVG) + 영문(900) + 한글(회색). ≤640px에서 **1열 스택 + 구분선 세로→가로 전환**(max-width 330px). 미채택 시안 A/B/D의 CSS는 남기지 않음(필요하면 재작성).
- 2026-08-05: **SERVICE 섹션을 3번째로 이동 + 내용 확장 리디자인(v43).** 섹션 순서 히어로→슬로건→**서비스**→About→Why→…(내비/모바일메뉴 순서도 Service를 About 앞으로). 헤드에 설명 문구 `.services__intro` 추가("브랜드에 필요한 콘텐츠는 모두 다릅니다 / 쨈 에이전시는 고객의 목표와 예산에 맞춰…"). 각 행 구조를 `title|desc|icon` 3단 → **`[아이콘+제목] | [설명+세부항목 칩]` 2단**(`.svc-row__head` / `.svc-row__body` / `.svc-row__items`)으로 재편, 세부항목은 라운드 칩(5·4·4·4개), 행 호버 시 칩 테두리가 레드로. 열비 `1fr 1.25fr` — 0.85fr이면 "유튜브 크리에이터 교육"이 두 줄로 깨짐. ≤760px 1열 스택(기존 grid-template-areas 규칙은 새 구조와 안 맞아 제거).
  - **CMS 동기화 필수 3곳**(하나라도 빠지면 관리자 저장 시 화면이 깨짐): ①`functions/api/[[path]].js` DEFAULTS.services에 `items: []` ②`script.js` applyContent 서비스 재렌더에 칩 마크업 ③`admin.html` renderSvc/collectSvc/addSvc에 items 입력칸(줄바꿈 구분 → 배열 변환). 현재 DB `_overrides`는 비어 있어 하드코딩 HTML이 표시됨.
- 2026-08-05: **SERVICE 섹션 재리디자인(v44) — "알약 칩 디자인 별로다, 싹 갈아엎어라" 피드백.** 새 시안 4종 렌더 제시(A 넘버+대시 2열리스트 / B 2×2 카드 / C 아코디언 / D 미니멀 인라인 `·` 연결) → **A 채택.** 변경: ①`services__layout` 2단 그리드 **폐기**(헤드 상단 + 행 풀와이드) ②행 = `grid-template-areas:"num title body icon"`, 고스트 넘버(`rgba(255,255,255,.11)` → 호버 시 레드 .55) ③세부항목은 **레드 대시 마커 + `columns:2`** — 칩과 달리 항목 수 편차(5·4·4·4)를 흡수하고 세로 길이가 고름 ④아이콘은 우측 끝 은은하게(호버 시 레드). 반응형: ≤1080 아이콘 숨김·제목열 240px / ≤760 `"num title" / "body body"` / ≤640 항목 1열. **script.js 재렌더도 넘버 포함 동일 구조로 맞춰야 함**(안 맞추면 관리자 저장 시 넘버·그리드 영역이 사라져 레이아웃 붕괴).
  - **시안 제시 워크플로**(반복 유용): 서비스 데이터를 파이썬 dict로 두고 변형별 CSS만 갈아끼운 임시 HTML 4개 생성 → 헤드리스 렌더 → `SendUserFile`로 전달 → 채택안만 실제 파일에 반영, 나머지 임시 파일 삭제.
- 2026-08-05: **About 섹션 문구 교체 + 섹션 라벨을 로고로(v45).** "— About JJAM Agency" 텍스트 eyebrow → `assets/logo.png`(About은 화이트 배경이라 화이트 버전이 아닌 **원본색 logo.png**), `.about__logo{height:44px}`. 본문 3개 문단을 클라이언트 전달 문구로 교체(2번째 "기획, 제작 노하우 … 제작, 지원해 드립니다", 3번째는 "여러분의 브랜드 홍보를 위해…"로 시작하도록 확장). API DEFAULTS.about.body도 동일하게 동기화. 클라이언트 원문의 오타는 다듬어 반영: "작가들 이끌어가는"→"작가들이", "콘텐츠를. 비롯하여"→"콘텐츠를 비롯하여", "기업에 스토리"→"기업의 스토리", "영상등"→"영상 등".
- 2026-08-05: **WHY JJAM 3개 → 6개 + 태그라인(v46).** 제목 아래 `.why__tag` "전문성은 쉽게, 정보는 정확하게, 콘텐츠는 흥미롭게." 추가. Point 01~06(의료·병원 전문 / 방송국 출신 전문성 / ONE-STOP 책임 PD / 고객 맞춤형 제작 / 합리적인 비용 / 빠른 소통). 그리드 3열×2행(`max-width:1100px`), `.nmany`(5개 이상)도 minmax 240→280px·max-width 1100으로 조정해 6개일 때 3열이 되도록. **항목별 사진 슬롯 신설**: `.why-item__img`(4:3 `object-fit:cover`, 라운드 12px, 제목 위) + API `img:""` 필드 + script.js 조건부 렌더 + 관리자 "사진 주소" 입력칸 → **클라이언트가 사진을 주면 관리자에서 바로 넣을 수 있음(현재는 전부 빈 값이라 사진 없이 표시)**. 클라이언트 원문 오타 수정: "ONESTOP"→"ONE-STOP", "예산이 맞춰"→"예산에 맞춰", 컨텐츠→콘텐츠(섹션 내 표기 통일).
- 2026-08-05: **WHY JJAM 6칸에 라인아트 일러스트 추가(v47).** "사진이 하나씩 들어갔으면" 요청 → 쓸 수 있는 사진이 없어(assets에 로고·CEO영상뿐, 스톡은 라이선스 문제) 선택지 4개 제시 → **클라이언트가 "사진 대신 일러스트" 선택.** 각 항목에 인라인 SVG(viewBox 160×120, 다크 `#2a2a2e` 라인 + 레드 `#be2d2f` 포인트, stroke-width 3): ①모니터+심전도+십자 ②방송카메라+삼각대 ③담당자+체크배지 ④슬레이트+반짝임 ⑤가격표+₩ ⑥말풍선 2개+번개. `.why-item__ill` = 4:3 오프화이트(#f4f3ef) 패널·라운드 12px, 호버 시 배경 톤 변화. **`.why-item__img`(사진) 슬롯은 그대로 유지** — 관리자에서 사진 주소를 넣으면 그 항목만 사진으로 대체됨. script.js 재렌더는 DOM에서 기존 일러스트 outerHTML을 캡처해 재사용(서비스 아이콘과 동일 패턴)하므로 관리자에서 문구만 고쳐도 일러스트가 유지됨.
- 2026-08-05: **WHY JJAM 일러스트 제거(v48)** — "일러스트 너무 별로다" 피드백. 인라인 SVG 6개 + `.why-item__ill` CSS + script.js 일러스트 재사용 로직 전부 삭제, **텍스트(룰+레드넘버+제목+설명)만 남긴 원래 스타일로 복귀.** `.why-item__img` 사진 슬롯과 관리자 "사진 주소" 입력칸은 유지 — 실제 사진이 준비되면 그대로 쓰면 됨. **교훈: 이 클라이언트는 WHY 섹션에 그래픽 요소를 넣는 것 자체를 선호하지 않음(칩·일러스트 연속 반려). 여백과 타이포만으로 가는 미니멀 방향이 맞음.**
- 2026-08-05: **WHY JJAM: 박스는 유지, 일러스트만 제거(v49).** 앞선 v48에서 박스까지 통째로 없앴다가 "박스는 유지하고 안에 일러스트만 빼줘" 요청 → `.why-item__ph`(4:3 오프화이트 #f4f3ef 빈 박스, 라운드 12px, 호버 시 #efeee9) 신설해 6칸에 삽입. **사진 자리(플레이스홀더) 역할** — 관리자에서 사진 주소를 넣으면 그 칸만 `.why-item__img`로 대체(script.js도 동일 분기). 최종 구성: [빈 박스] → 레드 넘버 → 제목 → 설명.
- 2026-08-05: **PROCESS 섹션 신설(#process, v50).** 위치: WHY 다음 · 포트폴리오 앞(기획안 순서). 앞뒤가 화이트/오프화이트라 **다크 배경**으로 리듬을 줌. 구성: giant-title PROCESS + 부제 "체계적인 제작 프로세스" + 설명 + 6단계(문의및상담/브랜드분석/콘텐츠기획/촬영및제작/검수및수정/업로드및홍보). 각 단계 = 원형 아이콘 칩(68px, 레드 라인아이콘) + STEP 0N 레드 라벨 + 제목, **호버 시 칩이 레드 반전**. 단계 사이 연결선은 `.step::before{left:50%;width:100%}`(아이콘 중심끼리 이음) — 반응형 6열→3열(≤1080)→2열(≤640)에서 각 행 끝만 `nth-child(3n)`/`nth-child(2n)`로 선을 숨김(2열 규칙에서 `.step::before{display:block}`로 3열 규칙 초기화 필요). 내비에는 미추가(6개 유지). CMS 미연동(정적 마크업).
  - ⚠️ **Cloudflare 배포가 약 15분간 멈춘 사례**: 푸시·원격 HEAD는 정상인데 pages.dev가 계속 이전 버전(v49)을 서빙. **GitHub Pages에는 v50이 정상 배포된 것으로 코드 이상이 아님을 확인**(진단법: 배포된 `/CLAUDE.md` 꼬리를 보면 어느 커밋까지 반영됐는지 알 수 있음). **빈 커밋(`git commit --allow-empty`) 푸시로 재트리거하니 1분 내 반영됨.** 다음에 같은 증상이면 이 순서로 확인할 것.
- 2026-08-05: **PROCESS를 세로 타임라인으로 변경 + 단계별 설명 추가(v51).** "왼쪽에 스텝, 오른쪽에 설명" 요청 → 가로 6열 → **세로 6행**(`.process__list` / `.pstep`, `grid-template-columns: 330px 1fr`). 왼쪽 = 원형 아이콘 칩 + STEP 0N + 제목, 오른쪽 = 설명. 연결선은 가로 → **세로**(`.pstep::before{left:33px;top:0;bottom:0}`, 첫 항목은 `top:50%`·마지막은 `bottom:50%`로 절반만 그려 위아래로 삐져나오지 않게). 반응형: ≤1080 왼쪽열 280px, ≤640 1단 + 설명 `padding-left:72px`(제목과 좌측선 맞춤)·연결선 `left:27px`. **⚠️ 단계별 설명 6개는 클라이언트가 준 게 아니라 내가 쓴 초안** — 확인 후 교체 필요(CLAUDE.md 미확정 정보에도 해당).
- 2026-08-05: **OUR CLIENTS → OUR PARTNERS + 실제 로고 44개 적용(v52).** 클라이언트가 zip(로고 45개, 크기·비율 제각각, 다수는 스크린샷)을 전달 → **파이썬으로 일괄 정규화**: 알파를 흰색에 합성 → 흰 여백 트림(비白 픽셀 bbox) → 안전영역 396×148에 맞춰 축소 → **480×240(2:1) 흰 캔버스 가운데 배치** → `assets/partners/partner-01~44.png`(총 ~900KB). 부산우리들병원이 상하형/가로형 2개라 가로형만 사용. **표시 순서는 인지도순으로 재배열**(신한라이프·메리츠화재·Amway·경남제약·한풍제약… 앞 3줄). 타일 = 흰 배경 + 라이트 보더 + 호버 리프트, `aspect-ratio:2/1`이라 이미지 규격과 정확히 일치.
  - **3줄 접기/더보기**: CSS `nth-child`로 열 수별 노출 개수 제어(5열 `n+16` / 3열 `n+10` / 2열 `n+7` 숨김) + `.client__grid.is-expanded .client__logo{display:block}`로 해제. 특이점: `.client__grid.is-expanded .client__logo`(0,3,0)가 `.client__logo:nth-child(...)`(0,2,0)보다 특이도가 높아 미디어쿼리보다 뒤가 아니어도 이김. JS `initClientMore()`가 라벨 전환(더보기 ▾ / 접기 ▴)·리사이즈 재계산 담당, `applyClients()` 끝에서도 재호출(CMS가 목록을 갈아끼운 뒤 대비). 검증: 15개→44개→15개 토글 및 라벨 전환 확인.
  - 내비 라벨 Client → **Partners**, 섹션 id `#client` → `#partners`(script.js 스크롤스파이 배열도 갱신). CSS 클래스는 `.client__*` 유지(=CMS `applyClients` 호환).
  - ⚠️ 남은 이슈: **Wellver 로고만 원본이 크림색 배경 박스**라 흰 타일 위에서 사각형이 보임(원본 파일 특성). 투명 배경 파일 받으면 교체 필요.
- 2026-08-05: **CONTACT 섹션 문구 교체 + 해결책 박스(v53).** 타이틀 `LET'S / CONTACT` → **`Contact / Us`**(giant-title 규칙상 두 번째 span이 레드라 "US"가 레드). `.contact__head` 래퍼 신설 → 부제 `.contact__sub`("프로젝트를 소개해 주세요.") + 설명 `.contact__intro`(2줄, `br.br-desktop`). 왼쪽 고민 영역: 기존 eyebrow `.concerns__label` **제거**(헤드라인에 흡수), 헤드라인/서브카피/고민 5개를 클라이언트 문구로 교체. **`.solution` 해결책 박스 신설** — 레드 틴트 배경(`rgba(190,45,47,.12)`) + 레드 보더 + 체크 아이콘, 고민 리스트(레드 ✕) 바로 아래에 배치해 "문제 → 해답" 흐름을 만듦. CONTACT 문구는 **CMS 미연동**(DEFAULTS에 contact 키 없음)이라 index.html 직접 수정.
- 2026-08-05: **최종 CTA 섹션 신설 + 푸터 개편 + 문의 수신 이메일 변경(v54).** ①`.cta` 섹션(컨택트 다음·푸터 앞): 다크 배경 + 상단 레드 라디얼 글로우, "당신의 브랜딩 파트너 영상 제작사" + `jjam agency 쨈 에이전시`(뒤쪽 레드) + 버튼 2개(무료 상담 신청하기→#contact, 포트폴리오 보기→#portfolio). ②푸터: `.footer__slogan` "콘텐츠가 바뀌면 / 당신이 바로 브랜드가 됩니다" 추가, 회사명 `jjam agency 쨈 에이전시`, 주소 전체 표기, 라벨 `Tel.`/`E-mail.`(라벨이 길어져 `.footer__list li span{min-width:58px}`로 확대). ③**이메일 `ej74321@hanmail.net` → `jjamagency@gmail.com`을 3곳 모두 반영**: 푸터 링크(index.html) + 문의폼 mailto 폴백(script.js `CONTACT_EMAIL`) + API `DEFAULTS.footer.email`. 기획안 스펙의 미구현 항목이 이것으로 모두 소진됨.
  - ⚠️ **Cloudflare 빌드 실패 진단법(중요)**: pages.dev가 옛 버전을 계속 서빙할 때, **GitHub 체크런으로 빌드 성패를 직접 확인할 수 있다** — `gh api repos/lsm0225/260723_CRM_jjam-studio/commits/<sha>/check-runs -q '.check_runs[]|select(.name=="Cloudflare Pages")|"\(.status) \(.conclusion)"'`. 이번엔 v54 커밋이 `in_progress`로 멈추고 재트리거 커밋이 `completed failure`였음(빌드 횟수 34/500이라 한도 무관, 동시빌드 추측도 오진이었음). **빈 커밋으로 한 번 더 푸시하니 성공** — 즉 Cloudflare 측 일시적 빌드 실패였고, 재시도가 정답. 실패 시 로그 링크는 체크런 `output.summary`에 들어 있다.
- 2026-08-05: **해결책 박스·대표 약력 인용문 박스 디자인 변경(v55).** "이 두 가지 박스 디자인 변경" 요청 → 3안 렌더 제시(A 상단 레드 룰 / B 왼쪽 레드 바·칠 없음 / C 인용부호·박스 제거) → **A 채택.** `.solution`: 레드 틴트 배경 + 테두리 + 라운드 **전부 제거** → `border-top: 2px solid var(--color-accent)` + `padding-top:22px`(체크 아이콘은 유지, `margin-top:2px`로 첫 줄 baseline 맞춤). `.modal__quote`: 회색 면(`--color-bg`) + 좌측 3px 바 + 라운드 제거 → 동일하게 상단 레드 룰. **의도**: 고민 리스트의 얇은 구분선과 이어지면서 해결책만 굵은 레드 룰로 강조되는 흐름. **이 클라이언트는 면으로 채운 박스를 일관되게 싫어함**(칩·일러스트 패널·틴트 박스 연속 반려) — 선과 여백, 타이포로 위계를 만드는 방향이 정답.
