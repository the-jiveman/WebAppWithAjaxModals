using System;
using System.Web.Mvc;
using WebAppWithAjaxModals.Models;
using WebAppWithAjaxModals.Repositories;

namespace WebAppWithAjaxModals.Controllers
{
    public class PeopleController : BaseController
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

        [HttpGet]
        public ActionResult Create()
        {
            var person = new Person();

            return PartialView("_Editor", person);
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var person = _personRepository.GetPersonById(id);

            return PartialView("_Editor", person);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(Person person)
        {
            if (!ModelState.IsValid)
            {
                return PartialView("_Editor", person);
            }

            try
            {
                if (person.Id == 0)
                {
                    _personRepository.AddPerson(person);
                }
                else
                {
                    _personRepository.UpdatePerson(person);
                }
            }
            catch (Exception e)
            {
                return ModalJsonResult(new JsonResponse(false, e.Message));
            }

            return ModalJsonResult(new JsonResponse(true));
        }

        [HttpGet]
        public ActionResult Delete (int id)
        {
            var person = _personRepository.GetPersonById(id);

            return PartialView("_Delete", person);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirm(int id)
        {
            if (!ModelState.IsValid)
            {
                var person = _personRepository.GetPersonById(id);
                return PartialView("_Delete", person);
            }

            try
            {
                _personRepository.DeletePerson(id);
            }
            catch (Exception e)
            {
                return ModalJsonResult(new JsonResponse(false, e.Message));
            }

            return ModalJsonResult(new JsonResponse(true));
        }

    }
}