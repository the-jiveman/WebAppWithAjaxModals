using System.Collections.Generic;
using WebAppWithAjaxModals.Models;

namespace WebAppWithAjaxModals.Repositories
{
    public interface IPersonRepository
    {
        IEnumerable<Person> GetAllPeople();
        Person GetPersonById(int id);
    }
}