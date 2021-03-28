import Taro from '@tarojs/taro';

const request = <T>(
  url: string,
  method: 'POST' | 'GET',
  data: Record<string, any> = {},
  header: Record<string, any> = {},
) => {
  return Taro.request<T>({
    url,
    method,
    data,
    header: {
      'content-type': 'application/json',
      ...header,
    },
  })
    .then((item) => {
      if (item.statusCode < 200 || item.statusCode >= 300) {
        throw new Error(`网络错误: ${item.errMsg}`);
      }

      return item.data;
    })
    .catch((e) => {
      Taro.hideLoading();
      Taro.showToast({
        icon: 'none',
        title: e,
      });
    });
};

const get = <T>(
  url: string,
  data: Record<string, any>,
  header: Record<string, any> = {},
) => {
  console.log(url);
  return request<T>(url, 'GET', data, header);
};

const post = <T>(
  url: string,
  data: Record<string, any>,
  header: Record<string, any> = {},
) => {
  return request<T>(url, 'POST', data, header);
};

export default {
  request,
  get,
  post,
};
