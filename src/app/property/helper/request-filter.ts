import { ObjectId } from 'mongodb';

import { QueryPropertyDto } from '../dto/query.dto';

export const propertyRequestFilter = (filter: QueryPropertyDto) => {
  const query: any = {};

  if (filter.name) query.name = { $regex: filter.name, $options: 'i' };

  if (filter.hostId) query.hostId = new ObjectId(filter.hostId);

  if (filter.type) query.type = filter.type;

  if (filter.status) query.status = filter.status;

  if (filter.city) query['location.city'] = { $regex: filter.city, $options: 'i' };

  if (filter.state) query['location.state'] = { $regex: filter.state, $options: 'i' };

  if (filter.country) query['location.country'] = { $regex: filter.country, $options: 'i' };

  if (filter.coordinates) {
    const { minLat, maxLat, minLng, maxLng } = filter.coordinates;
    if (minLat !== undefined || maxLat !== undefined) {
      query['location.coordinates.lat'] = {};
      if (minLat !== undefined) query['location.coordinates.lat'].$gte = minLat;
      if (maxLat !== undefined) query['location.coordinates.lat'].$lte = maxLat;
    }
    if (minLng !== undefined || maxLng !== undefined) {
      query['location.coordinates.lng'] = {};
      if (minLng !== undefined) query['location.coordinates.lng'].$gte = minLng;
      if (maxLng !== undefined) query['location.coordinates.lng'].$lte = maxLng;
    }
  }

  if (filter.minBathrooms !== undefined) query['features.details.bathroom'] = { $gte: filter.minBathrooms };

  if (filter.minBedrooms !== undefined) query['features.details.bedroom'] = { $gte: filter.minBedrooms };

  if (filter.minKitchens !== undefined) query['features.details.kitchens'] = { $gte: filter.minKitchens };

  if (filter.amenities) {
    if (Array.isArray(filter.amenities)) {
      filter.amenities.forEach((amenity) => {
        query[`features.amenities.${amenity}`] = true;
      });
    } else {
      query[`features.amenities.${filter.amenities}`] = true;
    }
  }

  if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
    query['price.amount'] = {};
    if (filter.minPrice !== undefined) query['price.amount'].$gte = filter.minPrice;
    if (filter.maxPrice !== undefined) query['price.amount'].$lte = filter.maxPrice;
  }

  if (filter.adults !== undefined) query['features.occupancy.adults'] = { $gte: Number(filter.adults) };
  if (filter.teenagers !== undefined) query['features.occupancy.teenagers'] = { $gte: Number(filter.teenagers) };
  if (filter.kids !== undefined) query['features.occupancy.kids'] = { $gte: Number(filter.kids) };
  if (filter.toddlers !== undefined) query['features.occupancy.toddlers'] = { $gte: Number(filter.toddlers) };
  if (filter.infants !== undefined) query['features.occupancy.infants'] = { $gte: filter.infants };
  if (filter.pets !== undefined) query['features.occupancy.pets'] = { $gte: filter.pets };

  if (filter.description) query.description = { $regex: filter.description, $options: 'i' };

  if (filter.isAdmin !== undefined) query.isAdmin = filter.isAdmin;

  if (filter.features) {
    if (filter.features.amenities) {
      Object.keys(filter.features.amenities).forEach((key) => {
        query[`features.amenities.${key}`] = filter.features.amenities[key];
      });
    }
    if (filter.features.details) {
      Object.keys(filter.features.details).forEach((key) => {
        query[`features.details.${key}`] = { $gte: filter.features.details[key] };
      });
    }
    if (filter.features.occupancy) {
      Object.keys(filter.features.occupancy).forEach((key) => {
        query[`features.occupancy.${key}`] = { $gte: filter.features.occupancy[key] };
      });
    }
    if (filter.features.accessibility) {
      Object.keys(filter.features.accessibility).forEach((key) => {
        query[`features.accessibility.${key}`] = { $in: filter.features.accessibility[key] };
      });
    }
    if (filter.features.bookingOptions) {
      query['features.bookingOptions'] = { $in: filter.features.bookingOptions };
    }
  }

  if (filter.price) {
    if (filter.price.amount !== undefined) query['price.amount'] = { $gte: filter.price.amount };
    if (filter.price.discountedAmount !== undefined)
      query['price.discountedAmount'] = { $gte: filter.price.discountedAmount };
    if (filter.price.currency) query['price.currency'] = filter.price.currency;
  }

  return query;
};
