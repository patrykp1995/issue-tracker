import './IssuesList.scss';

import React, { useRef } from 'react';
interface singleIssue {
  id: number;
  author: string;
  priority: string;
  description: string;
  status: string;
}

function CurrentIssue({
  allIssues,
  removeCurrentIssue,
  changeCurrentState,
}: {
  allIssues: Array<singleIssue>;
  removeCurrentIssue: any;
  changeCurrentState: any;
}) {
  console.log(allIssues);
  const currentTask = useRef<HTMLDivElement>(null);

  return (
    <div className="current-issues">
      {allIssues.length ? (
        <div>
          {allIssues.map((issue: singleIssue) => (
            <div className="indv-issue" key={issue.id} ref={currentTask}>
              <button
                className="close-issue"
                data-id={issue.id}
                onClick={removeCurrentIssue}
              >
                Close Isssue
              </button>
              <p>
                Assigned<span>{issue.author}</span>
              </p>
              <p>
                Status
                <button
                  className={`statusBtn ${issue.status}`}
                  data-id={issue.id}
                  onClick={changeCurrentState}
                >
                  {issue.status}
                </button>
              </p>
              <p>
                Priority <span>{issue.priority}</span>
              </p>
              <p>Description</p>
              <p className="description-text">{issue.description}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <h3>Issues Not Found</h3>
      )}
    </div>
  );
}

export default CurrentIssue;
