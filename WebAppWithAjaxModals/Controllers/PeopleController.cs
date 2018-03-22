using System.Web.Mvc;
using WebAppWithAjaxModals.Repositories;

namespace WebAppWithAjaxModals.Controllers
{
    public class PeopleController : Controller
    {
        // Normally, this would get injected into the constructor via a DI/IoC container
        private readonly PeopleRepository _peopleRepository = new PeopleRepository();


        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AllPeople()
        {
            var people = _peopleRepository.GetAllPeople();
            return PartialView("_Index", people);
        }
    }
}