import Vue from 'vue'; // import Vue if you want to use the framework.globalMixin option
import MSAL from 'vue-msal';

export default (
  {
    app,
    error,
    $axios
  },
  inject
) => {
  inject('msal', new MSAL(
    {
      auth: {
        clientId: '<YOUR CLIENT ID HERE>'
      }
    },
    Vue /* [optional] should be passed as an argument if you want to the framework.globalMixin option */
  ));
};
