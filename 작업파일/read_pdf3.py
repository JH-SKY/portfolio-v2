import fitz  # PyMuPDF
import sys

doc = fitz.open('포폴가이드_SeSAC도봉캠_잡코디_김이현_260507_재배포금지.pdf')
print(f'총 페이지: {len(doc)}')

for i in range(min(20, len(doc))):
    page = doc[i]
    text = page.get_text()
    print(f'=== 페이지 {i+1} ===')
    if text.strip():
        print(text[:1200])
    else:
        print('(텍스트 없음)')
    print()

doc.close()
