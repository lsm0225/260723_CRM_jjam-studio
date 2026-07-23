#!/usr/bin/env python3
"""
포트폴리오 그리드 자동 생성기.
.claude/portfolio-videos.txt 의 유튜브 URL 목록을 읽어 각 영상의 제목을
유튜브 oEmbed로 자동 조회하고, index.html 의 포트폴리오 그리드를 다시 생성한다.

사용:  python3 .claude/gen-portfolio.py
"""
import os, re, sys, json, html, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIST = os.path.join(ROOT, ".claude", "portfolio-videos.txt")
HTML = os.path.join(ROOT, "index.html")
VISIBLE = 12  # 처음 몇 개를 펼쳐서 보여줄지 (4의 배수 유지 → 빈틈없이 떨어짐)

# 4칸 유닛 [큰(2x2), 작은, 작은, 와이드(2x1)] = 4열 2행을 정확히 채움 → 하단 빈공간 없음
_UNIT = ["big", "", "", "wide"]
_CLS = {"big": " pf-item--big", "wide": " pf-item--wide", "full": " pf-item--full", "": ""}


def sizes_for(n):
    full = (n // 4) * 4
    out = []
    for i in range(n):
        if i < full:
            out.append(_UNIT[i % 4])
        else:
            rem, j = n - full, i - full
            if rem == 3:
                out.append(["wide", "", ""][j])   # 와이드 + 작은 + 작은 = 4열 1행
            elif rem == 2:
                out.append("wide")                # 와이드 + 와이드 = 4열 1행
            else:                                  # rem == 1
                out.append("full")                # 4열 전체 배너
    return out


def video_id(url):
    m = re.search(r'(?:youtu\.be/|v=|embed/|shorts/)([A-Za-z0-9_-]{11})', url)
    return m.group(1) if m else None


def fetch_title(vid):
    api = f"https://www.youtube.com/oembed?url=https://youtu.be/{vid}&format=json"
    try:
        req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            return json.load(r).get("title", "").strip()
    except Exception:
        return ""


def clean(t):
    t = t.strip()
    t = re.sub(r'(\s+#[^\s#]+)+\s*$', '', t)   # 끝의 해시태그 묶음 제거
    t = re.sub(r'\s+', ' ', t).strip()
    return t


def parse_list():
    items = []
    with open(LIST, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            override = None
            if "|" in line:
                url, override = [p.strip() for p in line.split("|", 1)]
            else:
                url = line
            vid = video_id(url)
            if not vid:
                print(f"  ! URL 인식 실패: {line}", file=sys.stderr)
                continue
            items.append((vid, override))
    return items


def main():
    items = parse_list()
    sizes = sizes_for(len(items))
    tiles = []
    for i, (vid, override) in enumerate(items):
        title = override or clean(fetch_title(vid)) or "제이잼 포트폴리오"
        title = html.escape(title, quote=False)
        cls = " pf-item--more" if i >= VISIBLE else " reveal"
        cls += _CLS[sizes[i]]
        tiles.append(
            f'          <button class="pf-item{cls}" data-id="{vid}" aria-label="포트폴리오 영상 재생">'
            f'<img src="https://i.ytimg.com/vi/{vid}/maxresdefault.jpg" '
            f'onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/{vid}/hqdefault.jpg\'" '
            f'alt="" loading="lazy" />'
            f'<span class="pf-item__overlay"><span class="pf-item__play" aria-hidden="true"></span>'
            f'<span class="pf-item__title">{title}</span></span></button>'
        )
    grid_inner = "\n".join(tiles)

    with open(HTML, encoding="utf-8") as f:
        src = f.read()

    grid_re = re.compile(
        r'(<div class="portfolio__grid" id="portfolioGrid">).*?(\n        </div>\s*<div class="portfolio__more)',
        re.S)
    src, n = grid_re.subn(lambda m: m.group(1) + "\n" + grid_inner + m.group(2), src)
    if n != 1:
        print("!! 그리드 위치를 찾지 못했습니다. index.html 구조 확인 필요.", file=sys.stderr)
        sys.exit(1)

    extra = max(0, len(items) - VISIBLE)
    # "더 보기" 버튼 개수 갱신 (없으면 버튼 숨김)
    if extra > 0:
        src = re.sub(r'(id="pfMoreBtn">더 많은 작업 보기 <span>)\(\+\d+\)(</span>)',
                     rf'\g<1>(+{extra})\g<2>', src)
        src = src.replace('<div class="portfolio__more reveal" id="portfolioMore" hidden>',
                          '<div class="portfolio__more reveal" id="portfolioMore">')
    else:
        src = src.replace('<div class="portfolio__more reveal" id="portfolioMore">',
                          '<div class="portfolio__more reveal" id="portfolioMore" hidden>')

    with open(HTML, "w", encoding="utf-8") as f:
        f.write(src)
    print(f"완료: 영상 {len(items)}개 반영 (펼침 {min(VISIBLE, len(items))} / 더보기 {extra})")


if __name__ == "__main__":
    main()
