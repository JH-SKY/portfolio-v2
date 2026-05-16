import pdfplumber

with pdfplumber.open('포폴가이드_SeSAC도봉캠_잡코디_김이현_260507_재배포금지.pdf') as pdf:
    print(f'총 페이지: {len(pdf.pages)}')
    for i, page in enumerate(pdf.pages[:15]):
        print(f'=== 페이지 {i+1} ===')
        text = page.extract_text()
        if text:
            print(text[:1000])
        else:
            print('(텍스트 없음 - 이미지 기반)')
        print()
