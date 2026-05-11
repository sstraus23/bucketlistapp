import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const client = generateClient();

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // This tells your app to watch the database for changes
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    const content = window.prompt("Bucket list item");
    if (content) {
      client.models.Todo.create({
        content: content,
      });
    }
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>My Bucket List</h1>
          <button onClick={createTodo}>+ New Item</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <button onClick={signOut} style={{ marginTop: '20px' }}>Sign Out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
