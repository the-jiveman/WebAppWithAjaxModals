using System.Collections.Generic;
using System.Linq;
using WebAppWithAjaxModals.Models;

namespace WebAppWithAjaxModals.Repositories
{
    public class PeopleRepository
    {
        private static IEnumerable<Person> AllPeople => new List<Person>
        {
            new Person { Id = 1, FirstName = "John", LastName = "Smith", Email = "jsmith@company.com" },
            new Person { Id = 2, FirstName = "Sally", LastName = "Johnson", Email = "sally@company.com" },
            new Person { Id = 3, FirstName = "Tim", LastName = "Iverson", Email = "tim@company.com" },
            new Person { Id = 4, FirstName = "The", LastName = "Dude", Email = "dude@company.com" },
            new Person { Id = 5, FirstName = "Bruce", LastName = "Wayne", Email = "batman@company.com" },
        };

        public IEnumerable<Person> GetAllPeople() => AllPeople;

        public Person GetPersonById(int id) => AllPeople.SingleOrDefault(p => p.Id == id);
    }
}