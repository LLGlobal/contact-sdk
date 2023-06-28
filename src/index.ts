import {
    InitOptions,
    LLGEnv,
    LLGContact,
    initType
  } from '../types';

  export type { InitOptions, LLGContact };

  declare global {
    interface Window {
      LLGContact: LLGContact;
    }
  }

  const SDK_VERSION = 'v1';

  const ENV_HOST = {
    staging: `eu-ewallet-share-bucket.lianlianglobal.com/sdk/contact/${SDK_VERSION}/staging`,
    prod: `eu-ewallet-share-bucket.lianlianglobal.com/sdk/contact/${SDK_VERSION}/prod`,
  };


  export const getGatewayUrl = (env: LLGEnv): string => `https://${ENV_HOST[env] || ENV_HOST.prod}/`;
  const STATIC_FILE_NAME = 'index.min.js';
  // test

  // 创建script标签，插入到head || body内
  const createScript = (gatewayUrl: string): HTMLScriptElement => {
    const script = document.createElement('script');
    script.src = `${gatewayUrl}${STATIC_FILE_NAME}`;

    const parentDom = document.head || document.body;

    if (!parentDom) {
      throw new Error('LLG Contact SDK scripts requires a <head> or <body> html element in order to be loaded.');
    }

    parentDom.appendChild(script);

    return script;
  };


  // 加载SDK资源
  export const loadScript = async ({ env }: { env?: LLGEnv }) => {
    if (typeof window === 'undefined') {
      return null;
    }

    if (window.LLGContact) {
      return window.LLGContact;
    }

    const MAX_RETRY_COUNT = 3;
    let RETRY_COUNT = 0;
    const sleep = () => new Promise((resolve) => window.setTimeout(resolve, 500));

    const tryToResolve = async (): Promise<LLGContact> => {
      const scriptUrl = getGatewayUrl(env || 'prod');
      const script: HTMLScriptElement =
        document.querySelector(`script[src="${scriptUrl}"], script[src="${scriptUrl}/"]`) || createScript(scriptUrl);

      return new Promise((resolve, reject) => {
        script.addEventListener('load', () => {
          if (window.LLGContact) {
            resolve(window.LLGContact);
          } else {
            reject(new Error('Failed to load LLG Contact SDK on load event.'));
          }
        });

        script.addEventListener('error', () => {
          reject(new Error('Failed to load LLG Contact SDK scripts.'));
          script.remove && script.remove();
        });
      });
    };

    while (RETRY_COUNT < MAX_RETRY_COUNT) {
      try {
        return await tryToResolve();
      } catch (error) {
        RETRY_COUNT++;
        await sleep();
      }
    }

    return null;
  };

  // 初始化SDK
  export const init: typeof initType = async (options: InitOptions) => {
    await loadScript(options);

    if (!window.LLGContact) {
      const errMsg = 'Failed when initialize LLG platform Contact SDK';
      console.error(errMsg);
      return Promise.reject(new Error(errMsg));
    } else {
      return window.LLGContact.init(options);
    }
  };


  // 销毁SDK
  export const destroy = () => {
    if (!window.LLGContact) {
      const errMsg = 'Failed when initialize LLG platform Contact SDK';
      console.error(errMsg);
      return Promise.reject(new Error(errMsg));
    } else {
      return window.LLGContact.destroy();
    }
  };