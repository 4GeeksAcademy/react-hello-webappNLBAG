const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        contacts: [],
        darkMode: false
      },
      actions: {
        // Cargar todos los contactos desde la agenda
        loadContacts: async () => {
          try {
            const resp = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/my_super_agenda");
            const data = await resp.json();
  
            if (Array.isArray(data)) {
              setStore({ contacts: data });
            } else {
              console.error("La respuesta no es un array:", data);
              setStore({ contacts: [] });
            }
          } catch (error) {
            console.error("Error cargando contactos:", error);
          }
        },
  
        // Agregar un nuevo contacto
        addContact: async (newContact) => {
          try {
            await fetch("https://playground.4geeks.com/apis/fake/contact/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...newContact,
                agenda_slug: "my_super_agenda"
              })
            });
            getActions().loadContacts();
          } catch (error) {
            console.error("Error agregando contacto:", error);
          }
        },
  
        // Editar un contacto existente
        editContact: async (id, updatedContact) => {
          try {
            await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...updatedContact,
                agenda_slug: "my_super_agenda"
              })
            });
            getActions().loadContacts();
          } catch (error) {
            console.error("Error editando contacto:", error);
          }
        },
  
        // Eliminar un contacto
        deleteContact: async (id) => {
          try {
            await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
              method: "DELETE"
            });
            getActions().loadContacts();
          } catch (error) {
            console.error("Error eliminando contacto:", error);
          }
        },
  
        // Activar o desactivar modo oscuro
        toggleDarkMode: () => {
          const store = getStore();
          setStore({ darkMode: !store.darkMode });
        }
      }
    };
  };
  
  export default getState;
  