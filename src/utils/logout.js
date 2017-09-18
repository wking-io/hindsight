import storage from 'store';
import { GC_AUTH_TOKEN, GC_USER_ID } from './graphcool';

const logout = url => {
  storage.remove(GC_USER_ID);
  storage.remove(GC_AUTH_TOKEN);
  url.push('/');
};

export default logout;
