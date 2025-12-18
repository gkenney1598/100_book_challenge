require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000
const router = express.Router()

app.use(express.json());

app.use(cors())

//test route
// app.get("/", (req, res) => res.json({success: "Hello world"}))

app.listen(port, () => console.log(`App listening on port ${port}`))

// const query = () => {
//     ` {
//         books(
//             where:{
//                 title:{_eq: "My Brilliant Friend"}
//             }
//             order_by: {activities_count:desc}
//             limit: 1
//         ) {
//             release_year
//             contributions{
//             author{
//                 name
//             }
//             }
//             pages
//             description
//             }
//     }`
// }


app.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    console.log(searchtext)
    q = operationsDoc(searchtext)
    const data = await fetchGraphQL(q, "bookInfo", {})
    res.json(data)
})

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://api.hardcover.app/v1/graphql",
    {
        headers: {
            'content-type': 'application/json',
            authorization: process.env.HARDCOVER_API_KEY,
            },
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

const operationsDoc = (bookTitle) => 
    `query bookInfo {
        books(
        where: {title: {_eq: "${bookTitle}"}}
        order_by: {activities_count: desc}
        limit: 1
        ) {
        contributions {
            author {
                name
            }
        }
        release_year
        description
        pages
        }
    }`;

// function fetchBookInfo() {
//   return fetchGraphQL(
//     operationsDoc,
//     "bookInfo",
//     {}
//   );
// }

// async function startFetchBookInfo() {
//   const { errors, data } = await fetchBookInfo();

//   if (errors) {
//     // handle those errors like a pro
//     console.error(errors);
//   }

//   // do something great with this precious data
//   console.log(data);
// }

// startFetchBookInfo();
