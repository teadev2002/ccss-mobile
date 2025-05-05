import Toast from 'react-native-toast-message';

export const handleError = (error, defaultMessage = 'Đã xảy ra lỗi') => {
  let message = defaultMessage;

  if (error?.response?.data?.message) {
    message = error.response.data.message;
  } else if (error?.message) {
    message = error.message;
  }

  Toast.show({
    type: 'error',
    text1: defaultMessage,
    text2: message,
  });
};

export const handleSuccess = (title = 'Thành công', message = '') => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
  });
};

export const handleInfo = (title = 'Thông báo', message = '') => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
  });
};
