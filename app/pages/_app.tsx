import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { DefaultSeo } from 'next-seo';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#282c34',
    },
  },
});

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DefaultSeo
        title="TICKET.Ninja 神速搶票機器人"
        description="TICKET.Ninja 一款速度極快, 具有重刷票功能的的購票/搶票輔助程式, 幫助您搶贏其他拓元售票系統的機器人, 遠離黃牛, 輕鬆購票"
      />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <style>
          {`:root {
              --color-light-blue: #1dddf8;
              --color-light-red: #f45054;
              --color-light-yellow: #eaf10e;
            }

            .app-title {
              padding-bottom: 48px;
              background-image:
                linear-gradient(
                  90deg,
                  var(--color-light-blue),
                  var(--color-light-yellow),
                  var(--color-light-red)
                );
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              -webkit-text-fill-color: transparent;
              font-size: 48px;
              font-weight: bold;
            }
            `}
        </style>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
