import { useEffect, useState } from 'react';
 
// UPDATE component
function UpdateWorkout({ workoutId, currentTitle, currentReps, currentLoad, onUpdated, onCancel }) {
  const [title, setTitle] = useState(currentTitle);
  const [reps, setReps] = useState(currentReps);
  const [load, setLoad] = useState(currentLoad);
 
  const handleUpdate = async (e) => {
    e.preventDefault();
 
    const updatedWorkout = {
      title,
      reps: Number(reps),
      load: Number(load)
    };
 
    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${workoutId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedWorkout)
      });
 
      const data = await response.json();
 
      if (response.ok) {
        console.log('Workout aangepast!', data);
        onUpdated(data);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
 
  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Load (kg)"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <button type="submit">Aanpassen</button>
      <button type="button" onClick={onCancel}>Annuleren</button>
    </form>
  );
}
 
function App() {
  const [workouts, setWorkouts] = useState([]);
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [editingId, setEditingId] = useState(null);
 
  // READ - Haal alle workouts op
  const fetchWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/workouts');
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  useEffect(() => {
    fetchWorkouts();
  }, []);
 
  // CREATE - Nieuwe workout toevoegen
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const workout = {
      title,
      reps: Number(reps),
      load: Number(load)
    };
 
    try {
      const response = await fetch('http://localhost:4000/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout)
      });
 
      const data = await response.json();
 
      if (response.ok) {
        setWorkouts([data, ...workouts]);
        setTitle('');
        setReps('');
        setLoad('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  // DELETE - Workout verwijderen
  const handleDelete = async (id) => {
    if (!confirm('Weet je het zeker?')) return;
 
    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
        method: 'DELETE'
      });
 
      if (response.ok) {
        setWorkouts(workouts.filter(w => w._id !== id));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  // UPDATE - Workout bijwerken
  const handleUpdated = (updatedWorkout) => {
    setWorkouts(workouts.map(w => w._id === updatedWorkout._id ? updatedWorkout : w));
    setEditingId(null);
  };
 
  return (
    <div className="App">
      <h1>Workouts</h1>
 
      {/* CREATE Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <input
          type="number"
          placeholder="Load (kg)"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />
        <button type="submit">Toevoegen</button>
      </form>
 
      {/* READ - Toon workouts */}
      {workouts.length === 0 ? (
        <p>Geen workouts gevonden</p>
      ) : (
        workouts.map(workout => (
          <div key={workout._id}>
            <h3>{workout.title}</h3>
            <p>Reps: {workout.reps}</p>
            <p>Load: {workout.load} kg</p>
            <button onClick={() => handleDelete(workout._id)}>Verwijderen</button>
            <button onClick={() => setEditingId(workout._id)}>Aanpassen</button>

            {editingId === workout._id && (
              <UpdateWorkout
                workoutId={workout._id}
                currentTitle={workout.title}
                currentReps={workout.reps}
                currentLoad={workout.load}
                onUpdated={handleUpdated}
                onCancel={() => setEditingId(null)}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
 
export default App;