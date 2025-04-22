// pages/_app.tsx
import { AppProps } from 'next/app';
import Layout from '@/layouts/Layout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;