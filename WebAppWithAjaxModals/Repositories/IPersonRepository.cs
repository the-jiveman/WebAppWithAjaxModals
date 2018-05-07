using System.Collections.Generic;
using WebAppWithAjaxModals.Models;

namespace WebAppWithAjaxModals.Repositories
{
    public interface IPersonRepository
    {
        IEnumerable<Person> GetAllPeople();

        Person GetPersonById(int id);

        void AddPerson(Person newPerson);

        void UpdatePerson(Person updatedPerson);

        void DeletePerson(int id);
    }
}