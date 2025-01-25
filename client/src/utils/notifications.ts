import { notification } from 'antd';

export const showSuccessNotification = (message: string, description?: string) => {
  notification.success({ message, description });
};

export const showErrorNotification = (message: string, description?: string) => {
  notification.error({ message, description });
};