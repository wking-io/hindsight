import store from 'store';
import { GC_AUTH_TOKEN, GC_USER_ID } from '../lib/constants';

const logout = (url) => {
  store.remove(GC_USER_ID);
  store.remove(GC_AUTH_TOKEN);
  url.push('/');
};

export default logout;
