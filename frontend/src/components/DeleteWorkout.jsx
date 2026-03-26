function DeleteWorkout({ workoutId, workoutTitle }) {
  
  const handleDelete = async () => {
    // Bevestiging vragen
    if (!confirm(`Weet je zeker dat je "${workoutTitle}" wilt verwijderen?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/workouts/${workoutId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Workout verwijderd!', data);
        // Verwijder uit UI of refresh lijst
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Verwijderen
    </button>
  );
}