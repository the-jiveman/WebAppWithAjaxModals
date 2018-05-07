using System.Collections.Generic;
using System.Linq;
using WebAppWithAjaxModals.Models;

namespace WebAppWithAjaxModals.Repositories
{
    public class FakePersonRepository : IPersonRepository
    {
        // Using simple in-memory storage of all people data, instead of a DB
        private static List<Person> _people;

        private static IEnumerable<Person> GetPeopleFromMemory()
        {
            return _people ?? (_people = new List<Person>
            {
                new Person { Id = 1, FirstName = "John", LastName = "Smith", Email = "jsmith@company.com" },
                new Person { Id = 2, FirstName = "Sally", LastName = "Johnson", Email = "sally@company.com" },
                new Person { Id = 3, FirstName = "Tim", LastName = "Iverson", Email = "tim@company.com" },
                new Person { Id = 4, FirstName = "The", LastName = "Dude", Email = "dude@company.com" },
                new Person { Id = 5, FirstName = "Bruce", LastName = "Wayne", Email = "batman@company.com" }
            });
        }

        public void AddPerson(Person newPerson)
        {
            var newId = GetAllPeople().Max(p => p.Id) + 1;
            newPerson.Id = newId;
            _people.Add(newPerson);
        }

        public IEnumerable<Person> GetAllPeople() => GetPeopleFromMemory();

        public Person GetPersonById(int id) => GetPeopleFromMemory().SingleOrDefault(p => p.Id == id);

        public void UpdatePerson(Person updatedPerson)
        {
            // Normally, we would update the person record and save in a real DB here

            var existingPerson = GetPersonById(updatedPerson.Id);

            existingPerson.FirstName = updatedPerson.FirstName;
            existingPerson.LastName = updatedPerson.LastName;
            existingPerson.Email = updatedPerson.Email;
        }

        public void DeletePerson(int id)
        {
            var person = GetPersonById(id);
            _people.Remove(person);
        }
    }
}