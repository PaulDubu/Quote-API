document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.getElementById('delete-quote');
    const deleteMessage = document.getElementById('delete-message');
  
    deleteButton.addEventListener('click', async () => {
      const id = document.getElementById('id').value;
      const person = document.getElementById('person').value;
  
      let url = '/api/quotes';
      let options = { method: 'DELETE' };
  
      if (id) {
        url += `/${id}`;
      } else if (person) {
        url += `?person=${person}`;
      } else {
        deleteMessage.innerHTML = '<h3>Error: Please provide an ID or a Person!</h3>';
        return;
      }
  
      try {
        const response = await fetch(url, options);
  
        if (response.status === 204) {
          deleteMessage.innerHTML = '<h3>Quote deleted successfully!</h3>';
        } else {
          const error = await response.json();
          deleteMessage.innerHTML = `<h3>Error: ${error.error}</h3>`;
        }
      } catch (error) {
        deleteMessage.innerHTML = '<h3>Error: Something went wrong!</h3>';
      }
    });
  });
  