import { useEffect, useState } from 'react';
import logo from '../assets/pinged.png';
import '../popup.css';

interface MetricsData {
  reachable: boolean;
  status?: number;
  speed?: string;
  rawSpeed?: number;
  latency?: string;
  downloadSize?: string;
  quality?: string;
  server?: string;
  contentType?: string;
  website?: string;
  error?: string;
}

const MetricCard = ({
  label,
  value,
  valueClass = '',
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className='metric-card'>
    <span className='metric-label'>{label}</span>
    <span className={`metric-value ${valueClass}`}>{value}</span>
  </div>
);

const Popup = () => {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const analyzeWebsite = async () => {
      try {
        if (typeof chrome === 'undefined' || !chrome?.tabs) {
          setData({
            reachable: false,
            error: 'Not running in extension context',
          });
          setLoading(false);
          return;
        }

        chrome.tabs.query(
          { active: true, currentWindow: true },
          async (tabs) => {
            const currentUrl = tabs[0]?.url;

            if (!currentUrl) {
              setLoading(false);
              return;
            }

            setWebsite(new URL(currentUrl).hostname);

            try {
              const response = await fetch('http://localhost:5000/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: currentUrl }),
              });

              const result: MetricsData = await response.json();
              setData(result);
            } catch {
              setData({
                reachable: false,
                error: 'Failed to reach analysis server',
              });
            }

            setLoading(false);
          },
        );
      } catch {
        setData({ reachable: false, error: 'Failed to analyze website' });
        setLoading(false);
      }
    };

    analyzeWebsite();
  }, []);

  // Extract numeric value from speed string e.g. "34.21 Mbps" → "34.21"
  const speedValue = data?.speed?.replace(/[^0-9.]/g, '') ?? '--';
  const qualityClass =
    data?.quality === 'Fast'
      ? 'fast'
      : data?.quality === 'Moderate'
        ? 'moderate'
        : data?.quality === 'Slow'
          ? 'slow'
          : '';

  return (
    <main className='popup'>
      {/* LOGO */}
      <div className='logo-container'>
        <img
          src={logo}
          width={85}
          alt='Pinged Logo'
        />
      </div>

      {/* WEBSITE */}
      <p className='website-name'>{website || 'Unknown Website'}</p>

      {/* LOADING */}
      {loading ? (
        <div className='loading-container'>
          <div className='loader' />
          <p>Analyzing Website...</p>
        </div>
      ) : (
        <>
          {/* MAIN METRIC — speed in Mbps */}
          <section className='speed-section'>
            <div className='speed-wrapper'>
              <h1 className='speed-value'>{speedValue}</h1>
              <p className='speed-unit'>Mbps</p>
            </div>

            <span className={`quality-badge ${qualityClass}`}>
              {data?.quality ?? 'Unknown'} · {data?.latency ?? '--'}
            </span>
          </section>

          {/* METRICS */}
          <section className='metrics-section'>
            <MetricCard
              label='Website Status'
              value={data?.reachable ? 'Reachable' : 'Offline'}
              valueClass={data?.reachable ? 'online' : 'offline'}
            />
            <MetricCard
              label='HTTP Status'
              value={String(data?.status ?? '--')}
            />
            <MetricCard
              label='Download Size'
              value={data?.downloadSize ?? '--'}
            />
            <MetricCard
              label='Server'
              value={data?.server ?? 'Unknown'}
            />
            <MetricCard
              label='Content Type'
              value={data?.contentType ?? '--'}
              valueClass='small'
            />
          </section>

          {/* ERROR */}
          {data?.error && <div className='error-box'>{data.error}</div>}
        </>
      )}
    </main>
  );
};

export default Popup;
