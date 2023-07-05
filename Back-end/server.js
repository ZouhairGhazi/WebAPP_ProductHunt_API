/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
import express from 'express';
import { gql, GraphQLClient } from 'graphql-request';
import cors from 'cors';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: [process.env.FRONT_URL],
};
app.use(cors(corsOptions)); // To allow requests coming from the frontend

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The graohql client facilitates the calls of a graphql api
const graphQLClient = new GraphQLClient(process.env.API_URL, {
  headers: {
    authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

function formatDate(date) {
  return date.substring(0, 10);
}

async function getBatch(cursor) {
// The query based function that takes as argument the cursor of a post,
// so that it might use it to get the 20 next posts in line, see documentation for more info
  const firstQuery = `${gql`
    query {
      posts(first: 20, after: "` + cursor}") {
        totalCount
        edges {
          cursor
          node {
            name
            tagline
            url
            createdAt
            votesCount
          }
        }
      }
    }
    `;
  const results = await graphQLClient.request(firstQuery);
  // 20 posts are retrieved from this query, as 20 is the maximum we can get per one api call
  return results.posts.edges;
}

// The async function responsible of calling the api, and filtering products based on the date
async function getDates(selectedDate) {
  const productList = [];
  // First call of the api is with no parameter, meaning we get the first 20 regardless of the date
  const currentBatch = await getBatch('');
  currentBatch.forEach((product) => {
    if (formatDate(product.node.createdAt) === selectedDate) {
      productList.push(product);
    }
  });
  // Keeping the last of the first batch of products so we can access next products in line
  let lastProduct = currentBatch[19];
  let nextBatch;
  // Making sure that once we surpass the chosen date, we no longer make more api calls
  while (formatDate(lastProduct.node.createdAt) >= selectedDate) {
    // eslint-disable-next-line no-await-in-loop
    nextBatch = await getBatch(lastProduct.cursor);
    nextBatch.forEach((product) => {
      if (formatDate(product.node.createdAt) === selectedDate) {
        productList.push(product);
      }
    });
    lastProduct = nextBatch[19];
  }
  return productList; // This object contains the api's response
}

// Waiting for the frontend to provide the user picked date, and then,
// using it to call on the getDates() function, and finally sending back the api's response
app.get(process.env.API_CALL_URL, async (req, res) => {
  const selectedDate = req.query.date;
  const productList = await getDates(selectedDate);
  res.json(productList);
});

app.listen(port, () => {
  console.log(`Product Hunt API app listening on port ${port}`);
});
