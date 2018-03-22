using System.Web.Mvc;

namespace WebAppWithAjaxModals.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction("Index", "People");
        }
    }
}