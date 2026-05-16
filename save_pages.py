import urllib.request
import urllib.parse
import base64
import json

# 서버에서 base64 이미지 데이터 가져오기
# 이미 preview_eval로 window._pg1에 저장됨
# 다른 방법: fetch API 사용

import http.server
import threading
import os

captured = {}

class Handler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers['Content-Length'])
        data = json.loads(self.rfile.read(length))
        page_num = data.get('page', 0)
        img_data = data.get('data', '')

        if img_data.startswith('data:image'):
            img_data = img_data.split(',')[1]

        filename = f'captured_page_{page_num:02d}.jpg'
        with open(filename, 'wb') as f:
            f.write(base64.b64decode(img_data))
        print(f'저장: {filename}')

        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(b'ok')

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        pass

server = http.server.HTTPServer(('localhost', 7789), Handler)
print("캡처 서버 시작: localhost:7789")
server.serve_forever()
