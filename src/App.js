import React, { useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./Pagination";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
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
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
            {currentPosts[0] &&
              columns.map((heading) => (
                <th style={{ marginLeft: "100px", width: "100vw" }}>
                  {heading}
                </th>
              ))}
          </tr>
        </thead>
      </table>
      {url === "posts" &&
        currentPosts
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
        currentPosts
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
        currentPosts
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

      <Pagination postsPerPage={postsPerPage} totalPages={posts.length} />
    </div>
  );
}

export default App;
