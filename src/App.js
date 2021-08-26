import React, { useEffect, useState } from 'react';
import './App.css';
import ReactPaginate from "react-paginate";

function App() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 1;
  const pagesVisited = pageNumber * userPerPage;

  const displayUsers = users.slice(pagesVisited, pagesVisited + userPerPage).map(user => {

    return (
      <div key={user.id}>
        <p>
          <strong>{user.first_name}</strong>
        </p>
        <p>{user.email}</p>
        <img key={user.avatar} src={user.avatar} alt="" />
      </div>
    );

  });

  const pageCount = Math.ceil(users.length / userPerPage);


  useEffect(() => {
    getData();


    async function getData() {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const info = await response.json();

      setUsers(info.data);
    }
  }, []);


  const changePage = ({ selected }) => {
    setPageNumber(selected)
  };

  return (
    <div className="App"> <h2>Users List!</h2>{displayUsers}


      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousButtons"}
        nextLinkClassName={"nextButtons"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  )
}

export default App;
