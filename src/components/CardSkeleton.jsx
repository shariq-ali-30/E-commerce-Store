const CardSkeleton = () => {
  return (
    <div className="card card-skeleton">
      <div className="image skeleton-image">
        <div className="skeleton like-skeleton"></div>
        <div className="skeleton image-placeholder"></div>
      </div>

      <div className="content">
        <div className="skeleton title-skeleton"></div>

        <div className="rating-skeleton">
          <div className="skeleton star-skeleton"></div>
          <div className="skeleton rating-number-skeleton"></div>
          <div className="skeleton reviews-skeleton"></div>
        </div>

        <div className="price-skeleton">
          <div className="skeleton price-main-skeleton"></div>
          <div className="skeleton price-old-skeleton"></div>
        </div>

        <div className="skeleton button-skeleton"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
