# 관리자(CMS) 설정 가이드 — Cloudflare Pages

사이트 + 관리자 화면 + DB를 Cloudflare에서 돌리기 위한 1회성 설정입니다.
(GitHub `main`에 푸시하면 자동 배포됩니다)

> ⚠️ **Workers가 아니라 Pages로 만들어야 합니다.**
> "Set up your application / npx wrangler deploy" 화면이 보이면 그건 Workers 흐름이니 뒤로 나가세요.

## 1. Pages 프로젝트 만들기
1. Cloudflare 대시보드 → 좌측 **Workers 및 Pages** → **Pages** 탭
2. **"Git에 연결"** (Connect to Git) → GitHub 인증 → `lsm0225/260723_CRM_jjam-studio` 선택
3. 빌드 설정:
   - 프레임워크 사전 설정: **없음(None)**
   - 빌드 명령: **비워두기**
   - 빌드 출력 디렉터리: **비워두기** (또는 `/`)
4. **저장 및 배포** → 완료되면 `https://프로젝트명.pages.dev` 에서 사이트 확인

## 2. D1 데이터베이스 만들기
1. 좌측 **저장 및 데이터베이스 → D1 SQL 데이터베이스** → **데이터베이스 생성**
2. 이름: `jjam-db`
3. 만든 DB의 **콘솔(Console)** 탭에서 `schema.sql` 파일 내용을 전체 복사해 붙여넣고 실행

## 3. Pages에 DB 연결 (바인딩)
1. Pages 프로젝트 → **설정(Settings) → 바인딩(Bindings)** → **바인딩 추가**
2. 유형: **D1 데이터베이스**, 변수 이름: `DB` (정확히 대문자 DB), 데이터베이스: `jjam-db`

## 4. 환경 변수(비밀번호) 설정
Pages 프로젝트 → **설정 → 변수 및 비밀** 에서 2개 추가 (유형: **비밀(Secret)**):

| 이름 | 값 |
|---|---|
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 (원하는 값) |
| `SESSION_SECRET` | 아무 긴 무작위 문자열 (예: 영문+숫자 40자) |

## 5. 재배포
설정(바인딩/변수)은 **다음 배포부터** 적용됩니다.
**배포(Deployments)** 탭 → 최신 배포 우측 ⋯ → **재배포(Retry/Redeploy)**

## 6. 확인
- 사이트: `https://프로젝트명.pages.dev`
- 관리자: `https://프로젝트명.pages.dev/admin.html` → 비밀번호 로그인
- 관리자 → 포트폴리오 탭 → "기본 22개 영상 불러오기" 버튼으로 초기 데이터 시드

## 관리자에서 할 수 있는 것
- 히어로 문구 / About / Our Services / WHY JJAM (04번 추가 시 레이아웃 자동) / 푸터 정보 수정
- 포트폴리오: 유튜브 링크로 추가, 제목(영상 아래 가운데 표시), 분류 추가, ▲▼ 순서 변경, 삭제
- 클라이언트 로고 추가/순서/삭제
- Contact 문의 → DB 저장 → "문의내역" 탭에서 열람
