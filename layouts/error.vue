<template>
  <v-app dark>
    <h1>
      {{ templateTitle }}
    </h1>

    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import {defineComponent, useMeta} from '@nuxtjs/composition-api';
import loggerFactory, {Logger} from '~/utils/logger';

const logger: Logger = loggerFactory.create('Error');

export default defineComponent({
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    logger.debug('props in error', props);
    const pageNotFound: string = '404 Not Found';
    const otherError: string = 'An error occurred';
    const meta = useMeta();
    logger.debug('meta in error', meta);

    const {title} = useMeta();
    title.value = props.error.statusCode === 404 ? pageNotFound : otherError;

    const templateTitle = title.value;

    return {
      templateTitle
    };
  },
  head: {}
});
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
