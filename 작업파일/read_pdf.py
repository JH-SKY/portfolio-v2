from pypdf import PdfReader

reader = PdfReader('포폴가이드_SeSAC도봉캠_잡코디_김이현_260507_재배포금지.pdf')
print(f'총 페이지: {len(reader.pages)}')
for i in range(min(15, len(reader.pages))):
    print(f'=== 페이지 {i+1} ===')
    text = reader.pages[i].extract_text()
    print(text[:1000] if text else '(텍스트 없음)')
    print()
