import fitz
import os

# HTML을 PDF로 변환하는 대신, 직접 HTTP로 접근해서 스크린샷 찍기
# PyMuPDF로 HTML 렌더링 시도
doc = fitz.open()
page = doc.new_page(width=1123, height=794)

# 대신 기존 서버에서 HTML을 가져와서 처리
import urllib.request
html = urllib.request.urlopen('http://localhost:7788/08D.html').read()
print(f"HTML 크기: {len(html)} bytes")
print("서버 접근 성공")
