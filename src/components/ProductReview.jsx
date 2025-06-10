
export function ProductReview({ reviews }) {
    return (
        <section className="mt-5">
            <div className="my-3">
                <h3>Reviews:</h3>
            </div>
            {
                reviews?.length === 0 ? (
                    <div>No review</div>
                ) :
                    (
                        <div className="list-group">
                            {
                                reviews?.map(review => (
                                    <div key={review.date + Math.random()}>
                                        <div>
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">
                                                    {review.reviewerName} ({review.rating})
                                                </h5>
                                                <small>3 days ago</small>
                                            </div>
                                            {review.comment}
                                        </div>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </section>
    )
}