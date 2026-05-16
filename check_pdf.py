from pdf2image import convert_from_path
import os

images = convert_from_path(
    '포폴가이드_SeSAC도봉캠_잡코디_김이현_260507_재배포금지.pdf',
    dpi=150,
    first_page=1,
    last_page=3
)
print(f'변환된 페이지 수: {len(images)}')
for i, img in enumerate(images):
    path = f'page_{i+1}.png'
    img.save(path)
    print(f'저장: {path} ({img.size})')
