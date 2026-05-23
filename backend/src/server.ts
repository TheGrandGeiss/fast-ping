import express, { type Request, type Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: 'URL is required',
    });
  }

  try {
    const start = performance.now();

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    const end = performance.now();

    // total request duration
    const duration = (end - start) / 1000;

    // bytes downloaded
    const bytes = response.data.byteLength;

    // bits downloaded
    const bits = bytes * 8;

    // Mbps calculation
    const mbps = bits / duration / 1024 / 1024;

    let quality = 'Slow';

    if (mbps > 25) {
      quality = 'Fast';
    } else if (mbps > 5) {
      quality = 'Moderate';
    }

    res.json({
      reachable: true,

      website: new URL(url).hostname,

      speed: `${mbps.toFixed(2)} Mbps`,

      rawSpeed: mbps,

      latency: `${Math.round(duration * 1000)} ms`,

      downloadSize: `${(bytes / 1024).toFixed(2)} KB`,

      quality,

      status: response.status,

      server: response.headers['server'] || 'Unknown',

      contentType: response.headers['content-type'] || 'Unknown',
    });
  } catch (error) {
    res.status(500).json({
      reachable: false,
      error: 'Website unreachable',
    });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
