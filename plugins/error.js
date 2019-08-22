export default function({ $axios, $toast }) {
  $axios.onError((error) => {
    if (!error) {
      $toast.error('Something went wrong. Please try again');
    } else if (!error.response) {
      $toast.error('Poor internet connection. Please try again');
    } else if (error.response.status === 500) {
      $toast.error('We did something wrong. Please refresh the page.');
    } else {
      $toast.error('Poor internet connection. Please try again');
    }
  });
}
