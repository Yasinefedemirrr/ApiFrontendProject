# Finalizer Frontend - Next.js API Entegrasyonu

Bu proje, Node.js backend API'si ile Next.js frontend'inin entegrasyonunu gösteren basit bir uygulamadır.

## Özellikler

- ✅ Kullanıcı listeleme (GET isteği)
- ✅ Kullanıcı ekleme formu (POST isteği)
- ✅ API entegrasyonu (fetch kullanarak)
- ✅ Basit hata yönetimi
- ✅ Loading durumları

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Development server'ı başlatın:
```bash
npm run dev
```

3. Tarayıcıda açın: [http://localhost:3001](http://localhost:3001)

## Backend API

Backend API'nin `http://localhost:3000` adresinde çalıştığından emin olun.

### API Endpoints

- `GET http://localhost:3000/api/users` - Kullanıcıları listele
- `POST http://localhost:3000/api/users` - Yeni kullanıcı ekle

### POST Request Body Örneği

```json
{
  "name": "Kullanıcı Adı",
  "email": "ornek@email.com"
}
```

## Sayfalar

- `/` - Ana sayfa (navigasyon)
- `/users` - Kullanıcı listesi
- `/add-user` - Kullanıcı ekleme formu

## Teknolojiler

- Next.js 14
- React 18
- JavaScript (TypeScript değil)
- CSS Modules

