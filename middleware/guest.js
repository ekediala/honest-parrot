export default function(context, redirect) {
  if (context.app.$auth.loggedIn) {
    redirect('/dashboard');
  }
}
