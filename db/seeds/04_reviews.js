const products = require('../catalog/products');

const authors = [
  'Ana Souza',
  'Bruno Lima',
  'Camila Alves',
  'Diego Martins',
  'Elisa Rocha',
  'Felipe Costa',
  'Giovana Reis',
  'Hugo Nunes',
  'Isabela Ramos',
  'Lucas Teixeira',
];

const reviewTemplates = {
  5: [
    ['Excellent purchase', 'The product exceeded my expectations and feels very well made.'],
    ['Highly recommended', 'It arrived well packaged, works perfectly and delivers exactly what it promises.'],
  ],
  4: [
    ['Very good', 'I really like this product. Its performance is more than enough for everyday use.'],
    ['Good choice', 'The quality is good and the product offers great value for the price.'],
  ],
  3: [
    ['Does the job', 'It is a fair product for its price range, although a few details could be improved.'],
    ['Average experience', 'It works well overall, but it is not as complete as premium models.'],
  ],
  2: [
    ['Could be better', 'The product works, but I found limitations that I did not expect.'],
    ['Just okay', 'The experience was only average and the build quality could be better.'],
  ],
  1: [
    ['Did not meet expectations', 'The product did not meet my expectations and had important limitations.'],
    ['Disappointing', 'I had problems while using it and expected a higher level of quality.'],
  ],
};

function ratingsForAverage(rating, productId) {
  const target = Math.round(Number(rating) * 10);
  const lower = Math.floor(target / 10);
  const higher = Math.ceil(target / 10);
  const higherCount = target - lower * 10;
  const ratings = Array.from({ length: 10 }, (_, index) =>
    index < higherCount ? higher : lower
  );
  const offset = productId % ratings.length;

  return ratings.map((_, index) => ratings[(index + offset) % ratings.length]);
}

function reviewDate(productIndex, reviewIndex) {
  const date = new Date(Date.UTC(2025, 0, 20));
  date.setUTCDate(date.getUTCDate() - productIndex * 2 - reviewIndex);
  return date.toISOString();
}

exports.seed = async function (knex) {
  const rows = products.flatMap((product, productIndex) =>
    ratingsForAverage(product.rating, product.id).map((rating, reviewIndex) => {
      const templateList = reviewTemplates[rating];
      const [title, comment] = templateList[reviewIndex % templateList.length];

      return {
        product_id: product.id,
        author_name: authors[reviewIndex],
        rating,
        title,
        comment: `${comment} Review for ${product.name}.`,
        verified_purchase: reviewIndex % 4 !== 0,
        created_at: reviewDate(productIndex, reviewIndex),
      };
    })
  );

  await knex('review').del();
  await knex('review').insert(rows);
};
