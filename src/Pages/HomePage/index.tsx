import AddIssue from 'Components/AddIssue/AddIssue';
import IssuesList from 'Components/IssuesList/IssuesList';
import React, { useState } from 'react';
function HomePage() {
  const [addIssue, setAddIssue] = useState(true);
  const [allIssues, setAllIssues] = useState([]);
  function showAddIssue() {
    setAddIssue(true);
  }

  async function changeCurrentState(e: {
    target: { dataset: { id: number }; value: string };
  }) {
    const currentTaskId = e.target.dataset.id;
    console.log(currentTaskId);
    if (currentTaskId) {
      try {
        fetch(`http://localhost:3004/issues/${currentTaskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'pending',
          }),
        })
          .then((response) => response.json())
          .then(() => {
            console.log(e.target);
            e.target.value = 'pending';
          });

        showCurrentIssue();
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log('Unexpected error', err);
        }
      }
    }
  }
  function showCurrentIssue() {
    setAddIssue(false);
    fetch(`http://localhost:3004/issues`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setAllIssues(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function removeCurrentIssue(e: { target: { dataset: { id: any } } }) {
    const removeId = e.target.dataset.id;
    console.log(removeId);
    if (removeId) {
      try {
        const res = await fetch(`http://localhost:3004/issues/${removeId}`, {
          method: 'delete',
        });

        const data = await res.json();

        const result = {
          status: res.status + '-' + res.statusText,
          headers: { 'Content-Type': res.headers.get('Content-Type') },
          data: data,
        };
        console.log('res', result);
        showCurrentIssue();
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log('Unexpected error', err);
        }
      }
    }
  }
  return (
    <>
      <div className="App">
        <h1>Issue Tracker</h1>
        <div className="grey-card-contianer">
          {addIssue ? (
            <AddIssue />
          ) : (
            <IssuesList
              allIssues={allIssues}
              removeCurrentIssue={removeCurrentIssue}
              changeCurrentState={changeCurrentState}
            />
          )}
        </div>
        <div className="view-selection-div">
          <button className="view-button" onClick={() => showCurrentIssue()}>
            Current Issues
          </button>
          <button className="view-button active-button" onClick={() => showAddIssue()}>
            Add Issue
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
