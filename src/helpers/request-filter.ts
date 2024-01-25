import { ObjectId } from 'mongodb';

const ids = ['_id', 'propertyId'];

export function requestFilter(data: Record<any, any>) {
  if (data) {
    Object.keys(data).forEach((i) => {
      if (ids.includes(i) && typeof data[i] === 'string') {
        data[i] = new ObjectId(data[i]);
      } else data[i];
    });
  }

  delete data.offset;
  delete data.limit;

  return data;
}
