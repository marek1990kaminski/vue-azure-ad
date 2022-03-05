import {ref} from '@nuxtjs/composition-api';
import {Configuration} from '@azure/msal-browser/dist/config/Configuration';

const getMsal = () => {
  const msalConfig: Configuration = {
    auth: {
      clientId: '83f8ce42-a0dc-48b4-8a03-c15c13bf946e',
      authority: 'https://login.microsoftonline.com/abe3c4e7-eae5-4fab-8138-5b0c52fb5aaf/'
    },
    cache: {
      cacheLocation: 'localStorage'
    }
  };
  const accessToken = ref('');

  const setAccessToken = (value: string): void => {
    accessToken.value = value;
  };

  return {
    msalConfig,
    accessToken,
    setAccessToken
  };
};

export type UseMsal = ReturnType<typeof getMsal>
const msalSingleton: UseMsal = getMsal();
export const useMsal = (): UseMsal => msalSingleton;
