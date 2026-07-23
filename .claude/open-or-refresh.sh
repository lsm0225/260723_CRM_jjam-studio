#!/bin/bash
# 배포 사이트를 외부 브라우저로 보여준다.
# 이미 열린 탭이 있으면 새로고침, 없으면 새로 연다.
# 사용: ./open-or-refresh.sh [URL]

URL="${1:-https://lsm0225.github.io/260723_CRM_jjam-studio/}"
MATCH="260723_CRM_jjam-studio"   # 열린 탭 식별용 URL 부분 문자열

# 실행 중인 브라우저 목록
RUNNING="$(osascript -e 'tell application "System Events" to get name of (processes whose background only is false)' 2>/dev/null)"

reload_safari() {
  osascript <<OSA 2>/dev/null
tell application "Safari"
  repeat with w in windows
    repeat with t in tabs of w
      if URL of t contains "$MATCH" then
        set URL of t to (URL of t)
        set current tab of w to t
        activate
        return "reloaded"
      end if
    end repeat
  end repeat
  return "notfound"
end tell
OSA
}

reload_chromium() {
  local app="$1"
  osascript <<OSA 2>/dev/null
tell application "$app"
  repeat with w in windows
    set i to 0
    repeat with t in tabs of w
      set i to i + 1
      if URL of t contains "$MATCH" then
        tell t to reload
        set active tab index of w to i
        activate
        return "reloaded"
      end if
    end repeat
  end repeat
  return "notfound"
end tell
OSA
}

RESULT="notfound"
case "$RUNNING" in
  *Safari*)        RESULT="$(reload_safari)" ;;
esac
if [ "$RESULT" != "reloaded" ]; then
  for app in "Google Chrome" "Brave Browser" "Microsoft Edge" "Arc" "Whale"; do
    case "$RUNNING" in
      *"$app"*) RESULT="$(reload_chromium "$app")"; [ "$RESULT" = "reloaded" ] && break ;;
    esac
  done
fi

if [ "$RESULT" = "reloaded" ]; then
  echo "새로고침됨: $URL"
else
  open "$URL"
  echo "새 창으로 열림: $URL"
fi
