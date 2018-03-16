using System.Collections.Generic;
using System.Web.Mvc;
using WebAppWithAjaxModals.Models;

namespace WebAppWithAjaxModals.Controllers
{
    public class PeopleController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AllPeople()
        {
            var people = new List<Person>
            {
                new Person { Id = 1, FirstName = "John", LastName = "Smith", Email = "jsmith@company.com" },
                new Person { Id = 2, FirstName = "Sally", LastName = "Johnson", Email = "sally@company.com" },
                new Person { Id = 3, FirstName = "Tim", LastName = "Iverson", Email = "tim@company.com" },
                new Person { Id = 4, FirstName = "The", LastName = "Dude", Email = "dude@company.com" },
                new Person { Id = 5, FirstName = "Bruce", LastName = "Wayne", Email = "batman@company.com" },
            };

            return PartialView("_PeopleList", people);
        }
    }
}