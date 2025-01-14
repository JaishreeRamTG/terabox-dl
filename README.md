# Terabox Downloader API

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen) ![Vercel Deployment](https://img.shields.io/badge/Hosted%20on-Vercel-blue)

## Description

**Terabox Downloader API** is a powerful serverless solution that allows you to fetch file details and direct download links from Terabox-hosted files effortlessly. It's simple, fast, and scalable, making file access easier than ever.

---

## Features

- 🎯 Extracts **file metadata** (filename, size, category, and creation time).
- 🚀 Generates a **direct download link** for valid Terabox URLs.
- 🔒 Validates URLs to ensure security and reliability.
- 🌐 Hosted on **Vercel** for seamless performance.

---

## Hosted API

Access the live API here:  
👉 **[Terabox Downloader API](https://pika-terabox-dl.vercel.app/)**

---

## Usage

### **Endpoint**
```
GET https://pika-terabox-dl.vercel.app/
```

### **Query Parameters**
| Parameter | Type   | Required | Description                                    |
|-----------|--------|----------|------------------------------------------------|
| `url`     | string | Yes      | Full Terabox URL (e.g., `https://terabox.com/s/1AXq5MscFBUpwsLBfG5dKhA`). |
| `pwd`     | string | No       | Password for the file if it is protected.     |

### **Response Example**
#### Request:
```bash
GET https://pika-terabox-dl.vercel.app/?url=https://terabox.com/s/1AXq5MscFBUpwsLBfG5dKhA&pwd=
```

#### Response:
```json
{
  "ok": true,
  "filename": "2023-09-02-03-47-17(1).mp4",
  "size": "2.32 MB",
  "category": "1",
  "create_time": "2023-09-01T21:14:00.000Z",
  "downloadLink": "https://d-jp01-ntt.terabox.com/file/...&fin=2023-09-02-03-47-17(1).mp4",
  "Dev": "Shahadat Hassan (@Shahad4t)"
}
```

---

## How It Works

1. **URL Validation**: Ensures the provided URL is a valid Terabox link.
2. **Fetch Metadata**: Retrieves file details (filename, size, creation time, etc.).
3. **Generate Link**: Produces a direct download link for the file.
4. **Respond**: Returns metadata and the download link in a clean JSON response.

---

## Developer

Created with 👾 by **Shahadat Hassan**  
[![Telegram Icon](https://img.shields.io/badge/Telegram-Shahadat%20Hassan-blue?logo=telegram)](https://t.me/Shahad4t)

---

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to use and share it!

---

## Acknowledgments

- Hosted on [Vercel](https://vercel.com/).
- Built with [Node.js](https://nodejs.org/) and [Axios](https://axios-http.com/).

---
