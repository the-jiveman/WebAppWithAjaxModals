using System.Web.Mvc;
using WebAppWithAjaxModals.Models;

namespace WebAppWithAjaxModals.Controllers
{
    public abstract class BaseController : Controller
    {
        public ActionResult ModalJsonResult(JsonResponse jsonResponse)
        {
            return Json(jsonResponse, JsonRequestBehavior.AllowGet);
        }
    }
}