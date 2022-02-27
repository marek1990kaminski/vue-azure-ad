import {ref} from '@nuxtjs/composition-api';

const getMsal = () => {
  const msalConfig = {
    auth: {
      clientId: '',
      authority: ''
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
