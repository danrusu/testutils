const BACKEND = 'https://testutils-4abbd3f39c31.herokuapp.com';
// const BACKEND = 'http://localhost:1111';

const feedbackElement = document.querySelector('#question');
feedbackElement.value = '';

async function submitFeedback() {
  const notificationElement = document.querySelector('#notification');
  if (feedbackElement.value.length < 10) {
    alert(`Questions must have at least 10 characters!`);
  } else {
    const response = await fetch(`${BACKEND}/feedback`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ feedback: feedbackElement.value }),
    });
    if (response.status === 200) {
      feedbackElement.value = '';
      notificationElement.innerText = 'Feedback submitted!';
      notificationElement.style.color = 'green';
    } else {
      notification.innerText = 'Failed to submit Feedback. Try again.';
      notification.style.color = 'red';
    }
    setTimeout(() => {
      notificationElement.innerText = '';
    }, 3000);
  }
}
