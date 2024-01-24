import { ObjectId } from 'mongodb';

const ids = ['_id'];

export function requestFilter(data: Record<any, any>) {
  if (data) {
    Object.keys(data).forEach((i) => {
      if (ids.includes(i) && typeof data[i] === 'string') {
        data[i] = new ObjectId(data[i]);
      } else {
        data[i] = { $regex: new RegExp(data[i]), $options: 'i' };
      }
    });
  }

  delete data.offset;
  delete data.limit;

  return data;
}
