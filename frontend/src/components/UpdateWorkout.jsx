import { useState } from 'react';

function UpdateWorkout({ workoutId, currentTitle, currentReps, currentLoad }) {
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
    </form>
  );
}