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
