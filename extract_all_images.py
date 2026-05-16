import fitz

doc = fitz.open('포폴가이드_SeSAC도봉캠_잡코디_김이현_260507_재배포금지.pdf')
print(f'총 페이지: {len(doc)}')

for i in range(len(doc)):
    page = doc[i]
    mat = fitz.Matrix(1.5, 1.5)
    pix = page.get_pixmap(matrix=mat)
    filename = f'pdf_page_{i+1:02d}.png'
    pix.save(filename)
    print(f'저장: {filename}')

doc.close()
