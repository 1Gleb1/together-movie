import React from "react";
// need rework
const Pagination = ({ listSer, pageEx, setPageEx }) => {
  const prevPage = () => {
    if (pageEx > 1) {
      let value = pageEx;
      value = value - 1;
      setPageEx(value);
      window.scrollTo(0, 0);
    } else {
      setPageEx(1);
    }
  };
  const nextPage = () => {
    let value = pageEx;
    value = value + 1;
    setPageEx(value);
    // window.scrollTo(0, 0);
  };
  const handlePage = (value) => {
    setPageEx(Number(value));
    listPage.length = 0;
    // window.scrollTo(0, 0);
  };
  const listPage = [];
  for (let i = 1; i < pageEx + 10; i++) {
    if (listPage.length >= 10) {
    } else {
      listPage.push(pageEx + i);
    }
  }
  return (
    <div className="flex justify-center">
      {!listSer.results && (
        <div className=" max-w-lg flex justify-between gap-2 bg-slate-800 bg-opacity-50 py-2 px-4 rounded">
          <button onClick={() => prevPage()}>Prev</button>
          {listPage.map((page, index) => (
            <button key={index} onClick={() => handlePage(page)}>
              {page}
            </button>
          ))}
          <input
            type="text"
            placeholder="..."
            onChange={(e) =>
              e.target.value ? handlePage(e.target.value) : handlePage(pageEx)
            }
            className="text-white w-6 bg-slate-900 text-center"
          />
          <button onClick={() => handlePage(500)}>{500}</button>
          <button onClick={() => nextPage()}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
