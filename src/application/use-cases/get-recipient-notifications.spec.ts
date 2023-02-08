import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = 'recipient-1';

    const notification1 = makeNotification({ recipientId });
    const notification2 = makeNotification({ recipientId });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications.length).toBe(2);
    expect(notifications).toContain(notification1);
    expect(notifications).toContain(notification2);
  });
});
