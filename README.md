
# Admin lưu dữ liệu lên server

## Có gì trong bộ này
- `server.js`
- `public/index.html`
- `public/admin.html`
- `data/packages.json`
- `.env.example`

## Cài đặt
```bash
npm install
cp .env.example .env
npm run dev
```

## Dùng
- Web public: `http://localhost:3000`
- Admin: `http://localhost:3000/admin.html`

## Password mặc định
Xem file `.env`
```env
ADMIN_PASSWORD=123456
```

## Cách hoạt động
- Web public đọc giá gói từ `data/packages.json`
- Admin nhập mật khẩu rồi sửa
- Bấm lưu thì server ghi đè `packages.json`
- Mọi người vào web đều thấy giá mới

## Deploy
Có thể deploy lên:
- Render
- Railway
- VPS
