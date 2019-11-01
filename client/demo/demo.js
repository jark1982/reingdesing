import { Grid, MuiThemeProvider, Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "../src";
import Typography from "@material-ui/core/Typography";

let direction = "ltr";
// direction = 'rtl';
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: "light"
  }
});

const bigData = [];
for (let i = 0; i < 1; i++) {
  const d = {
    id: i + 1,
    name: "Name" + i,
    surname: "Surname" + Math.round(i / 10),
    isMarried: i % 2 ? true : false,
    birthDate: new Date(1987, 1, 1),
    birthCity: 0,
    sex: i % 2 ? "Male" : "Female",
    type: "adult",
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35)
  };
  bigData.push(d);
}

class App extends Component {
  tableRef = React.createRef();

  colRenderCount = 0;
  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <div style={{ maxWidth: "100%", direction }}>
            <MaterialTable
              title={
                <Typography variant="h6" color="primary">
                  Remote Data Preview
                </Typography>
              }
              columns={[
                {
                  //   title: "Avatar",
                  field: "created_at"
                },
                {
                  // title: "Id",
                  field: "created_at"
                },
                {
                  // title: "First Name",
                  field: "created_at"
                },
                {
                  // title: "Last Name",
                  field: "created_at"
                }
              ]}
              options={{
                grouping: false,
                filtering: false,
                actionsColumnIndex: -1,
                search: false
              }}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = "http://localhost:4000/models";
                  //url += 'per_page=' + query.pageSize
                  // url += '&page=' + (query.page + 1)
                  console.log(query);
                  fetch(url)
                    .then(response => response.json())
                    .then(result => {
                      resolve({
                        data: result[0].hits,
                        page: 0,
                        totalCount: 1
                      });
                    });
                })
              }
              actions={[
                rowData => ({
                  icon: "delete",
                  tooltip: "Delete",
                  onClick: (event, rowData) =>
                    confirm("You want to delete " + rowData.created_at),
                  disabled: rowData.birthYear < 2000,
                  hidden: false
                })
              ]}
            />
          </div>
        </MuiThemeProvider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();
