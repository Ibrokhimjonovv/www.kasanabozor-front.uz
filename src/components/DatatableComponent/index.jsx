import { useEffect, useRef, useState } from "react";

import Loading from "../../components/LoaderComponent/loading.jsx";

import "./index.scss";


const DatatableRowClass = "w-full flex items-center justify-start even:bg-placeholder/20";
const DatatableColumnClass = "h-9 flex items-center justify-start px-3 gap-1.5 text-zinc-600";

const DatatableComponent = ({
  columns,
  data
}) => {
  const [columnsWidth, setColumnWidth] = useState([]);
  const scrolledTableElement = useRef(null);

  const updateColumnWidth = () => {
    if (scrolledTableElement.current) {
      const el = scrolledTableElement.current;
      const header = el.children[0];
      const body = el.children[1];
      const rows = [...header.children, ...body.children];
      const columnsWidth = [
        rows.map((value) =>
          Array.from(value.children).map((value) => value.clientWidth)
        ),
      ];
      const maxColumns = [0, 0, 0, 0];

      columnsWidth.map((row) => {
        row.map((value) => {
          value.map((v, i) => {
            if (maxColumns[i] < v) {
              maxColumns[i] = v;
            }
          });
        });
      });

      columnsWidth.map((row) => {
        row.map((value) => {
          value.map((v, i) => {
            if (maxColumns[i] < el.clientWidth * columns[i].normal) {
              maxColumns[i] = el.clientWidth * columns[i].normal;
            }
          });
        });
      });

      setColumnWidth(maxColumns);
    }
  };

  useEffect(() => {
    if (data.length) {
      updateColumnWidth();
    }
  }, [data]);

  return (
    <>
        <div className="datatable mt-3 w-full h-auto" ref={scrolledTableElement}>
          <div className="datatable-header bg-brand/20 w-full relative">
            <div className={DatatableRowClass}>
              {columns.map((value, index) => (
                <div
                  className={
                    DatatableColumnClass.replace('text-zinc-600', 'text-brand') + (columns[index].right ? " text-right" : "")
                  }
                  style={
                    value.max
                      ? { width: "100%" }
                      : {
                          minWidth: value.max
                            ? "100%"
                            : columnsWidth[index] || "auto",
                          maxWidth: value.max
                            ? "100%"
                            : columnsWidth[index] || "auto",
                        }
                  }
                  key={index}
                >
                  {index === 0 && (
                    <label
                      htmlFor="select-all-data-rows"
                      className="table-select-label"
                    >
                      <input
                        type="checkbox"
                        id="select-all-data-rows"
                        className="table-select-input"
                      />
                    </label>
                  )}
                  <b>{value.name}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="datatable-body">
            {data.length > 0 ? data.map((row, index) => (
              <div className={DatatableRowClass} key={index}>
                {columns.map((value, ind) => (
                  <div
                    className={
                      DatatableColumnClass + (columns[ind].right ? " text-right" : "")
                    }
                    style={
                      value.max
                        ? { width: "100%" }
                        : {
                            minWidth: value.max
                              ? "100%"
                              : columnsWidth[ind] || "auto",
                            maxWidth: value.max
                              ? "100%"
                              : columnsWidth[ind] || "auto",
                          }
                    }
                    key={ind}
                  >
                    {ind === 0 && (
                      <label
                        htmlFor="select-all-data-rows"
                        className="table-select-label"
                      >
                        <input
                          type="checkbox"
                          id="select-all-data-rows"
                          className="table-select-input"
                        />
                      </label>
                    )}
                    <span>{row[value.props]}</span>
                  </div>
                ))}
              </div>
            )) : <div className="w-full h-22"><Loading /></div>}
          </div>
        </div>
    </>
  );
};

export default DatatableComponent;
