#!/usr/bin/env python3
"""
포트폴리오 순서·제목을 파일(.claude/portfolio-order.json) 내용으로 관리자 DB에 반영한다.

사이트는 DB에 저장된 포트폴리오를 우선 사용하므로, script.js만 고쳐서는 화면이 바뀌지 않는다.
이 스크립트가 관리자 API로 로그인해서 각 영상의 제목·분류를 갱신하고 순서를 다시 매긴다.

사용법:
    python3 .claude/sync-portfolio.py
    (관리자 비밀번호를 물어본다. 입력값은 화면에 표시되지 않고 어디에도 저장되지 않는다.)

    비밀번호를 환경변수로 넘기려면:
    ADMIN_PW='비밀번호' python3 .claude/sync-portfolio.py
"""
import json
import os
import sys
import urllib.error
import urllib.request
from getpass import getpass
from pathlib import Path

BASE = "https://jjamagency.pages.dev/api"
ORDER_FILE = Path(__file__).parent / "portfolio-order.json"


def call(path, method="GET", body=None, token=None):
    req = urllib.request.Request(BASE + path, method=method)
    req.add_header("content-type", "application/json")
    # Cloudflare가 기본 파이썬 요청을 봇으로 차단(오류 1010)하므로 브라우저 UA를 사용한다
    req.add_header("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                                 "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36")
    req.add_header("accept", "application/json")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    data = json.dumps(body).encode() if body is not None else None
    try:
        with urllib.request.urlopen(req, data, timeout=20) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:200]
        raise SystemExit(f"❌ {method} {path} 실패 ({e.code}) {detail}")


def main():
    if not ORDER_FILE.exists():
        raise SystemExit(f"❌ {ORDER_FILE} 가 없습니다.")
    target = json.loads(ORDER_FILE.read_text(encoding="utf-8"))
    print(f"반영할 목록: {len(target)}개\n")

    pw = os.environ.get("ADMIN_PW") or getpass("관리자 비밀번호: ")
    token = call("/login", "POST", {"password": pw}).get("token")
    if not token:
        raise SystemExit("❌ 로그인 실패")
    print("✅ 로그인 성공\n")

    rows = call("/portfolio")
    by_vid = {r["video_id"]: r for r in rows}

    missing = [t for t in target if t[0] not in by_vid]
    if missing:
        print("⚠️ DB에 없는 영상(건너뜀):")
        for vid, title, _ in missing:
            print(f"   {vid}  {title}")
        print()

    updated = 0
    order_ids = []
    for vid, title, cat in target:
        row = by_vid.get(vid)
        if not row:
            continue
        order_ids.append(row["id"])
        if row.get("title") != title or row.get("category") != cat:
            call("/portfolio", "PUT", {
                "id": row["id"], "title": title, "video_id": vid,
                "url": row.get("url") or f"https://youtu.be/{vid}", "category": cat,
            }, token)
            updated += 1
            print(f"  수정  {title}")

    # 목록에 없는 나머지는 뒤로 밀어 순서를 잃지 않게 한다
    leftovers = [r["id"] for r in rows if r["id"] not in order_ids]
    if leftovers:
        print(f"\n⚠️ 목록에 없는 {len(leftovers)}개는 맨 뒤로 이동합니다.")
    call("/portfolio/reorder", "POST", {"order": order_ids + leftovers}, token)

    print(f"\n✅ 완료 — 제목·분류 {updated}건 수정, 순서 {len(order_ids)}개 재정렬")

    check = call("/portfolio")[:3]
    print("\n확인용 (앞 3개):")
    for r in check:
        print(f"  {r['sort_order']}. [{r['category']}] {r['title']}")


if __name__ == "__main__":
    sys.exit(main())
