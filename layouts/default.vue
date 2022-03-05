<template>

  <v-app dark>

    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>

  </v-app>

</template>

<script lang="ts">
import {defineComponent, Ref, ref} from '@nuxtjs/composition-api';
import * as msal from '@azure/msal-browser';
import {AccountInfo, PublicClientApplication} from '@azure/msal-browser';
import {createEvents} from 'micro-typed-events';
import {useMsal} from '~/hooks/useMsal';
import loggerFactory, {Logger} from '~/utils/logger';

const name = 'DefaultLayout';

const logger: Logger = loggerFactory.create(name);
const loginEvents = createEvents<[string, AccountInfo]>();

export default defineComponent({
  name,
  setup() {

    const account: Ref<AccountInfo | null> = ref(null);
    const {msalConfig} = useMsal();

    const msalInstance: PublicClientApplication = new msal.PublicClientApplication(msalConfig);

    const signIn = async () => {

      try {
        await msalInstance.loginPopup();
        const myAccounts: Array<AccountInfo> = msalInstance.getAllAccounts();
        logger.debug('myAccounts', myAccounts);
        account.value = myAccounts[0];
        loginEvents.emit(['login', account.value]);
        logger.debug('myAccounts', myAccounts);

      } catch (error) {
        logger.debug(`error during authentication: ${error}`);
      }

    };

    const signOut = async () => {
      try {
        await msalInstance.logoutPopup({
          authority: msalConfig.auth.authority
        });
      } catch (error) {
        logger.debug('error in signout ', error);
        loginEvents.emit(['logout', account.value as AccountInfo]);

      }

    };

    return {
      clipped: false,
      drawer: false,
      fixed: false,

      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Todo App',

      account,
      signIn,
      signOut
    };
  }
});
</script>
