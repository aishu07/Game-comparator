import React from 'react';

const GamePrices = ({ prices }) => {
    return (
        <div className="container">
            <div className="row">
                {prices.map((price, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                            <img
                                src={price.thumb}
                                className="card-img-top"
                                alt={price.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{price.title}</h5>
                                <p className="card-text">
                                    <strong>Store:</strong> {price.store}
                                </p>
                                <p className="card-text">
                                    <strong>Price:</strong> ${price.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamePrices;
