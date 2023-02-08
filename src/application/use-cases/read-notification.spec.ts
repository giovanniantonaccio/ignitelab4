import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification1 = makeNotification();
    const notification2 = makeNotification();

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);

    await readNotification.execute({ notificationId: notification1.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
    expect(notificationsRepository.notifications[1].readAt).toBeUndefined();
  });

  it('should not be able to read a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() =>
      readNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
