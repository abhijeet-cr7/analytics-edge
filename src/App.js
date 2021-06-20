import React, { useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState(posts.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerpage = 10;
  const pagesVisited = pageNumber * usersPerpage;

  const displayPosts = posts.slice(pagesVisited, pagesVisited + usersPerpage);
  useEffect(() => {
    const urltext = `https://jsonplaceholder.typicode.com/${url}`;
    fetch(urltext)
      .then((response) => response.json())
      .then((data) => {
        console.log("*****data", data);
        setPosts(data);
        console.log("***posts", posts);
      });
  }, [url]);
  const commentFunc = () => {
    setUrl("comments");
  };
  const postFunc = () => {
    setUrl("posts");
  };
  const userFunc = () => {
    setUrl("users");
  };
  let columns;
  if (posts !== []) {
    columns = posts[0] && Object.keys(posts[0]);
  }
  // get current posts
  const pageCount = Math.ceil(users.length / usersPerpage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search... "
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <br />
      <button onClick={() => commentFunc()}>Comments</button>
      <button onClick={() => postFunc()}>Posts</button>
      <button onClick={() => userFunc()}>Users</button>
      <table>
        <thead>
          <tr>
            {displayPosts[0] &&
              columns.map((heading) => (
                <th style={{ marginLeft: "100px", width: "100vw" }}>
                  {heading}
                </th>
              ))}
          </tr>
        </thead>
      </table>
      {url === "posts" &&
        displayPosts
          .filter((post) => {
            if (searchTerm === "") {
              return post;
            } else if (
              post.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase() ||
                    post.body.toLowerCase().includes(searchTerm.toLowerCase())
                )
            ) {
              return post;
            }
          })
          .map((post) => {
            return (
              <>
                <ReactBootstrap.Table>
                  <tbody>
                    <tr>
                      <td style={{ marginLeft: "20px", marginRight: "20px" }}>
                        {post.id}
                      </td>
                      <td>{post.title}</td>
                      <td>{post.body}</td>
                    </tr>
                  </tbody>
                </ReactBootstrap.Table>
              </>
            );
          })}
      {url === "comments" &&
        displayPosts
          .filter((post) => {
            if (searchTerm === "") {
              return post;
            } else if (
              post.body
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase() ||
                    post.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            ) {
              return post;
            }
          })
          .map((post) => {
            return (
              <>
                <ReactBootstrap.Table>
                  <tr>
                    <td>{post.id}</td>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>{post.body}</td>
                  </tr>
                </ReactBootstrap.Table>
              </>
            );
          })}
      {url === "users" &&
        displayPosts
          .filter((post) => {
            if (searchTerm === "") {
              return post;
            } else if (
              post.username
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase() ||
                    post.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    post.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
            ) {
              return post;
            }
          })
          .map((post) => {
            return (
              <>
                <table border="1">
                  <tr style={{ width: "15vw", height: "15vh" }}>
                    <td style={{ width: "150px" }}>{post.id}</td>
                    <td style={{ width: "29%" }}>{post.name}</td>
                    <td style={{ width: "29%" }}>{post.username}</td>
                    <td style={{ width: "29%" }}>{post.email}</td>
                  </tr>
                </table>
              </>
            );
          })}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
      />
    </div>
  );
}

export default App;
