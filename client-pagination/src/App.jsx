import { useState, useMemo, useEffect } from "react";
import { users } from "./data";

const App = () => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const totalPage = Math.max(1, Math.ceil(users.length / perPage));

  const data = useMemo(() => {
    let startIndex = (page - 1) * perPage;
    let endIndex = startIndex + perPage;
    return users.slice(startIndex, endIndex);
  }, [page, perPage]);

  const goToPage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (page > totalPage) setPage(totalPage);
  }, [page, totalPage]);

  return (
    <div className="w-fit">
      <div className="max-h-68 w-fit overflow-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="">
              {Object.keys(data[0]).map((c, i) => (
                <th
                  key={i}
                  className="py-1 px-3 border bg-zinc-700 sticky top-0"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id}>
                <td className="py-1 px-3 border">{u.id}</td>
                <td className="py-1 px-3 border">{u.firstname}</td>
                <td className="py-1 px-3 border">{u.lastname}</td>
                <td className="py-1 px-3 border">{u.age}</td>
                <td className="py-1 px-3 border">{u.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-zinc-700 flex gap-5 p-2">
        <div>
          <span>Rows per page:</span>
          <select
            className="bg-zinc-900"
            value={perPage}
            onChange={(e) => {
              const newPerPage = Number(e.target.value);
              const newTotalPage = Math.ceil(users.length / newPerPage);

              setPerPage(newPerPage);
              setPage((prev) => Math.min(prev, newTotalPage));
            }}
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>
        <div>
          Page {page} of {totalPage}
        </div>
        <div className="flex gap-2">
          <button
            className="bg-zinc-900 px-1 cursor-pointer disabled:bg-zinc-500"
            disabled={page === 1}
            onClick={() => goToPage(1)}
          >
            {"<<"}
          </button>
          <button
            className="bg-zinc-900 px-1 cursor-pointer disabled:bg-zinc-500"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            {"<"}
          </button>
          <button
            className="bg-zinc-900 px-1 cursor-pointer disabled:bg-zinc-500"
            disabled={page === totalPage}
            onClick={() => goToPage(page + 1)}
          >
            {">"}
          </button>
          <button
            className="bg-zinc-900 px-1 cursor-pointer disabled:bg-zinc-500"
            disabled={page === totalPage}
            onClick={() => goToPage(totalPage)}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
