import React from 'react';
import "./Table.css";

function Table() {
  return (
      <table>
          <thead>
              <th>#</th>
              <th>Customer Name</th>
              <th>Customer Number</th>
              <th>Reg No.</th>
              <th>Jobcard Status</th>
              <th>Actions</th>
          </thead>
          <tbody>
              <tr>
                  <td>1</td>
                  <td>Abin</td>
                  <td>9567915361</td>
                  <td>Kl05Au4759</td>
                  <td>active</td>
                  <td></td>
              </tr>
          </tbody>
      </table>
  )
}

export default Table;
