import { PipelineStage } from 'mongoose';

export function averageRatingAggregation() {
  return {
    $cond: {
      if: { $gt: [{ $size: '$reviews' }, 0] },
      then: {
        $avg: {
          $map: {
            input: '$reviews',
            as: 'review',
            in: {
              $avg: [
                '$$review.cleanliness',
                '$$review.responsiveness',
                '$$review.comfort',
                '$$review.locationAccuracy',
              ],
            },
          },
        },
      },
      else: 0,
    },
  };
}

export const getPropertyAggregationPipeline = (filter: Record<string, any>, skip = 0, limit = 10) => {
  const today = new Date();
  const nextTwoDays = [new Date(today), new Date(today.setDate(today.getDate() + 1))];

  const pipeline: PipelineStage[] = [
    { $match: filter },
    {
      $lookup: {
        from: 'propertyimages',
        localField: '_id',
        foreignField: 'propertyId',
        as: 'images',
      },
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'propertyId',
        as: 'reviews',
      },
    },
    {
      $lookup: {
        from: 'bookings',
        let: { propertyId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$propertyId', '$$propertyId'] },
                  { $lte: ['$checkIn', nextTwoDays[1]] },
                  { $gte: ['$checkOut', nextTwoDays[0]] },
                ],
              },
            },
          },
        ],
        as: 'bookings',
      },
    },
    {
      $lookup: {
        from: 'unavailability',
        let: { propertyId: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$propertyId', '$$propertyId'] }, dates: { $in: nextTwoDays } } }],
        as: 'unavailability',
      },
    },
    {
      $addFields: {
        isAvailable: {
          $and: [{ $eq: [{ $size: '$bookings' }, 0] }, { $eq: [{ $size: '$unavailability' }, 0] }],
        },
      },
    },
    { $addFields: { averageRating: averageRatingAggregation() } },
    { $sort: { averageRating: -1 } },
    { $skip: skip || 0 },
    { $limit: limit || 0 },
  ];

  return pipeline;
};
