<template>

  <v-app dark>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

      <v-toolbar-title v-text="title"/>

      <v-spacer/>

      <v-tooltip
        v-if="!account"
        bottom
      >
        <template #activator="{ on, attrs }">
          <v-icon
            target="_blank"
            color="blue lighten-1"
            v-bind="attrs"
            v-on="on"
            @click="signIn"
          >
            mdi-microsoft-azure
          </v-icon>
        </template>
        <span>login through Azure</span>
      </v-tooltip>

      <v-tooltip
        v-if="!!account"
        bottom
      >
        <template #activator="{ on, attrs }">
          <v-icon
            target="_blank"
            color="red lighten-1"
            v-bind="attrs"
            v-on="on"
            @click="signOut"
          >
            mdi-logout
          </v-icon>
        </template>
        <span>logout</span>
      </v-tooltip>

    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} by MK</span>
    </v-footer>

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
        },
        {
          icon: 'mdi-alert-circle',
          title: 'Example error',
          to: '/inspire'
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
