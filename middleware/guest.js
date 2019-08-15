import { auth } from '../config/firebase';
export default function({ redirect }) {
  if (auth.currentUser) {
    return redirect('/dashboard');
  }
}
