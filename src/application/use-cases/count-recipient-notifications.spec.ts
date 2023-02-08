import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const recipient1Notifications = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    const recipient2Notifications = await countRecipientNotifications.execute({
      recipientId: 'recipient-2',
    });

    const invalidRecipientNotifications =
      await countRecipientNotifications.execute({
        recipientId: 'invalid-recipient',
      });

    expect(recipient1Notifications.count).toBe(2);
    expect(recipient2Notifications.count).toBe(1);
    expect(invalidRecipientNotifications.count).toBe(0);
  });
});
