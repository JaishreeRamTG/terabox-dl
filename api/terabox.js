const axios = require('axios');

module.exports = async (req, res) => {
  const { url, pwd } = req.query;

  // Validate query parameters
  if (!url) {
    return res.status(400).json({ ok: false, message: "Missing required parameter 'url'." });
  }

  // Regex to validate Terabox URLs
  const teraboxUrlRegex = /^https:\/\/(terabox\.com|1024terabox\.com)\/s\/([A-Za-z0-9-_]+)$/;
  const match = url.match(teraboxUrlRegex);

  if (!match) {
    return res.status(400).json({ ok: false, message: "Invalid Terabox URL format." });
  }

  const shorturl = match[2]; // Extract the shorturl part

  try {
    // Step 1: Get file info
    const infoResponse = await axios.get(`https://terabox.hnn.workers.dev/api/get-info`, {
      params: { shorturl, pwd },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; 220333QAG Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.260 Mobile Safari/537.36',
        'Accept': '*/*'
      }
    });

    if (!infoResponse.data.ok) {
      console.error("get-info API error:", infoResponse.data);
      return res.status(500).json({ ok: false, message: "Failed to fetch file info." });
    }

    const { shareid, uk, sign, timestamp, list } = infoResponse.data;

    if (!list || list.length === 0) {
      console.error("No files found in the URL.");
      return res.status(404).json({ ok: false, message: "No files found in the provided URL." });
    }

    const { fs_id, filename, size, create_time, category } = list[0];

    // Step 2: Get download link
    const downloadResponse = await axios.post(
      'https://terabox.hnn.workers.dev/api/get-download',
      { shareid, uk, sign, timestamp, fs_id },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 13; 220333QAG Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.260 Mobile Safari/537.36',
          'Accept': '*/*'
        }
      }
    );

    if (!downloadResponse.data.ok) {
      console.error("get-download API error:", downloadResponse.data);
      return res.status(500).json({ ok: false, message: "Failed to fetch download link." });
    }

    const { downloadLink } = downloadResponse.data;

    // Step 3: Respond with simplified JSON structure
    return res.status(200).json({
      ok: true,
      filename,
      size: (parseInt(size) / (1024 * 1024)).toFixed(2) + " MB", // Convert size to MB
      category,
      create_time: new Date(parseInt(create_time) * 1000).toISOString(),
      downloadLink,
      Dev: "pikachufrombd.t.me"
    });

  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    } else {
      console.error("Unexpected error:", error.message || error);
    }
    return res.status(500).json({ ok: false, message: "An unexpected error occurred." });
  }
};