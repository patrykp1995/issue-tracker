import './AddIssue.scss';

import React, { useRef, useState } from 'react';

function AddIssue() {
  // eslint-disable-next-line no-unused-vars
  const [postResult, setPostResult] = useState(null);
  const [showErrorDesc, setShowErrorDesc] = useState(false);
  const [showErrorAuthor, setShowErrorAuthor] = useState(false);
  const authorRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const [messageSended, setMessageSended] = useState(false);

  async function addIssueHandler(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!descriptionRef.current?.value) {
      setShowErrorDesc(true);
      return;
    } else {
      setShowErrorDesc(false);
    }
    if (!authorRef.current?.value) {
      setShowErrorAuthor(true);
      return;
    } else {
      setShowErrorAuthor(false);
    }
    const postData = {
      author: authorRef.current?.value,
      description: descriptionRef.current?.value,
      priority: priorityRef.current?.value,
      status: statusRef.current?.value,
    };

    try {
      const res = await fetch(`http://localhost:3004/issues`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'token-value',
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length'),
        },
        data: data,
      };
      console.log(result);
      setMessageSended(true);
      authorRef.current.value = '';
      descriptionRef.current.value = '';
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }

  return (
    <div className="add-issue">
      <form onSubmit={addIssueHandler}>
        <label>
          Description
          <input type="text" ref={descriptionRef} placeholder="Description of Issue..." />
          {showErrorDesc && <p className="error">Description field is required</p>}
        </label>
        <label>
          Assign To
          <input type="text" ref={authorRef} placeholder="Assign to..." />
          {showErrorAuthor && <p className="error">Author field is required</p>}
        </label>
        <label>
          Priority
          <select name="priority" ref={priorityRef} id="priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Extra-High">Extra-High</option>
          </select>
        </label>
        <input
          value="open"
          ref={statusRef}
          placeholder="Assign to..."
          name="status"
          type="hidden"
        />
        <button type="submit">Add</button>
        {messageSended && <h2 className="success">Zgłoszenie zostało dodane!</h2>}
      </form>
    </div>
  );
}

export default AddIssue;
