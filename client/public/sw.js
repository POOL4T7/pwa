self.addEventListener('push', function (event) {

  if (event.data) {
    const data = event.data.json();
    console.log('Push data:', data);

    const options = {
      body: data.body || 'Default body text',
      icon: data.icon || '/next.svg',
      badge: '/next.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    };

    event.waitUntil(self.registration.showNotification(data.title || 'Default Title', options));
  } else {
    console.log('No data in push event');
  }
});


self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.');
  event.notification.close();
  event.waitUntil(clients.openWindow('http://localhost:3000'));
});


