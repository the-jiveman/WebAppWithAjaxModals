using System;
using System.Linq;
using System.Web.Mvc;
using WebAppWithAjaxModals.Models;
using WebAppWithAjaxModals.Repositories;

namespace WebAppWithAjaxModals.Controllers
{
    public class PeopleController : Controller
    {
        // Normally, this would get injected into the constructor via a DI/IoC container
        private readonly IPersonRepository _personRepository = new FakePersonRepository();


        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AllPeople()
        {
            var people = _personRepository.GetAllPeople();

            return PartialView("_Index", people);
        }

    }
}